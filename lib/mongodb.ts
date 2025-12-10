import mongoose from "mongoose";

type MongooseGlobal = {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
};

// Declaración global para Next.js (evita múltiples conexiones)
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseGlobal | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI in .env.local");
}

// Usamos cache global si existe
let cached: MongooseGlobal = global.mongoose ?? { conn: null, promise: null };

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                // Opciones recomendadas (no cambian nada, solo ayudan)
                bufferCommands: false
            })
            .then((mongoose) => mongoose.connection)
            .catch((err) => {
                console.error("❌ Error conectando a MongoDB:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;

    return cached.conn;
}

export default connectToDatabase;
