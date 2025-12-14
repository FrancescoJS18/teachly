"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function LessonPage() {
    const params = useParams();
    const lessonId = Number(params.lessonId);

    const [code, setCode] = useState("");
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [score, setScore] = useState<number | null>(null);
    const [completed, setCompleted] = useState(false);

    const lessonData: any = {
        1: {
            video: "https://www.youtube.com/embed/dD2EISBDjWM",
            q1: {
                question: "¿Qué es HTML?",
                options: [
                    { text: "Lenguaje de programación", value: "wrong" },
                    { text: "Lenguaje de marcado", value: "correct" },
                    { text: "Sistema operativo", value: "wrong" },
                ],
            },
            q2: {
                question: "¿Para qué sirve <h1>?",
                options: [
                    { text: "Crear párrafos", value: "wrong" },
                    { text: "Crear títulos", value: "correct" },
                    { text: "Insertar imágenes", value: "wrong" },
                ],
            },
            codeQuestion: "Escribe una estructura básica HTML",
        },
        2: {
            video: "https://www.youtube.com/embed/qz0aGYrrlhU",
            q1: {
                question: "¿Qué etiqueta se usa para párrafos?",
                options: [
                    { text: "<div>", value: "wrong" },
                    { text: "<p>", value: "correct" },
                    { text: "<span>", value: "wrong" },
                ],
            },
            q2: {
                question: "¿Qué etiqueta crea un enlace?",
                options: [
                    { text: "<a>", value: "correct" },
                    { text: "<link>", value: "wrong" },
                    { text: "<href>", value: "wrong" },
                ],
            },
            codeQuestion: "Crea un párrafo con un enlace",
        },
        3: {
            video: "https://www.youtube.com/embed/UB1O30fR-EE",
            q1: {
                question: "¿Qué etiqueta se usa para imágenes?",
                options: [
                    { text: "<image>", value: "wrong" },
                    { text: "<img>", value: "correct" },
                    { text: "<pic>", value: "wrong" },
                ],
            },
            q2: {
                question: "¿Qué atributo indica la ruta de la imagen?",
                options: [
                    { text: "src", value: "correct" },
                    { text: "href", value: "wrong" },
                    { text: "path", value: "wrong" },
                ],
            },
            codeQuestion: "Inserta una imagen con HTML",
        },
        4: {
            video: "https://www.youtube.com/embed/HD13eq_Pmp8",
        },
    };

    const isLastLesson = lessonId === 4;
    const lesson = lessonData[lessonId];

    const submitLesson = async () => {
    let points = 0;

    if (q1 === "correct") points++;
    if (q2 === "correct") points++;
    if (code.trim().length > 0) points++;

    setScore(points);

    if (points === 3) {
        setCompleted(true);

        try {
            await fetch("/api/progress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "demo-user",   // luego será el usuario real
                    courseId: "html",
                    lessonId: String(lessonId),
                    score: points,
                    completed: true,
                }),
            });
        } catch (error) {
            console.error("Error guardando progreso:", error);
        }
    }
};


    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-8">

            {/* VOLVER */}
            <div className="max-w-7xl mx-auto mb-6">
                <Link href="/courses/1" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    ← Volver al curso
                </Link>
            </div>

            {/* VIDEO + LATERALES */}
            <section className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6 mb-12">

                {/* RECOMENDACIONES */}
                <aside className="bg-white p-4 rounded-xl shadow text-slate-800 text-sm">
                    <h2 className="font-semibold text-indigo-800 mb-2">✅ Recomendaciones</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Mira el video completo</li>
                        <li>Toma apuntes</li>
                        <li>Practica el código</li>
                        <li>Responde la evaluación</li>
                    </ul>
                </aside>

                {/* VIDEO */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">
                    <iframe
                        className="w-full h-[520px]"
                        src={lesson.video}
                        allowFullScreen
                    />
                </div>

                {/* NOTAS */}
                <aside className="bg-white p-4 rounded-xl shadow text-sm">
                    <h2 className="font-semibold text-indigo-800 mb-2">📝 Notas rápidas</h2>
                    <pre className="bg-slate-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto">
{`<!DOCTYPE html>
<html>
  <body>
    <h1>Título</h1>
    <p>Párrafo</p>
  </body>
</html>`}
                    </pre>
                </aside>

            </section>

            {/* EVALUACIÓN */}
            {!isLastLesson && (
                <section className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow text-slate-800">

                    <h2 className="text-2xl font-semibold mb-6">❓ Evaluación</h2>

                    {/* PREGUNTA 1 */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">{lesson.q1.question}</p>
                        {lesson.q1.options.map((opt: any, i: number) => (
                            <label key={i} className="block p-3 bg-indigo-50 rounded mb-2 cursor-pointer">
                                <input type="radio" name="q1" onChange={() => setQ1(opt.value)} />{" "}
                                {opt.text}
                            </label>
                        ))}
                    </div>

                    {/* PREGUNTA 2 */}
                    <div className="mb-6">
                        <p className="font-semibold mb-2">{lesson.q2.question}</p>
                        {lesson.q2.options.map((opt: any, i: number) => (
                            <label key={i} className="block p-3 bg-indigo-50 rounded mb-2 cursor-pointer">
                                <input type="radio" name="q2" onChange={() => setQ2(opt.value)} />{" "}
                                {opt.text}
                            </label>
                        ))}
                    </div>

                    {/* CÓDIGO */}
                    <div>
                        <p className="font-semibold mb-2">{lesson.codeQuestion}</p>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-40 p-4 border border-indigo-300 rounded-lg font-mono text-slate-800"
                        />
                    </div>

                    <button
                        onClick={submitLesson}
                        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Enviar respuestas
                    </button>

                    {completed && (
                        <Link
                            href={`/courses/1/lessons/${lessonId + 1}`}
                            className="block mt-4 text-center bg-green-600 text-white py-2 rounded-lg"
                        >
                            Siguiente clase →
                        </Link>
                    )}
                </section>
            )}

            {/* ÚLTIMA CLASE */}
            {isLastLesson && (
                <section className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow text-slate-800">
                    <h2 className="text-2xl font-semibold mb-4">🎯 Preparación para el examen</h2>
                    <p className="mb-6">Repasa todo lo aprendido y practica.</p>

                    <Link
                        href="/courses/1/lessons/exam"
                        className="block text-center bg-indigo-700 text-white py-3 rounded-lg"
                    >
                        Ir al examen final →
                    </Link>
                </section>
            )}

        </main>
    );
}


