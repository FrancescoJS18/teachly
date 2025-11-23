export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { detail: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { detail: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      detail: "Usuario registrado correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      { detail: "Error interno del servidor" },
      { status: 500 }
    );
  }
}




