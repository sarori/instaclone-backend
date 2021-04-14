import client from "../../client"

export default {
	Mutation: {
		followUser: async (_, { username }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const ok = await client.user.findUnique({ where: { username } })
			if (!ok) {
				return {
					ok: false,
					error: "That user does not exist.",
				}
			}
			await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						connect: {
							username,
						},
					},
				},
			})
			return {
				ok: true,
			}
		},
	},
}
