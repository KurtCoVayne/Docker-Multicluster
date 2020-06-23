import { Schema, Document, model } from 'mongoose';
import { startContainerPort } from '../config/keys';

const validStates = {
    values: ['stop', 'off', 'running'],
    message: '{VALUE} no es un rol valido'
};

const ContainerSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'IUser', unique: true },
    open_server_port: { type: Number, required: true, unique: true, max: 65535, min: 1 },
    code_server_port: { type: Number, required: true, unique: true, max: 65535, min: 1 },
    docker_id: { type: String, required: true, unique: true },
    state: { type: String, required: false, default: 'off', enum: validStates },
    last_conections: { type: Date, required: false },
    container_created: { type: Date, default: Date.now(), required: false },
    should_be_killed: { type: Boolean, required: false, default: false }
});

ContainerSchema.post('remove', async function () {
    /*
    MOVE BACKWARDS ALL PORTS SO IT DOESNT STACK UP INFINITELY
    */
})

export interface IContainer extends Document {
    user_id: Schema.Types.ObjectId,
    docker_id: string,
    code_server_port: number,
    open_server_port: number,

    state: string,
    last_conections: Date,
    container_created: Date,
    should_be_killed: Boolean
}

const ContainerModel = model<IContainer>('Container', ContainerSchema)

export default ContainerModel