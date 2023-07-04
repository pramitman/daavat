require('dotenv').config()
import mongoose from 'mongoose';
import express from 'express'

import { config } from '../../../config';

const dbUrl: any = config.DB_URL;
const mongooseConnection = express()
mongoose.connect(
    dbUrl
).then(() => console.log('Database successfully connected')).catch(err => console.log(err));

export { mongooseConnection }