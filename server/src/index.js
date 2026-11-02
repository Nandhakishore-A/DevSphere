import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { registerSockets } from './sockets/index.js';

const app = createApp();
const server = http.createServer(app);

// Initialize Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  },
});

app.set('io', io);
registerSockets(io);

// Standalone execution (Local Development / Persistent Node Server)
if (!process.env.VERCEL && env.nodeEnv !== 'test') {
  connectDB()
    .then(() => {
      server.listen(env.port, () => {
        console.log(`[DevSphere Server] Listening on port ${env.port} (${env.nodeEnv})`);
        console.log(`[DevSphere Health] http://localhost:${env.port}/health`);
      });
    })
    .catch((err) => {
      console.error('[DevSphere Error during startup, continuing server]', err.message);
      // Fallback listen so server stays alive even if Atlas network whitelist is pending
      server.listen(env.port, () => {
        console.log(`[DevSphere Server] Listening on port ${env.port} (Atlas pending whitelist)`);
      });
    });

  const shutdown = async (signal) => {
    console.log(`\n[DevSphere Server] Received ${signal}, closing gracefully...`);
    server.close(async () => {
      await disconnectDB();
      console.log('[DevSphere Server] Closed HTTP server and MongoDB connection.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

// Export app for Vercel Serverless Functions
export default app;
export { app, server, io };
