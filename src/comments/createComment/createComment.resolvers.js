import client from "../../client"

export default {
	Mutation: {
		createComment: async (_, { photoId, payload }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const ok = await client.photo.findUnique({
				where: {
					id: photoId,
				},
				select: {
					id: true,
				},
			})
			if (!ok) {
				return {
					ok: false,
					error: "Photo not found.",
				}
			}
			const newComment = await client.comment.create({
				data: {
					payload,
					photo: {
						connect: {
							id: photoId,
						},
					},
					user: {
						connect: {
							id: loggedInUser.id,
						},
					},
				},
			})
			return {
				ok: true,
				id: newComment.id,
			}
		},
	},
}
