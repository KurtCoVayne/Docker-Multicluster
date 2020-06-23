import Dockerode from 'dockerode';
import { IUser } from '../models/User.model'
import { dockerContainerServerPort, dockerContainerServerUri } from '../config/keys'
let dockerode = new Dockerode({ host: dockerContainerServerUri, port: dockerContainerServerPort })
// console.log(`Modem is ${JSON.stringify(dockerode.modem)}`)
if (!dockerode.modem) {
	console.error("Modem doesnt exist, connection to docker server failed")
	process.exit(1)
}
/**
 * Get all images from Docker server
 */
export const getImages = async () => {
	try {
		let images = await dockerode.listImages()
		return images
	} catch (error) {
		console.error(error)
		const nullable: Dockerode.ImageInfo[] = []
		return nullable
	}
}
/**
 * Get all containers from Docker server
 */
export const getContainers = async () => {
	try {
		let containers = await dockerode.listContainers({ all: true })
		return containers
	} catch (error) {
		console.error(error)
		const nullable: Dockerode.ContainerInfo[] = []
		return nullable
	}
}
/**
 * 
 * @param namesThatShouldExist self explanatory
 * @param containers An array of already existing containers
 * @returns This returns all containers wich name is not a user id
 */
export const getNonExistingContainers = (namesThatShouldExist: string[], containers: Dockerode.ContainerInfo[]) => {
	let containerNames = containers.map(({ Names }) => Names)
	let nonExistingContainers = namesThatShouldExist.reduce((acc: string[], nameThatShouldExist) => {
		let match = containerNames.some(names => names.some((name) => name === "/" + nameThatShouldExist))
		if (!match)
			acc.push(nameThatShouldExist)
		return acc
	}, [])
	return nonExistingContainers
}
export const getContainerWithId = (docker_id: string) => {
	return dockerode.getContainer(docker_id)
}
export const stopContainer = (docker_id: string) => {
	return dockerode.getContainer(docker_id).stop()
}
export const startContainer = (docker_id: string) => {
	return dockerode.getContainer(docker_id).start()
}
export const removeContainer = (docker_id: string) => {
	return dockerode.getContainer(docker_id).remove()
}
// export const createImage = async (imageFile: string) => {
// 	try {
// 		let stream = await dockerode.buildImage(imageFile, {
// 			t: 'kurtcovayne/code-server'
// 		})
// 		stream.pipe(process.stdout, {
// 			end: true
// 		})
// 		let flag = false
// 		stream.on('end', (e) => {
// 			console.log(e)
// 			flag = true
// 		}
// 		)
// 		return flag
// 	} catch (error) {
// 		console.error(error)
// 		return false
// 	}
// }
/**
 * 
 * @param repo A repo where to pull the image
 * @param verbose If should print the downloading stream.
 */
export const pullImage = async (repo: string, verbose = false) => {
	try {
		let stream = await dockerode.pull(repo, {})
		if (verbose) {
			stream.pipe(process.stdout, {
				end: true
			})
		}

		let flag = false
		stream.on('end', (e: any) => {
			console.log(e)
			flag = true
		})
		return flag
	} catch (error) {
		return false
	}
}
/**
 * 
 * @param options Take options and create container async, catches any error
 */
export const createContainer = async (options: Dockerode.ContainerCreateOptions) => {
	try {
		return await dockerode.createContainer(options)
	} catch (error) {
		console.error(error)
		return null
	}

}