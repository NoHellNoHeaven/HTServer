import { Request, Response } from "express";
import prisma from "../models/prisma";

export const crearAlertas = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    tipoAlerta,
    fecha,
    descripcion,
    estado = "Pendiente",
    patenteCamion,
  } = req.body;

  if (!patenteCamion || !tipoAlerta || !fecha) {
    res.status(400).json({
      message: "Faltan datos obligatorios: patenteCamion, tipoAlerta, fecha",
    });
    return;
  }

  try {
    const alertaCreada = await prisma.alertas.create({
      data: {
        tipoAlerta,
        fecha,
        descripcion,
        estado,
        camion: {
          connect: { patente: patenteCamion },
        },
      },
    });

    res.status(201).json({
      message: "Alerta creada correctamente",
      data: alertaCreada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la alerta",
      error,
    });
  }
};

export const obtenerAlertas = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const alertas = await prisma.alertas.findMany({
      include: {
        camion: true, // Incluye detalles del camión si lo deseas
      },
    });
    res.status(200).json(alertas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener alertas",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const obtenerAlertaPorId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const alerta = await prisma.alertas.findUnique({
      where: { id: Number(id) },
      include: {
        camion: true,
      },
    });

    if (!alerta) {
      res.status(404).json({ message: "Alerta no encontrada" });
      return;
    }

    res.status(200).json(alerta);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener alerta",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const actualizarAlerta = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { tipoAlerta, fecha, descripcion, estado, patenteCamion } = req.body;

  try {
    const alertaExistente = await prisma.alertas.findUnique({
      where: { id: Number(id) },
    });

    if (!alertaExistente) {
      res.status(404).json({ message: "Alerta no encontrada" });
      return;
    }

    const alertaActualizada = await prisma.alertas.update({
      where: { id: Number(id) },
      data: {
        tipoAlerta,
        fecha,
        descripcion,
        estado,
        ...(patenteCamion && {
          camion: {
            connect: { patente: patenteCamion },
          },
        }),
      },
    });

    res.status(200).json({
      message: "Alerta actualizada correctamente",
      data: alertaActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar alerta",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const eliminarAlerta = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const alertaEliminada = await prisma.alertas.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Alerta eliminada correctamente",
      data: alertaEliminada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar alerta",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
