import express,{Application} from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';

import {db,port,seed} from './config/keys';
import {jwt} from './middlewares/User.middleware';
import UserRoutes from './routes/User.routes';

const app:Application=express();

/* Server Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('jwt', jwt);
app.use(morgan('dev'));
app.use(cors());
app.use(session({
    secret:String(seed),
    resave:false,
    saveUninitialized:false
}));

/* Routes */
app.use('/user', UserRoutes);

/* Starting server */
app.listen(port, () => {
    console.log('Server running in port', port);
});

/* Connecting to DB */
mongoose.connect(String(db),{ useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log('DB connected',String(db));
});