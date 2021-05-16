import client from "../../client"

export default {
	Mutation: {
		unfollowUser: async (_, { username }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const ok = await client.user.findUnique({
				where: { username },
			})
			if (!ok) {
				return {
					ok: false,
					error: "Can't unfollow user.",
				}
			}
			console.log("ok", ok)
			const temp = await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						disconnect: {
							id: ok.id,
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
