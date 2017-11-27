import express from 'express';

import jwt from './jwt';
import local from './local';
import google from './google';
import facebook from './facebook';

const api = express.Router();

api.use('/jwt', jwt);
api.use('/local', local);
api.use('/google', google);
api.use('/facebook', facebook);

export default api;
