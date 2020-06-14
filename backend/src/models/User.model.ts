import { Schema, Document, model } from 'mongoose';

const validRoles={
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const UserSchema=new Schema({
    username:{ type:String, required:true },
    password:{ type:String, required:true },
    permissions:{ type:String, required:false, default:'USER_ROLE', enum:validRoles },
    last_seen:{ type:Date, required:false, default:Date.now() },
    account_created:{ type:Date, required:false, default:Date.now() }
});

UserSchema.methods.toJSON= function(){
    let userObject=this.toObject();
    delete userObject.password;
    return userObject;
}

export interface IUser extends Document{
    username:string,
    password:string,
    email:string,
    permissions:string,
    last_seen:Date,
    account_created:Date
}

export default model<IUser>('User',UserSchema);