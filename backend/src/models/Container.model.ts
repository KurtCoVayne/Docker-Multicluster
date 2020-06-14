import { Schema, Document, model } from 'mongoose';

const validStates={
    values: ['stop','off', 'running'],
    message: '{VALUE} no es un rol valido'
};

const ContainerSchema=new Schema({
    user_id:{ type:Schema.Types.ObjectId, required:true, ref:'IUser' },
    code_server_port:{ type:String, required:true },
    state:{ type:String, required:false, default:'off', enum:validStates },
    open_server_port:{ type:String, required:true },
    last_conections:{ type:Date, required:false, default:Date.now() },
    container_created:{ type:Date, required:false, default:Date.now() },
    should_be_killed:{ type:Boolean, required:false, default:false }
});

export interface IContainer extends Document{
    user_id: Schema.Types.ObjectId,
    code_server_port: String,
    state: String,
    open_server_port: String,
    last_conections: Date,
    container_created: Date,
    should_be_killed: Boolean
}

export default model<IContainer>('Container',ContainerSchema);