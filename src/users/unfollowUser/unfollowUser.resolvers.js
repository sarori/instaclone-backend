import client from "../../client"

export default {
	Mutation: {
		unfollowUser: async (_, { username }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const ok = await client.user.findUnique({
				where: { username },
			})
			console.log(loggedInUser)
			if (!ok) {
				return {
					ok: false,
					error: "Can't unfollow user.",
				}
			}
			await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						disconnect: {
							username: ok.username,
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
