import { Request, Response } from 'express';
import { mainImageRegex, mainImageRepo, sudoPassword, db, startContainerPort } from '../config/keys'
import { getImages, pullImage, getNonExistingContainers, getContainers, createContainer } from '../api/container-api'
import UserModel from '../models/User.model'
import ContainerModel from '../models/Container.model'
import Dockerode from 'dockerode';
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
                code_server_port:maxPort+1,
                open_server_port:maxPort+2
            })
            maxPort +=2
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
        console.log("END OF RECONSIDERATION")
    }

    public async getContainer(req: Request, res: Response) {
        const { user_id } = req.params
        res.send(user_id)
    }
    public async updateContainer(req: Request, res: Response) {
        const { id } = req.params
        res.send(id)
    }
    public async deleteContainer(req: Request, res: Response) {
        const { id } = req.params
        res.send(id)
    }
    public async reconsider(req: Request, res: Response) {
        await this.init()
        res.json("Reconsidered")
    }

}
const containerController = new ContainerController()
export default containerController