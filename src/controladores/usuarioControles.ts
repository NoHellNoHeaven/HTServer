import { Request, Response } from "express";
import prisma from "../models/prisma";
import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";

export const crearUsuario = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
    rut,
    nombre,
    p_apellido,
    m_apellido,
    password,
    email,
    telefono,
    rol = "Chofer",
    licencia,
    vencLicencia,
    telEmergencia,
    direccion,
    estado = true,
  } = req.body;

  if (!rut || !nombre || !p_apellido || !password || !email || !telefono || !licencia) {
    return res.status(400).json({
      message: "Faltan campos obligatorios",
      camposFaltantes: ["rut", "nombre", "p_apellido", "email", "password", "telefono", "licencia"],
    });
  }

  try {
    const existe = await prisma.usuario.findFirst({
      where: {
        OR: [{ rut }, { email }],
      },
    });

    if (existe) {
      return res.status(409).json({
        message: "Ya existe un usuario con ese RUT o Email",
      });
    }

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
        estado,
      },
    });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: usuarioCreado,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const campos = (error.meta as any)?.target?.join(", ");
        return res.status(409).json({
          message: `Ya existe un usuario con el mismo valor en: ${campos}`,
        });
      }
    }

    console.error("Error inesperado al crear usuario:", error);
    return res.status(500).json({
      message: "Error interno al crear usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const obtenerUsuarios = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const obtenerUsuarioPorRut = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { rut } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al obtener el usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const actualizarUsuario = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { rut } = req.params;
  const {
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

  try {
    let passwordHasheada = password;
    if (password) {
      passwordHasheada = await hash(password, 10);
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { rut },
      data: {
        nombre,
        p_apellido,
        m_apellido: m_apellido || null,
        password: passwordHasheada,
        email,
        telefono,
        rol,
        licencia,
        vencLicencia,
        telEmergencia,
        direccion,
        estado,
      },
    });

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const actualizarParcialUsuario = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { rut } = req.params;
  const data = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        message: `No se encontró ningún usuario con rut: ${rut}`,
      });
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { rut },
      data,
    });

    return res.status(200).json({
      message: "Usuario actualizado parcialmente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar parcialmente:", error);
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const eliminarUsuario = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { rut } = req.params;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        message: `No se encontró ningún usuario con rut: ${rut}`,
      });
    }

    await prisma.usuario.delete({
      where: { rut },
    });

    return res.status(200).json({
      message: `Usuario con rut ${rut} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
