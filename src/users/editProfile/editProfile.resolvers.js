import bcrypt from "bcrypt"
import client from "../../client"

export default {
	Mutation: {
		editProfile: async (
			_,
			{ firstName, lastName, username, email, password: newPassword, bio, avatar },
			{ loggedInUser, protectResolver }
		) => {
			console.log(avatar)
			protectResolver(loggedInUser)
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
