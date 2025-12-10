interface CoursePageProps {
    params: { id: string };
}

export default function CoursePage({ params }: CoursePageProps) {
    return (
        <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-100">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-8 border border-indigo-200">
                
                <h1 className="text-3xl font-bold text-indigo-700">
                    Curso seleccionado
                </h1>

                <p className="mt-3 text-slate-600">
                    Estás viendo el curso con el ID:
                </p>

                <div className="mt-2 p-4 bg-indigo-50 border border-indigo-200 rounded-lg font-mono text-indigo-700">
                    {params.id}
                </div>

                <p className="mt-6 text-slate-700">
                    Aquí pondremos la información del curso (HTML por ahora).
                </p>

                <a
                    href="/dashboard"
                    className="mt-6 inline-block px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                    Volver al Dashboard
                </a>

            </div>
        </main>
    );
}
