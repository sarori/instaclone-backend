import client from "../../client"

export default {
	Mutation: {
		uploadPhoto: async (_, { file, caption }, { loggedInUser, protectedResolver }) => {
			if (caption) {
				//parse caption
				const hashtags = caption.match(/#[\w]+/g)
				console.log(hashtags)
				//get or create Hashtags
			}
			//save the photo wtih the Parsed hashtags
			//add the photo to the hashtags
			client.photo.create({
				data: {
					file,
					caption,
					hashtags: {
						connectOrCreate: [
							{
								where: {
									hashtag: "",
								},
								create: {
									hashtag: "",
								},
							},
						],
					},
				},
			})
		},
	},
}
