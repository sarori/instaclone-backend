import client from "../../client"
import { processHashtags } from "../photos.utils"

export default {
	Mutation: {
		editPhoto: async (_, { id, caption }, { loggedInUser, protectedResolver }) => {
			const oldPhoto = await client.photo.findFirst({
				where: {
					id,
					userId: loggedInUser.id,
				},
				include: {
					hashtags: {
						select: {
							hashtag: true,
						},
					},
				},
			})
			if (!oldPhoto) {
				return {
					oldPhoto: false,
					error: "Photo not found",
				}
			}
			console.log(oldPhoto.hashtags)
			await client.photo.update({
				where: {
					id,
				},
				data: {
					caption,
					hashtags: {
						disconnect: oldPhoto.hashtags,
						connectOrCreate: processHashtags(caption),
					},
				},
			})
			return {
				ok: true,
			}
		},
	},
}
