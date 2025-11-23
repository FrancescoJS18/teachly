// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="Teachly" className="w-12 h-12 rounded-md object-cover" />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Teachly</h1>
            <p className="text-xs opacity-80">Plataforma de estudios · Ingeniería de Sistemas</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/auth/login" className="px-4 py-2 bg-indigo-500/90 hover:bg-indigo-600 rounded-md font-medium">Acceder</Link>
          <Link href="/auth/register" className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5">Regístrate</Link>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center py-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Aprende. Practica. Enseña. <span className="text-indigo-300">Crea soluciones reales</span>
          </h2>

          <p className="mt-6 max-w-xl text-slate-200">
            En Teachly diseñamos cursos prácticos en tecnologías web y programación para estudiantes y profesores de la carrera de Ingeniería de Sistemas.
          </p>

          <div className="mt-8 flex gap-3">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-indigo-500 px-5 py-3 rounded-lg shadow hover:scale-105 transition">
              Comenzar (gratis)
            </Link>
            <a href="#cursos" className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5 transition">
              Ver cursos
            </a>
          </div>

          <blockquote className="mt-8 p-4 bg-white/5 rounded-lg italic text-slate-100/90">
            “Si puedes imaginarlo, puedes programarlo” — Teachly
          </blockquote>
        </div>

        <div className="relative">
          <div className="rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-8 shadow-2xl transform rotate-2">
            <img src="/images/hero-code.png" alt="hero" className="w-full h-80 object-cover rounded-xl" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold">Cursos destacados</h4>
              <p className="text-sm text-slate-200/80">CSS · HTML · JavaScript · Python · PHP</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-semibold">Proyectos reales</h4>
              <p className="text-sm text-slate-200/80">Aprende con retos y ejercicios.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cursos" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-6">Nuestros cursos</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "CSS", color: "bg-blue-600" , desc: "Diseña páginas hermosas y responsivas."},
            { title: "HTML", color: "bg-orange-600" , desc: "Estructura y semántica para la web."},
            { title: "JavaScript", color: "bg-yellow-500" , desc: "Lógica, DOM y programación moderna."},
            { title: "Python", color: "bg-green-600" , desc: "Automatiza tareas y crea APIs."},
            { title: "PHP", color: "bg-violet-600" , desc: "Back-end clásico y conexiones a BD."}
          ].map((c) => (
            <article key={c.title} className="rounded-xl p-4 bg-white/5 hover:scale-105 transition">
              <div className={`w-12 h-12 rounded-md flex items-center justify-center ${c.color} text-white font-bold`}>{c.title[0]}</div>
              <h4 className="mt-3 font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm text-slate-200/80">{c.desc}</p>
              <div className="mt-4">
                <a href={`/courses/${c.title.toLowerCase()}`} className="text-indigo-300 hover:underline text-sm">Ir al curso →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Teachly · Ingeniería de Sistemas</p>
          <p className="text-sm opacity-70">Si puedes imaginarlo, puedes programarlo</p>
        </div>
      </footer>
    </main>
  );
}
