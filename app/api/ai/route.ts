import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AiHistory from "@/models/AiHistory";

export async function POST(req: Request) {
    try {
        const { prompt, code, userId } = await req.json();

        await connectToDatabase();

        const systemPrompt = `
Eres un asistente educativo experto en programación.
Actúas como profesor, tutor y copiloto de código.

REGLAS IMPORTANTES:
- Si el usuario hace una pregunta teórica, RESPONDE NORMALMENTE.
- Si el usuario proporciona código y dice que está mal, quiere corregirlo o mejorarlo:
    1. Muestra el CÓDIGO ORIGINAL
    2. Luego entrega el CÓDIGO CORREGIDO
    3. El código corregido DEBE ir ENTRE ESTAS ETIQUETAS EXACTAS:

[CÓDIGO_CORREGIDO]
código aquí
[/CÓDIGO_CORREGIDO]

- Después explica brevemente qué estaba mal y qué corregiste.
- Si el usuario pide crear código, créalo completo.
- NO exijas código si no es necesario.
- Explica de forma clara, amigable y como profesor.
`;

        const userContent = `
Pregunta del alumno:
${prompt || "Sin pregunta específica"}

Código del alumno (si existe):
${code || "No se proporcionó código"}
`;

        // 🔹 Guardar mensaje del usuario
        await AiHistory.create({
            userId: userId || "demo-user",
            role: "user",
            message: prompt || "(Sin texto)",
        });

        // 🔹 Llamada a Ollama
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-coder:6.7b",
                prompt: systemPrompt + "\n\n" + userContent,
                stream: false,
            }),
        });

        const data = await response.json();
        const reply = data.response || "❌ Sin respuesta de la IA";

        // 🔹 Guardar respuesta de la IA
        await AiHistory.create({
            userId: userId || "demo-user",
            role: "ai",
            message: reply,
        });

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("❌ Error IA:", error);
        return NextResponse.json(
            { reply: "❌ Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}


