import { Request, Response } from 'express';
import { mainImageRegex, mainImageRepo, sudoPassword, db, startContainerPort } from '../config/keys'
import { getImages, pullImage, getNonExistingContainers, getContainers, createContainer, getContainerWithId, stopContainer, removeContainer } from '../api/container-api'
import UserModel from '../models/User.model'
import ContainerModel from '../models/Container.model'
class ContainerController {
    //TODO: Should assert that the containers created are registered in database, else it will get error when trying to kill...
    public init = async () => {
        /**
         * TODO: SHOULD ENHACE ERROR RECEPTION
         * TODO: Should query max before forEach, then, in each iteration sum to max and assign
         */

        const images = await getImages()

        //Filters if any image matches a regex that follow the name of the main Image Repository
        const doesMainImageExist = images.filter((image) => image.RepoTags.some((tag) => mainImageRegex.test(tag)))[0]

        console.log(doesMainImageExist ? "Image does exist" : "Image doesnt exist")
        if (!doesMainImageExist) {
            console.log(await pullImage(mainImageRepo))
        }
        const users = await UserModel.find()
        const nonExistingContainers = getNonExistingContainers(users.map(user => user._id), await getContainers())
        const query = await ContainerModel.find().sort({ open_server_port: -1 }).limit(1)
        let maxPort = startContainerPort
            if (query[0])
                maxPort = query[0].open_server_port
        nonExistingContainers.forEach(async element => {
            console.log(`Maxport is ${maxPort}`)
            const dbContainer = new ContainerModel({
                user_id: element,
                code_server_port:++maxPort,
                open_server_port:++maxPort
            })
            //maxPort +=2
            let codeServerPortNamespace = dbContainer.code_server_port + "/tcp"
            let openServerPortNamespace = dbContainer.open_server_port + "/tcp"
            let container = await createContainer({
                Image: doesMainImageExist.RepoTags[0],
                name: String(element),
                HostConfig: {
                    PortBindings: {
                        [codeServerPortNamespace]: [{ HostPort: "8443" }],
                        [openServerPortNamespace]: [{ HostPort: "8080" }]
                    }
                },
                Env: [
                    "PUID=1000",
                    "PGID=1000",
                    "TZ=America/Bogota",
                    "PASSWORD=development",
                    "SUDO_PASSWORD=" + sudoPassword,
                ]
            })
            if (container) {
                //console.log("Created Container", container?.id)
                try {
                    dbContainer.docker_id = container?.id
                    console.log(`Saving: ${await dbContainer.save()}`)
                } catch (error) {
                    console.error(error)
                    container.remove()
                }

            } else {
                throw new Error("Couldnt create container");
            }
        });
        return {text:"END OF RECONSIDERATION",nonExistingContainers}
    }

    public async getContainer(req: Request, res: Response) {
        const { user_id } = req.body
        let query = await ContainerModel.findOne({user_id:user_id}).lean(true)
        if(query){
            let container = getContainerWithId(query.docker_id)
            res.status(200).json({query,container})
        }
        else{
            res.status(404).json({statusText:"Either user doesnt exists or User doesnt have container, in that case, please call /reconsider"})
            return
        }
        
    }
    public async killContainer(req: Request, res: Response) {
        const { containerID } = req.body
        let container = await ContainerModel.findByIdAndUpdate(containerID,{state:"stop"}).lean()
        if(container)res.send(await stopContainer(container.docker_id))
        else
            res.status(404).json({statusText:"Couldnt find container"})

    }
    public async deleteContainer(req: Request, res: Response) {
        const { containerID } = req.body
        let container = await ContainerModel.findById(containerID)
        if(container){
            let {docker_id} = container
            await container.remove()
            res.send(await removeContainer(docker_id))
        }else{
            res.status(404).json({statusText:"Couldnt find that container"})
        }
    }
    public async reconsider(req: Request, res: Response) {
        res.json(await this.init())
    }

}
const containerController = new ContainerController()
export default containerController