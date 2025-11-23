"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
    _id: string;
    title: string;
    short: string;
    icon: string;
    color: string;
}

export default function DashboardPage() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 relative overflow-hidden">

            {/* 🔵 BURBUJAS ANIMADAS */}
            <div className="floating-icons absolute inset-0 pointer-events-none">
                <img src="/icons/html.png" className="icon i1" />
                <img src="/icons/css.png" className="icon i2" />
                <img src="/icons/js.png" className="icon i3" />
                <img src="/icons/python.png" className="icon i4" />
                <img src="/icons/php.png" className="icon i5" />
                <img src="/icons/js.png" className="icon i6" />
                <img src="/icons/css.png" className="icon i7" />
                <img src="/icons/html.png" className="icon i8" />
            </div>

            {/* HEADER */}
            <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <img src="/images/Logo.jpg" className="w-12" />
                    <h1 className="text-3xl font-bold text-indigo-900">Teachly · Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-indigo-800">💻 ¡Prepárate para crear el futuro digital!</div>
                    <Link href="/auth/login" className="text-sm text-indigo-600 font-semibold hover:underline">Cerrar sesión</Link>
                </div>
            </header>

            {/* FRASE MOTIVADORA */}
            <section className="max-w-6xl mx-auto mb-6 relative z-10">
                <div className="p-5 rounded-xl bg-white shadow flex items-center justify-between">
                    <p className="text-lg font-semibold text-slate-700">
                        "Si puedes imaginarlo, puedes programarlo."
                    </p>
                    <img src="/images/hero-code.png" className="w-12 opacity-80" />
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 relative z-10">

                {/* PANEL IZQUIERDO */}
                <aside className="p-6 bg-white rounded-xl shadow">
                    <h3 className="font-semibold text-lg">Resumen general</h3>
                    <p className="mt-2 text-sm text-slate-600">
                        Aquí podrás ver tus cursos, estadísticas y accesos directos.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-4 bg-indigo-50 rounded-xl shadow-sm">
                            Cursos
                            <div className="font-bold mt-1 text-indigo-700 text-xl">{courses.length}</div>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-xl shadow-sm">
                            Alumnos
                            <div className="font-bold mt-1 text-indigo-700 text-xl">0</div>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-slate-500 italic">
                        Más funciones se activarán pronto…
                    </div>
                </aside>

                {/* TARJETAS DE CURSOS */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {courses.map(c => (
                        <article key={c._id} className="p-5 rounded-xl shadow bg-white hover:shadow-lg transition relative">
                            <div className={`h-2 rounded-t-md bg-gradient-to-r ${c.color}`} />

                            <div className="flex items-center gap-3 mt-4">
                                <img src={c.icon} className="w-10 h-10" />
                                <h4 className="text-xl font-semibold" style={{ color: "#4f46e5" }}>{c.title}</h4>
                            </div>

                            <p className="mt-2 text-sm text-slate-600">{c.short}</p>

                            <div className="mt-4 flex items-center gap-3">
                                <Link href={`/courses/${c._id}`} className="text-indigo-600 font-semibold hover:underline">
                                    Ir al curso
                                </Link>
                                <button className="ml-auto text-sm px-3 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition">
                                    Ver estadísticas
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <footer className="max-w-6xl mx-auto mt-10 text-sm text-slate-500 text-center relative z-10">
                Teachly © 2025 — Ingeniería de Sistemas
            </footer>
        </main>
    );
}


