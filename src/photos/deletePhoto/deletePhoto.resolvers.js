import client from "../../client"

export default {
	Mutation: {
		deletePhoto: async (_, { id }, { protectedResolver, loggedInUser }) => {
			protectedResolver(loggedInUser)
			const photo = await client.photo.findUnique({
				where: {
					id,
				},
				select: {
					userId: true,
				},
			})
			if (!photo) {
				return {
					ok: false,
					error: "Photo not found",
				}
			} else if (photo.userId !== loggedInUser.id) {
				return {
					ok: false,
					error: "Not authorized",
				}
			} else {
				await client.photo.delete({
					where: {
						id,
					},
				})
				return {
					ok: true,
				}
			}
		},
	},
}
