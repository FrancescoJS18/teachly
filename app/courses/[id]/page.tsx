"use client";

import Link from "next/link";

export default function CoursePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-8">

            {/* BOTÓN VOLVER */}
            <div className="max-w-6xl mx-auto mb-4">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg 
                    bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
                >
                    ← Volver 
                </Link>
            </div>

            {/* HEADER */}
            <header className="max-w-6xl mx-auto mb-8">
                <h1 className="text-4xl font-bold text-indigo-900">
                    Curso de HTML desde Cero
                </h1>
                <p className="mt-2 text-slate-600 text-lg">
                    Aprende a crear páginas web modernas desde cero
                </p>
            </header>

            {/* VIDEO BIENVENIDA */}
            <section className="max-w-6xl mx-auto mb-10">
                <div className="rounded-xl overflow-hidden shadow-xl border border-indigo-200 bg-black">
                    <iframe
                        className="w-full h-[420px]"
                        src="https://www.youtube.com/embed/dD2EISBDjWM"
                        title="Video de bienvenida"
                        allowFullScreen
                    />
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

                {/* QUÉ APRENDERÁS */}
                <aside className="p-6 rounded-xl bg-white shadow-lg border border-indigo-100">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                        ¿Qué aprenderás?
                    </h3>

                    <ul className="space-y-2 text-slate-700 list-disc list-inside">
                        <li>Estructura básica de HTML</li>
                        <li>Etiquetas más importantes</li>
                        <li>Creación de páginas web</li>
                        <li>Buenas prácticas web</li>
                    </ul>
                </aside>

                {/* CLASES */}
                <div className="lg:col-span-2 p-6 rounded-xl bg-white shadow-lg border border-indigo-100">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                        Clases del curso
                    </h3>

                    <div className="space-y-4">

                        <Link href="/courses/1/lessons/1"
                            className="block p-4 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition">
                            <h4 className="font-semibold text-indigo-700">
                                Clase 1: Introducción a HTML
                            </h4>
                            <p className="text-sm text-slate-600">
                                Conoce qué es HTML y cómo funciona en la web.
                            </p>
                        </Link>

                        <Link href="/courses/1/lessons/2"
                            className="block p-4 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition">
                            <h4 className="font-semibold text-indigo-700">
                                Clase 2: Etiquetas básicas
                            </h4>
                            <p className="text-sm text-slate-600">
                                Aprende etiquetas como h1, p, img, a, div.
                            </p>
                        </Link>

                        <Link href="/courses/1/lessons/3"
                            className="block p-4 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition">
                            <h4 className="font-semibold text-indigo-700">
                                Clase 3: Listas y tablas
                            </h4>
                            <p className="text-sm text-slate-600">
                                Organiza información correctamente.
                            </p>
                        </Link>

                        <Link href="/courses/1/lessons/4"
                            className="block p-4 rounded-lg bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition">
                            <h4 className="font-semibold text-indigo-700">
                                Clase 4: Proyecto final
                            </h4>
                            <p className="text-sm text-slate-600">
                                Crea tu primera página web completa.
                            </p>
                        </Link>

                    </div>
                </div>
            </section>

            {/* PROFESORES */}
            <section className="max-w-6xl mx-auto mt-10">
                <h3 className="text-2xl font-semibold text-indigo-900 mb-6">
                    Profesores
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="p-5 rounded-xl bg-white shadow-lg border border-indigo-100 flex items-center gap-4">
                        <img
                            src="/images/profesor.jpg"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-semibold text-indigo-800">
                                Juan Pérez
                            </h4>
                            <p className="text-sm text-slate-600">
                                Desarrollador Web Senior
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-white shadow-lg border border-indigo-100 flex items-center gap-4">
                        <img
                            src="/images/profesor.jpg"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-semibold text-indigo-800">
                                Jimmy Venturo
                            </h4>
                            <p className="text-sm text-slate-600">
                                Ingeniera de Sistemas
                            </p>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}
