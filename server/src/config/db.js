import mongoose from 'mongoose';
import { env } from './env.js';

let cachedConnection = null;
let lastAttempt = 0;
const RETRY_INTERVAL_MS = 5000;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  // Throttle retries if failed very recently
  const now = Date.now();
  if (now - lastAttempt < RETRY_INTERVAL_MS) {
    throw new Error('Database connection pending or temporarily unavailable. Ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.');
  }

  lastAttempt = now;
  const uri = env.mongoUri;
  try {
    cachedConnection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log(`[Database] MongoDB Atlas Connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (err) {
    console.error(`[Database Notice] Could not connect to Atlas: ${err.message}`);
    console.error(`[Database Tip] If accessing from a new network or deployment, add 0.0.0.0/0 in MongoDB Atlas -> Security -> Network Access.`);
    cachedConnection = null;
    throw err;
  }
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    cachedConnection = null;
  }
}
