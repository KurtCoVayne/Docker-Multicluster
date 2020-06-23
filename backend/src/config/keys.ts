export const port = process.env.PORT || 9000;
//export const port = 8080
export const env = process.env.NODE_ENV || 'dev';

export const expiresIn= process.env.TOKEN_EXPIRESIN || 60 * 60 * 24;

export const seed = process.env.SEED || 'este-es-el-seed-desarrollo';

export const db=process.env.MONGO_URI || 'mongodb://localhost:27017/docker-multicluster';

export const mainImageRepo = process.env.IMAGE_REPO || "linuxserver/code-server"

export const dockerContainerServerUri = process.env.DOCKER_URI || "localhost"

export const dockerContainerServerPort = process.env.DOCKER_PORT || 2375

export const mainImageRegex = RegExp(process.env.IMAGE_REGEX || /linuxserver\/code-server:((v[0-9]+.[0-9]+.[0-9]+-\w+)|(latest))/)

export const startContainerPort = parseInt(process.env.START_CONTAINER_PORT || String(8000)) 

export const sudoPassword = process.env.CONTAINER_SUDO_PASS || "development"

export const watchdogRepo = process.env.WATCHDOG_REPO || "caller_watchdog"