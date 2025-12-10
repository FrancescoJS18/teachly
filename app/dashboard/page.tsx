"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
    _id: string;
    title: string;
    short: string;
    icon: string;
    color: string;
    image: string;
}

export default function DashboardPage() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => setCourses(data));
    }, []);

    return (
        <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#D9C8FF] via-[#E9DFFF] to-[#D7C6FF] p-8">



            {/* BLUR BLOBS */}
            <div className="absolute inset-0 -z-10 blur-[130px] opacity-40">
                <div className="w-96 h-96 bg-purple-300 rounded-full absolute top-0 left-0 animate-pulse"></div>
                <div className="w-72 h-72 bg-indigo-300 rounded-full absolute bottom-0 right-0 animate-pulse"></div>
            </div>

            {/* ICONOS FLOTANTES */}
            <div className="floating-icons absolute inset-0 pointer-events-none opacity-40">
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
            <header className="max-w-6xl fade-in mx-auto flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <img src="/images/Logo.jpg" className="w-12 rounded-lg shadow" />
                    <h1 className="text-3xl font-bold text-indigo-900 tracking-tight">
                        Teachly · Dashboard
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-semibold text-indigo-800">
                        💻 ¡Prepárate para crear el futuro digital!
                    </div>
                    <Link href="/auth/login" className="text-sm text-indigo-600 font-semibold hover:underline">
                        Cerrar sesión
                    </Link>
                </div>
            </header>

            {/* FRASE */}
            <section className="max-w-6xl mx-auto mb-6 relative z-10 fade-in">
                <div className="p-6 rounded-xl bg-white shadow-lg border border-indigo-100 flex items-center justify-between">
                    <p className="text-xl font-semibold text-indigo-700">
                        “Si puedes imaginarlo, puedes programarlo.”
                    </p>
                    <img src="/images/hero-code.png" className="w-14 opacity-80" />
                </div>
            </section>

            {/* CONTENIDO */}
            <section className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6 relative z-10 fade-in">

                {/* PANEL IZQUIERDO (glass) */}
                <aside className="p-6 rounded-xl glass shadow-xl">
                    <h3 className="font-semibold text-lg text-indigo-900">Resumen general</h3>
                    <p className="mt-2 text-sm text-slate-700">
                        Aquí podrás ver tus cursos, estadísticas y accesos directos.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
                            <p className="text-indigo-700 font-semibold">Cursos</p>
                            <div className="font-bold mt-1 text-indigo-700 text-2xl">
                                {courses.length}
                            </div>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
                            <p className="text-indigo-700 font-semibold">Alumnos</p>
                            <div className="font-bold mt-1 text-indigo-700 text-2xl">0</div>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-slate-600 italic">
                        Más funciones se activarán pronto…
                    </div>
                </aside>

                {/* TARJETAS */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {courses.map(c => (
                        <article
                            key={c._id}
                            className="p-5 rounded-xl bg-white card-3d shadow-md hover:shadow-2xl transition border border-transparent hover:border-indigo-200 relative"
                        >

                            {/* LINEA SUPERIOR */}
                            <div className={`h-2 rounded-t-md bg-gradient-to-r ${c.color}`} />

                            <div className="flex items-center gap-3 mt-4">
                                <img src={c.icon} className="w-10 h-10 drop-shadow animate-pulse" />
                                <h4 className="text-xl font-semibold text-indigo-700">{c.title}</h4>
                            </div>

                            <p className="mt-2 text-sm text-slate-600">{c.short}</p>

                            <div className="mt-4 flex items-center gap-3">
                                <Link
                                    href={`/courses/${c._id}`}
                                    className="btn-anim text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                                >
                                    Ir al curso
                                </Link>


                                <button className="ml-auto btn-anim text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                                    Ver estadísticas
                                </button>
                            </div>

                        </article>
                    ))}
                </div>
            </section>

            <footer className="max-w-6xl mx-auto mt-10 text-sm text-slate-500 text-center relative z-10 fade-in">
                Teachly © 2025 — Ingeniería de Sistemas
            </footer>
        </main>
    );
}


