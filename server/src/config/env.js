import dotenv from 'dotenv';
dotenv.config();

const required = (key, fallback) => {
  const val = process.env[key] ?? fallback;
  if (val === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
};

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://nandhakishore252_db_user:kdcF1ZIjSYuRDJWw@cluster0.nrgzdjz.mongodb.net/DevSphere?retryWrites=true&w=majority',
  jwtSecret: process.env.JWT_SECRET || 'devsphere_super_secure_jwt_secret_token_key_2026_at_least_32_chars',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'zsfupefr',
    apiKey: process.env.CLOUDINARY_API_KEY || '956281599364653',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'UJ5UEJgFVt17dwgd4vAK3YQ_6HM',
    folder: process.env.CLOUDINARY_FOLDER || 'mern_stack_project_storage/DevSphere',
  },
};
