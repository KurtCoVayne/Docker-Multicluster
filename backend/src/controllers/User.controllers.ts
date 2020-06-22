import { Request, Response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import { seed ,expiresIn } from '../config/keys';
import UserModel,{ IUser } from '../models/User.model';

class UserControllers{

    public async signin(req:Request,res:Response){
        const {email, password}=req.body;

        const user=await UserModel.findOne({email});
        if(user===undefined || user===null) return(res.json({statusText:'UserNotFound'}).status(404));
        if(!bcrypt.compareSync(password, user.password)) return res.json({statusText:'UserWrongPassword'});
        
        let token= jwt.sign({
            id:user.id,email:user.email
        },String(seed),{expiresIn: expiresIn});

        return(res.json({user,token:'JWT '+token,statusText:'done'}).status(200));
    }

    public async signup(req:Request,res:Response){
        const {email, username, password}=req.body;
        const user=await UserModel.findOne({email});
        if(user) return res.json({statusText:'UserAlreadyExist'});

        const newUser:IUser = new UserModel({
            username,
            password:bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            email
        });
        await newUser.save();
        return res.json({statusText:'done'});
    }

    public async changePass(req:Request,res:Response){
        const {password, newpassword,email}=req.body;

        const user=await UserModel.findOne({email});
        if(!user) return res.json({statusText:'UserNotFound'});
        if(!bcrypt.compareSync(password, user.password)) return res.json({statusText:'UserWrongPassword'});

        user.password=bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10));
        user.save();
        return res.json({statusText:'done'});
    }

}

export const userController = new UserControllers();