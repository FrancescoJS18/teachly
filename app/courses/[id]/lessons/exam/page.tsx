"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExamPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [codeAnswer, setCodeAnswer] = useState("");

    const [score, setScore] = useState<number | null>(null);
    const [examPassed, setExamPassed] = useState(false);

    useEffect(() => {
        fetch("/api/progress/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "demo-user",
                courseId: "html",
            }),
        })
            .then(res => res.json())
            .then(data => {
                setHasAccess(data.hasAccess);
                setLoading(false);
            });
    }, []);

    const submitExam = async () => {
        let points = 0;

        // Calcular puntos por respuestas correctas
        if (q1 === "correct") points++;
        if (q2 === "correct") points++;
        if (q3 === "correct") points++;
        if (q4 === "correct") points++;

        // ✅ Validación del código para el caso práctico
        const cleanCode = codeAnswer.replace(/\s/g, "").toLowerCase();
        if (
            cleanCode.includes("<h1>") &&
            cleanCode.includes("</h1>") &&
            cleanCode.includes("bienvenidoalcurso")
        ) {
            points++;
        }

        setScore(points);

        // Lógica de aprobación del examen
        if (points >= 4) {
            setExamPassed(true);
        }

        // Enviar el puntaje al backend (si es necesario)
        await fetch("/api/exam/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "demo-user",
                courseId: "html",
                score: points,
            }),
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-700">
                ⏳ Verificando acceso...
            </div>
        );
    }

    if (!hasAccess) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        ❌ Acceso denegado
                    </h1>
                    <p className="text-slate-700 mb-6">
                        Debes aprobar todas las clases antes.
                    </p>

                    <Link
                        href="/courses/1"
                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Volver al curso
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 text-slate-800">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
                <h1 className="text-3xl font-extrabold mb-10">
                    🧠 Examen Final de HTML
                </h1>

                {/* PREGUNTAS 1 - 4 */}
                {[
                    {
                        q: "1. ¿Qué es HTML?",
                        name: "q1",
                        options: [
                            ["Lenguaje de programación", "wrong"],
                            ["Lenguaje de marcado", "correct"],
                            ["Base de datos", "wrong"],
                        ],
                        set: setQ1,
                    },
                    {
                        q: "2. ¿Qué etiqueta crea un enlace?",
                        name: "q2",
                        options: [
                            ["<a>", "correct"],
                            ["<link>", "wrong"],
                            ["<href>", "wrong"],
                        ],
                        set: setQ2,
                    },
                    {
                        q: "3. ¿Qué etiqueta muestra una imagen?",
                        name: "q3",
                        options: [
                            ["<image>", "wrong"],
                            ["<img>", "correct"],
                            ["<pic>", "wrong"],
                        ],
                        set: setQ3,
                    },
                    {
                        q: "4. ¿Qué atributo indica la ruta de una imagen?",
                        name: "q4",
                        options: [
                            ["src", "correct"],
                            ["path", "wrong"],
                            ["href", "wrong"],
                        ],
                        set: setQ4,
                    },
                ].map((item, i) => (
                    <div key={i} className="mb-8">
                        <p className="font-semibold mb-3">{item.q}</p>
                        {item.options.map((op, j) => (
                            <label
                                key={j}
                                className="flex items-center gap-2 p-4 mb-2 rounded-xl border border-slate-200 hover:bg-indigo-50 cursor-pointer text-slate-800"
                            >
                                <input
                                    type="radio"
                                    name={item.name}
                                    className="accent-indigo-600"
                                    onChange={() => item.set(op[1])}
                                />
                                <span>{op[0]}</span>
                            </label>
                        ))}
                    </div>
                ))}

                {/* 🧩 CASO PRÁCTICO */}
                <div className="mb-10">
                    <p className="font-semibold mb-2">
                        5. Caso práctico (HTML)
                    </p>
                    <p className="text-slate-600 mb-4">
                        Estás creando una página de bienvenida para un curso online.
                        El cliente te pide que el título principal diga
                        <b> “Bienvenido al curso de HTML” </b>
                        y que sea un encabezado principal.
                    </p>

                    <textarea
                        value={codeAnswer}
                        onChange={e => setCodeAnswer(e.target.value)}
                        placeholder="<h1>Bienvenido al curso de HTML</h1>"
                        className="w-full h-40 p-4 font-mono text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-100 text-slate-800"
                    />
                </div>

                <button
                    onClick={submitExam}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold text-lg hover:scale-[1.02] transition"
                >
                    🚀 Enviar examen
                </button>

                {/* Resultados */}
                {score !== null && (
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-bold">
                            🏅 Puntaje: {score} / 5
                        </h2>
                        {examPassed ? (
                            <div>
                                <h3 className="text-lg text-green-600">
                                    ¡Felicidades! Has aprobado el examen.
                                </h3>
                                <Link
                                    href="/courses/1/certificate-page"
                                    className="block mt-4 text-center px-6 py-2 bg-green-600 text-white rounded-lg font-semibold"
                                >
                                    Obtener certificado → 
                                </Link>
                            </div>
                        ) : (
                            <p className="text-lg text-red-600">
                                No has aprobado el examen, ¡intenta nuevamente!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}




