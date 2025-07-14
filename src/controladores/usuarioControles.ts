import { Request, Response } from "express";
import prisma from "../models/prisma";
import { hash } from "bcrypt";
import { Estado } from "@prisma/client";

const estadosValidos = ["ACTIVO", "INACTIVO"];

export const crearUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    rut,
    nombre,
    p_apellido,
    m_apellido,
    password,
    email,
    telefono,
    rol,
    licencia,
    vencLicencia,
    telEmergencia,
    direccion,
    estado,
  } = req.body;

  if (!rut || !nombre || !p_apellido || !password || !email) {
    res.status(400).json({ message: "Faltan datos obligatorios" });
    return;
  }

  // Validar estado
  let estadoValidado = "ACTIVO"; // default
  if (estado) {
    if (typeof estado !== "string" || !estadosValidos.includes(estado.toUpperCase())) {
      res.status(400).json({ message: "Estado inválido. Debe ser ACTIVO o INACTIVO." });
      return;
    }
    estadoValidado = estado.toUpperCase();
  }

  try {
    const hashedPassword = await hash(password, 10);

    const usuarioCreado = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        p_apellido,
        m_apellido: m_apellido || null,
        password: hashedPassword,
        email,
        telefono,
        rol,
        licencia,
        vencLicencia: vencLicencia || null,
        telEmergencia: telEmergencia || null,
        direccion: direccion || null,
        estado: estadoValidado as Estado,
      },
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: usuarioCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno al crear usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
