import { Request, Response } from "express";
import { hashPassword } from "../servicios/password.service"; // Asegúrate de que esta función exista
import prisma from "../models/prisma";

export const Register = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try { const hashedPassword = await hashPassword(password)
        console.log(hashedPassword)

        const Usuario = await prisma.usuario.create ({
            data: {
                email : email,
                password: hashedPassword,
            }
        })


    } catch (error) {

    }

}