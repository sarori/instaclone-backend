import client from "../../client"

export default {
	Mutation: {
		toggleLike: async (_, { id }, { loggedInUser, protectedResolver }) => {
			const ok = await client.photo.findUnique({
				where: id,
			})
			if (!ok) {
				return {
					ok: false,
					error: "Photo not found",
				}
			} else {
				protectedResolver(loggedInUser)
			}
		},
	},
}
