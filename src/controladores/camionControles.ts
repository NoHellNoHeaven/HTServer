import { Request, Response } from "express";
import prisma from "../models/prisma";

// Crear camión y mantenciones
export const crearCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    patente,
    tipoCamion,
    marca,
    modelo,
    anio,
    color,
    nroMotor,
    nroChasis,
    fabrica,
    procedencia,
    tipoSello,
    combustible,
    kilometraje,
    fRevisionTecnica,
    mantenciones = [],
  } = req.body;

  try {
    let fechaRevision = null;
    if (typeof fRevisionTecnica === "string" && fRevisionTecnica.trim() !== "") {
      let fechaString = fRevisionTecnica.trim();
      // Si el formato es yyyy-MM, agregar el día 01
      if (/^\d{4}-\d{2}$/.test(fechaString)) {
        fechaString += "-01";
      }
      fechaRevision = new Date(fechaString);
      // Si la fecha es inválida, simplemente no la uses
      if (isNaN(fechaRevision.getTime())) {
        fechaRevision = null;
      }
    }

    const data: any = {
      patente,
      tipoCamion,
      marca,
      modelo,
      anio,
      color,
      nroMotor,
      nroChasis,
      fabrica,
      procedencia,
      tipoSello,
      combustible,
      kilometraje,
      estado: "activo",
    };
    if (fechaRevision) {
      data.fRevisionTecnica = fechaRevision;
    }

    const camionCreado = await prisma.camion.create({
      data,
    });

    if (mantenciones.length > 0) {
      await prisma.mantencion.createMany({
        data: mantenciones.map((m: any) => ({
          camionPatente: patente,
          nombre: m.nombre,
          accion: m.accion,
          kilometraje: m.kilometraje,
          meses: m.meses ?? 0,
          proximoKilometraje: m.proximoKilometraje,
        })),
      });
    }

    res.status(201).json({
      message: "Camión y mantenciones creados correctamente",
      data: camionCreado,
    });
  } catch (error) {
    console.error("Error al crear camión:", error);
    res.status(500).json({
      message: "Error al crear el camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};


// Obtener todos los camiones
export const obtenerCamiones = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const camiones = await prisma.camion.findMany();
    res.status(200).json(camiones);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener camiones",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener camión por patente (incluye mantenciones)
export const obtenerCamionPorPatente = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;

  try {
    const camion = await prisma.camion.findUnique({
      where: { patente },
      include: {
        mantenciones: true, // Incluir mantenciones relacionadas
      },
    });

    if (!camion) {
      res.status(404).json({ message: "Camión no encontrado" });
      return;
    }

    res.status(200).json(camion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Actualizar camión
export const actualizarCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;
  const datos = req.body;

  try {
    const camionExistente = await prisma.camion.findUnique({
      where: { patente },
    });

    if (!camionExistente) {
      res.status(404).json({ message: "Camión no encontrado" });
      return;
    }

    // Actualiza el camión
    await prisma.camion.update({
      where: { patente },
      data: {
        ...datos,
        fRevisionTecnica: datos.fRevisionTecnica
          ? new Date(datos.fRevisionTecnica)
          : undefined,
      },
    });

    // Vuelve a buscar el camión, pero ahora incluyendo las mantenciones
    const camionConMantenciones = await prisma.camion.findUnique({
      where: { patente },
      include: { mantenciones: true },
    });

    res.status(200).json({
      message: "Camión actualizado correctamente",
      data: camionConMantenciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
// Reprogramar mantención (al marcar como completada)
export const completarMantencion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("Llamada a completarMantencion. Params:", req.params);

  const { id } = req.params;

  try {
    // Busca la mantención y el camión asociado
    const mantencion = await prisma.mantencion.findUnique({
      where: { id: Number(id) },
      include: { camion: true }
    });

    if (!mantencion) {
      console.log("Mantención no encontrada para id:", id);
      res.status(404).json({ message: "Mantención no encontrada" });
      return;
    }

    // Calcula el nuevo proximoKilometraje
    const nuevoProximoKm = (mantencion.camion.kilometraje || 0) + (mantencion.kilometraje || 0);

    // Reprograma la mantención (solo actualiza proximoKilometraje)
    const mantencionActualizada = await prisma.mantencion.update({
      where: { id: Number(id) },
      data: {
        proximoKilometraje: nuevoProximoKm,
        // Si usas meses y quieres actualizar la fecha, hazlo aquí
      },
    });

    res.status(200).json({
      message: "Mantención reprogramada",
      data: mantencionActualizada,
    });
  } catch (error) {
    console.error("Error en completarMantencion:", error);
    res.status(500).json({
      message: "Error al reprogramar mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
// Eliminar camión
export const eliminarCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;

  try {
    const camionEliminado = await prisma.camion.delete({
      where: { patente },
    });

    res.status(200).json({
      message: "Camión eliminado correctamente",
      data: camionEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
