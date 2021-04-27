import { createWriteStream } from "fs"
import bcrypt from "bcrypt"
import client from "../../client"
import { uploadPhoto } from "../../shared/shared.utils"

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword, bio, avatar },
			{ loggedInUser, protectedResolver }
		) => {
			const { filename, createReadStream } = await avatar
			let avatarUrl = null
			if (avatar) {
				avatarUrl = await uploadPhoto(avatar, loggedInUser.id)
				//file upload on Server
				// const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
				// const readStream = createReadStream()
				// const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
				// readStream.pipe(writeStream)
				// protectedResolver(loggedInUser)
				// avatarUrl = `http://localhost:4000/static/${newFilename}`
			}
			let uglyPassword = null
			if (newPassword) {
				uglyPassword = await bcrypt.hash(newPassword, 10)
			}
			const updatedUser = await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					firstName,
					lastName,
					username,
					email,
					bio,
					...(uglyPassword && { password: uglyPassword }),
					...(avatarUrl && { avatar: avatarUrl }),
				},
			})
			if (updatedUser.id) {
				return {
					ok: true,
				}
			} else {
				return {
					ok: false,
					error: "Could not update profile",
				}
			}
		},
	},
}

// import { createWriteStream } from "fs"
// import bcrypt from "bcrypt"
// import client from "../../client"
// import { protectedResolver } from "../user.utils"

// const resolverFn = async (
// 	_,
// 	{ firstName, lastName, username, email, password: newPassword, bio, avatar },
// 	{ loggedInUser }
// ) => {
// 	let avatarUrl = null
// 	if (avatar) {
// 		const { filename, createReadStream } = await avatar
// 		const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
// 		const readStream = createReadStream()
// 		const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
// 		readStream.pipe(writeStream)
// 		avatarUrl = `http://localhost:4000/static/${newFilename}`
// 	}
// 	let uglyPassword = null
// 	if (newPassword) {
// 		uglyPassword = await bcrypt.hash(newPassword, 10)
// 	}
// 	const updatedUser = await client.user.update({
// 		where: {
// 			id: loggedInUser.id,
// 		},
// 		data: {
// 			firstName,
// 			lastName,
// 			username,
// 			email,
// 			bio,
// 			...(uglyPassword && { password: uglyPassword }),
// 			...(avatarUrl && { avatar: avatarUrl }),
// 		},
// 	})
// 	if (updatedUser.id) {
// 		return {
// 			ok: true,
// 		}
// 	} else {
// 		return {
// 			ok: false,
// 			error: "Could not update profile.",
// 		}
// 	}
// }
// export default {
// 	Mutation: {
// 		editProfile: protectedResolver(resolverFn),
// 	},
// }
