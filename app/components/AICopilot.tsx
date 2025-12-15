"use client";

import { useState } from "react";

type Message = {
    role: "user" | "ai";
    text: string;
};

export default function AICopilot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim() && !code.trim()) return;

        const userMessage: Message = {
            role: "user",
            text: input
                ? input
                : "🧠 Analiza mi código y dime qué puedo mejorar",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "demo-user", // 🔹 IMPORTANTE
                    prompt: input,
                    code: code,
                }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: data.reply || "❌ No pude responder, intenta otra vez",
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: "❌ Error de conexión con la IA",
                },
            ]);
        }

        setLoading(false);
    };

    return (
        <>
            {/* BOTÓN FLOTANTE */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    fixed bottom-6 right-6 z-50
                    bg-indigo-600 text-white
                    w-14 h-14 rounded-full
                    shadow-xl text-2xl
                    hover:bg-indigo-700
                "
            >
                🤖
            </button>

            {/* PANEL */}
            {open && (
                <div
                    className="
                        fixed bottom-24 right-6 z-50
                        w-[420px] h-[600px]
                        bg-white rounded-xl
                        shadow-2xl border
                        flex flex-col
                    "
                >
                    {/* HEADER */}
                    <div className="bg-indigo-600 text-white p-3 rounded-t-xl font-semibold">
                        Tu salvador 🧠
                    </div>

                    {/* ÁREA DE CÓDIGO */}
                    <div className="p-3 border-b bg-slate-50">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="📌 Pega aquí tu código (opcional)"
                            className="
                                w-full h-28
                                border border-slate-300
                                rounded-lg p-2
                                text-xs font-mono
                                bg-white text-slate-900
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                        />
                    </div>

                    {/* MENSAJES */}
                    <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3 bg-white">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-lg whitespace-pre-wrap leading-relaxed ${
                                    msg.role === "user"
                                        ? "bg-indigo-100 text-slate-900 text-right"
                                        : "bg-slate-100 text-slate-800"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="text-slate-500 italic">
                                🤔 Se conciente pe
                            </div>
                        )}
                    </div>

                    {/* INPUT */}
                    <div className="p-3 border-t flex gap-2 bg-slate-50">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Te escucho hijo..."
                            className="
                                flex-1
                                border border-slate-300
                                rounded-lg
                                px-3 py-2
                                text-sm
                                bg-white
                                text-slate-900
                                placeholder-slate-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                        />
                        <button
                            onClick={sendMessage}
                            className="
                                bg-indigo-600
                                text-white
                                px-4
                                rounded-lg
                                font-semibold
                                hover:bg-indigo-700
                            "
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

