import { io } from 'socket.io-client';

let socketInstance = null;

export function getSocket() {
  if (!socketInstance) {
    let socketUrl = (import.meta.env.VITE_SOCKET_URL || '').trim();

    if (socketUrl) {
      if (!socketUrl.startsWith('http://') && !socketUrl.startsWith('https://')) {
        socketUrl = `https://${socketUrl}`;
      }
      socketUrl = socketUrl.replace(/\/+$/, '');
    } else if (typeof window !== 'undefined') {
      socketUrl = window.location.origin;
    } else {
      socketUrl = 'http://localhost:5000';
    }

    socketInstance = io(socketUrl, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect_error', (err) => {
      console.warn('[DevSphere Socket Connection Error]', err.message);
    });
  }
  return socketInstance;
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}
