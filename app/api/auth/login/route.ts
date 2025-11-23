export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { detail: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { detail: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      message: "Inicio de sesión correcto",
    });
  } catch (error) {
    return NextResponse.json(
      { detail: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}

