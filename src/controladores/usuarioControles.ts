import { Request, Response } from "express";
import prisma from "../models/prisma"; // Usa un solo PrismaClient

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

  try {
    // 1. Crear usuario
    const crearUsuario = await prisma.usuario.create({
      data: {
        rut,
        nombre,
        p_apellido,
        m_apellido: m_apellido || null,
        password,
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

    // 3. Respuesta
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: {
        crearUsuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el usuario",
      error,
    });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por su rut
export const obtenerUsuarioPorRut = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { rut } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

export const actualizarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
    const usuarioActualizado = await prisma.usuario.update({
      where: { rut },
      data: {
        nombre,
        p_apellido,
        m_apellido: m_apellido || null,
        password,
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

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error,
    });
  }
};

export const actualizarParcialUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { rut } = req.params;
  const data = req.body;

  try {
    // Verificar si el usuario existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuarioExistente) {
      res.status(404).json({
        message: `No se encontró ningún usuario con rut: ${rut}`,
      });
      return;
    }

    // Actualización parcial
    const usuarioActualizado = await prisma.usuario.update({
      where: { rut },
      data,
    });

    res.status(200).json({
      message: "Usuario actualizado parcialmente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar parcialmente:", error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error,
    });
  }
};

export const eliminarUsuario = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { rut } = req.params;

  try {
    // Verificar si el usuario existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!usuarioExistente) {
      res.status(404).json({
        message: `No se encontró ningún usuario con rut: ${rut}`,
      });
      return;
    }

    // Eliminar usuario
    await prisma.usuario.delete({
      where: { rut },
    });

    res.status(200).json({
      message: `Usuario con rut ${rut} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
      error,
    });
  }
};
