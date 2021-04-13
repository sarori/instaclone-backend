import { createWriteStream } from "fs"
import bcrypt from "bcrypt"
import client from "../../client"

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword, bio, avatar },
			{ loggedInUser, protectResolver }
		) => {
			const { filename, createReadStream } = await avatar
			let avatarUrl = null
			if (avatar) {
				const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
				const readStream = createReadStream()
				const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
				readStream.pipe(writeStream)
				protectResolver(loggedInUser)
				avatarUrl = `http://localhost:4000/static/${newFilename}`
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
