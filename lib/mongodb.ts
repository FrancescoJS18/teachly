import mongoose from 'mongoose';

type MongooseGlobal = {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
};

// Declaramos global
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseGlobal | undefined;
}

// Aseguramos que MONGODB_URI exista
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI in .env.local');
}

let cached: MongooseGlobal = global.mongoose ?? { conn: null, promise: null };

async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
    }

    cached.conn = await cached.promise;
    global.mongoose = cached;
    return cached.conn;
}

export default connectToDatabase;


