import dotenv from 'dotenv';

dotenv.config();

export default {
    HOST: process.env.HOST || 'No encontre la variable de entorno HOST',
    PORT: process.env.PORT || 'No encontre la variable de entorno PORT',
    API_URL: process.env.API_URL || 'No encontre la variable de entorno API_URL',
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'No encontre la variable de entorno CONNECTION_STRING',
    DATABASE: process.env.DATABASE || 'No encontre la variable de entorno DATABASE',
    DB_USER: process.env.DB_USER || 'No encontre la variable de entorno DB_USER',
    DB_PASSWORD: process.env.DB_PASSWORD || 'No encontre la variable de entorno DB_PASSWORD',
    CLUSTER: process.env.CLUSTER || 'No encontre la variable de entorno CLUSTER',
}