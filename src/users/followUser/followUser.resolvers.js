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
			console.log("ok", ok)
			const temp = await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						connect: {
							id: ok.id,
						},
					},
				},
			})
			console.log(temp)
			return {
				ok: true,
			}
		},
	},
}
