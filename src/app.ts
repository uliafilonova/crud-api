import dotenv from 'dotenv';
import { createServer } from 'http';
import { env } from 'process';
import { getRouter } from './router';


dotenv.config();

export const server = createServer(getRouter);
const SERVER_PORT = env.SERVER_PORT || 4000,
    SERVER_STATUS = 'The server started on the port';
    
process.on('uncaughtException', (error) => {
    console.error(`${error}`);
});
process.on('unhandledRejection', (error) => {
    throw error;
});



server.listen(SERVER_PORT, () => console.log(`${SERVER_STATUS} : ${SERVER_PORT}`));