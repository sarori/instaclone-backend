import client from "../client"
import bcrypt from "bcrypt"

export default {
	Mutation: {
		createAccount: async (_, { firstName, lastName, username, email, password }) => {
			try {
				// check if username or email are already on DB.
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								username,
							},
							{
								email,
							},
						],
					},
				})
				if (existingUser) {
					throw new Error("This username or password is already taken")
				}
				// Hash password
				// save and return the user
				const uglyPassword = await bcrypt.hash(password, 10)
				return client.user.create({
					data: {
						username,
						email,
						firstName,
						lastName,
						password: uglyPassword,
					},
				})
			} catch (e) {
				return e
			}
		},
		login: async (_, { username, password }) => {
			//find user with args.username
			const user = await client.user.findFirst({ where: { username } })
			if (!user) {
				return {
					ok: false,
					error: "User not found",
				}
			}
			const passwordOk = await bcrypt.compare(password, user.password)
			if (!passwordOK) {
				return {
					ok: false,
					error: "Incorrect Password",
				}
			}
			//check password with args.password
			//Everything is fine,issue a token and send it to the user
		},
	},
}
