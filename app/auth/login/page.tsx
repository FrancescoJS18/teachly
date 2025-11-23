"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.detail || "Credenciales inválidas ❌");
      } else {
        setMessage("Inicio de sesión correcto ✅");
        localStorage.setItem("teachly_token", data.token);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* 🔵 MÁS BURBUJAS ANIMADAS */}
      <div className="floating-icons">
        <img src="/icons/html.png" className="icon i1" />
        <img src="/icons/css.png" className="icon i2" />
        <img src="/icons/js.png" className="icon i3" />
        <img src="/icons/python.png" className="icon i4" />
        <img src="/icons/php.png" className="icon i5" />
        <img src="/icons/js.png" className="icon i6" />
        <img src="/icons/css.png" className="icon i7" />
        <img src="/icons/html.png" className="icon i8" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10">

        {/* ⭐ LOGO + TEXTO INICIAR SESIÓN */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src="/images/Logo.jpg" className="w-12 h-12" />
          <h2 className="text-3xl font-bold text-gray-800">
            Iniciar sesión
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 rounded-lg transition`}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}

          {/* Google */}
          <div className="flex items-center justify-center gap-2 mt-4 cursor-pointer">
            <img src="/images/google.jpg" alt="Google" className="w-5 h-5" />

            <button
              type="button"
              onClick={() => signIn("google")}
              className="text-blue-600 hover:underline font-semibold"
            >
              Continuar con Google
            </button>
          </div>

          <p className="text-center text-gray-700 mt-4">
            ¿No tienes cuenta?
            <a
              href="/auth/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              {" "}Regístrate aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
