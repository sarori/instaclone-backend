import client from "../../client"
import { processHashtags } from "../photos.utils"
import { uploadToS3 } from "../../shared/shared.utils"

export default {
	Mutation: {
		uploadPhoto: async (_, { file, caption }, { loggedInUser, protectedResolver }) => {
			let hashtagObj = []
			if (caption) {
				//parse caption
				hashtagObj = processHashtags(caption)
				protectedResolver(loggedInUser)
				//get or create Hashtags
			}
			const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")
			//save the photo wtih the Parsed hashtags
			//add the photo to the hashtags
			return client.photo.create({
				data: {
					file: fileUrl,
					caption,
					user: {
						connect: {
							id: loggedInUser.id,
						},
					},
					...(hashtagObj.length > 0 && {
						hashtags: {
							connectOrCreate: hashtagObj,
						},
					}),
				},
			})
		},
	},
}
