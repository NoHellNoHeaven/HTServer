import { Request, Response } from "express";
import prisma from "../models/prisma";

// Obtener todo el historial de mantenciones
export const obtenerHistorialCompleto = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const historial = await prisma.historialMantencion.findMany({
      orderBy: { fechaRealizada: 'desc' },
      include: {
        camion: {
          select: {
            patente: true,
            marca: true,
            modelo: true,
          }
        }
      }
    });

    res.status(200).json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({
      message: "Error al obtener historial de mantenciones",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener historial por camión
export const obtenerHistorialPorCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;

  try {
    const historial = await prisma.historialMantencion.findMany({
      where: { camionPatente: patente },
      orderBy: { fechaRealizada: 'desc' },
      include: {
        camion: {
          select: {
            patente: true,
            marca: true,
            modelo: true,
          }
        }
      }
    });

    res.status(200).json(historial);
  } catch (error) {
    console.error("Error al obtener historial por camión:", error);
    res.status(500).json({
      message: "Error al obtener historial del camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Registrar una mantención completada
export const registrarMantencionCompletada = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    camionPatente,
    mantencionId,
    kilometrajeRealizado,
  } = req.body;

  try {
    // Obtener información del camión
    const camion = await prisma.camion.findUnique({
      where: { patente: camionPatente },
    });

    if (!camion) {
      res.status(404).json({ message: "Camión no encontrado" });
      return;
    }

    // Obtener información de la mantención
    const mantencion = await prisma.mantencion.findUnique({
      where: { id: Number(mantencionId) },
    });

    if (!mantencion) {
      res.status(404).json({ message: "Mantención no encontrada" });
      return;
    }

    // Crear registro en el historial
    const nuevoRegistro = await prisma.historialMantencion.create({
      data: {
        camionPatente,
        camionMarca: camion.marca,
        camionModelo: camion.modelo,
        mantencionNombre: mantencion.nombre,
        mantencionAccion: mantencion.accion,
        kilometrajeRealizado,
      },
    });

    // Actualizar el kilometraje del camión
    await prisma.camion.update({
      where: { patente: camionPatente },
      data: { kilometraje: kilometrajeRealizado },
    });

    res.status(201).json({
      message: "Mantención registrada correctamente",
      data: nuevoRegistro,
    });
  } catch (error) {
    console.error("Error al registrar mantención:", error);
    res.status(500).json({
      message: "Error al registrar mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Eliminar registro del historial
export const eliminarRegistroHistorial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const registroEliminado = await prisma.historialMantencion.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Registro eliminado correctamente",
      data: registroEliminado,
    });
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    res.status(500).json({
      message: "Error al eliminar registro",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}; 