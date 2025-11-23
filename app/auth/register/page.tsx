'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import '../../styles/login.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden ❌')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.detail || 'Error al registrarse ❌')
      } else {
        setMessage('Usuario registrado correctamente ✅')
        setTimeout(() => {
          window.location.href = '/auth/login'
        }, 1200)
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-root" style={{ backgroundColor: '#f9fafb' }}>
      <div className="login-card" style={{ color: '#111' }}>
        <Image
          src="/images/logo.jpg"
          alt="Teachly"
          width={100}
          height={100}
          className="login-logo"
        />
        <h1 style={{ color: '#111', marginBottom: '10px' }}>
          Crear nueva cuenta
        </h1>

        <form onSubmit={handleRegister} className="login-form">
          <label style={{ color: '#222' }}>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            style={{ color: '#111', backgroundColor: '#fff' }}
          />

          <label style={{ color: '#222' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            style={{ color: '#111', backgroundColor: '#fff' }}
          />

          <label style={{ color: '#222' }}>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            required
            style={{ color: '#111', backgroundColor: '#fff' }}
          />

          <button
            type="button"
            onClick={() => (window.location.href = "/api/auth/google")}
            className="text-blue-600 hover:underline font-medium"
          >
            Continuar con Google
          </button>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/images/google.jpg"
              alt="Google"
              width={20}
              height={20}
            />
            <span style={{ color: '#111', fontWeight: 500 }}>
              Continuar con Google
            </span>
          </div>

          {message && (
            <p
              className="message"
              style={{
                color: message.includes('✅') ? 'green' : 'red',
                fontWeight: 500,
                marginTop: '12px',
              }}
            >
              {message}
            </p>
          )}
        </form>

        <p style={{ color: '#333', marginTop: '15px' }}>
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" style={{ color: '#2563eb', fontWeight: 600 }}>
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </main>
  )
}

