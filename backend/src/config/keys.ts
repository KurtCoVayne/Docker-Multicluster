export const port = process.env.PORT || 9000;

export const env = process.env.NODE_ENV || 'dev';

export const expiresIn= process.env.TOKEN_EXPIRESIN || 60 * 60 * 24;

export const seed = process.env.SEED || 'este-es-el-seed-desarrollo';

export const db=process.env.MONGO_URI || 'mongodb://localhost:27017/docker-multicluster';