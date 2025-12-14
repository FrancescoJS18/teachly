"use client";

import Link from "next/link";

export default function CertificatePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-8">

            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12 border-8 border-indigo-700">

                {/* ENCABEZADO */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-indigo-900 tracking-wide">
                        CERTIFICADO DE APROBACIÓN
                    </h1>
                    <p className="mt-2 text-slate-600 uppercase tracking-widest text-sm">
                        Institución Académica Virtual
                    </p>
                </div>

                {/* CUERPO */}
                <div className="text-center text-slate-800 space-y-6">
                    <p className="text-lg">
                        La presente certifica que:
                    </p>

                    <h2 className="text-3xl font-bold text-indigo-800">
                        DEMO USER
                    </h2>

                    <p className="text-lg">
                        Ha aprobado satisfactoriamente el curso:
                    </p>

                    <h3 className="text-2xl font-semibold text-purple-700">
                        Desarrollo Web con HTML
                    </h3>

                    <p className="text-base leading-relaxed max-w-2xl mx-auto">
                        Cumpliendo con todos los requisitos académicos, evaluaciones
                        prácticas y el examen final, demostrando dominio de los
                        fundamentos del lenguaje HTML para el desarrollo web.
                    </p>
                </div>

                {/* INFO ACADÉMICA */}
                <div className="grid grid-cols-2 gap-6 mt-10 text-sm text-slate-700">
                    <div>
                        <p className="font-semibold">Modalidad:</p>
                        <p>Virtual</p>
                    </div>
                    <div>
                        <p className="font-semibold">Duración:</p>
                        <p>40 horas académicas</p>
                    </div>
                    <div>
                        <p className="font-semibold">Fecha de emisión:</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Código de verificación:</p>
                        <p>HTML-2025-001</p>
                    </div>
                </div>

                {/* FIRMAS */}
                <div className="grid grid-cols-2 gap-10 mt-16 text-center">
                    <div>
                        <div className="border-t-2 border-slate-400 pt-2">
                            <p className="font-semibold">Director Académico</p>
                            <p className="text-sm text-slate-600">
                                Instituto Teachly
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="border-t-2 border-slate-400 pt-2">
                            <p className="font-semibold">Docente Responsable</p>
                            <p className="text-sm text-slate-600">
                                Área de Tecnología
                            </p>
                        </div>
                    </div>
                </div>

                {/* BOTONES */}
                <div className="mt-12 flex justify-center gap-4">
                    <Link
                        href="/courses/1"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Volver al curso
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition"
                    >
                        Descargar certificado
                    </button>
                </div>

            </div>
        </main>
    );
}

