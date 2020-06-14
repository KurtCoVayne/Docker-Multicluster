import Dockerode from 'dockerode';

let dockerode = new Dockerode()

interface User {
	_id: string
	name: string
	email: string
	password: string
	date: string
	container: number
}
const getImages = async () => {
	try {
		let images = await dockerode.listImages()
		return images
	} catch (error) {
		console.error(error)
		const nullable: Dockerode.ImageInfo[] = []
		return nullable
	}
}
const getContainers = async () => {
	try {
		let containers = await dockerode.listContainers({ all: true })
		return containers
	} catch (error) {
		console.error(error)
		const nullable: Dockerode.ContainerInfo[] = []
		return nullable
	}
}
const getNonExistingContainers = (users: User[], containers: Dockerode.ContainerInfo[]) => {
	let containerNames = containers.map(({ Names }) => Names)
	let nonExistingContainers = users.reduce((acc: string[], { _id }) => {
		let match = containerNames.some(names => names.some((name) => name === "/" + _id))
		if (!match)
			acc.push(_id)
		return acc
	}, [])
	return nonExistingContainers
}
// const createImage = async (imageFile: string) => {
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
const pullImage = async (repo: string,verbose=false) => {
	try {
		let stream = await dockerode.pull(repo, {})
		if(verbose){
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
const createContainer = async (options:Dockerode.ContainerCreateOptions) => {
	try {
		return await dockerode.createContainer(options)
	} catch (error) {
		console.error(error)
		return null
	}
	
}
// const start = async () => {
// 	let mainImageRepo = "linuxserver/code-server"
// 	let mainImageNameRegex = /linuxserver\/code-server:((v[0-9]+.[0-9]+.[0-9]+-\w+)|(latest))/
// 	let images = await getImages()
// 	let doesMainImageExist = images.filter((image) => image.RepoTags.some((tag) => mainImageNameRegex.test(tag)))[0]
// 	console.log(doesMainImageExist ? "Image does exist" : "Image doesnt exist")
// 	if (!doesMainImageExist) {
// 		console.log(await pullImage(mainImageRepo))
// 	}

// 	let limit = 3
// 	users = users.slice(0, limit)
// 	let nonExistingContainers = getNonExistingContainers(users, await getContainers())
// 	nonExistingContainers.forEach(async element => {
// 		console.log(await createContainer({
// 			Image: doesMainImageExist.RepoTags[0],
// 			name:element
// 		}))
// 	});

// 	// if (images) {
// 	// 	const nonExistingContainers = getNonExistingContainers(users,images)
// 	// 	console.log(nonExistingContainers)
// 	// }
// 	return null
// }

// });