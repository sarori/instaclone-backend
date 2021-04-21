import client from "../../client"

export default {
	Mutation: {
		uploadPhoto: async (_, { file, caption }, { loggedInUser, protectedResolver }) => {
			let hashtagObj = []
			if (caption) {
				//parse caption
				const hashtags = caption.match(/#[\w]+/g)
				hashtagObj = hashtags.map((hashtag) => ({
					where: { hashtag },
					create: { hashtag },
				}))
				console.log(hashtagObj)
				//get or create Hashtags
			}
			//save the photo wtih the Parsed hashtags
			//add the photo to the hashtags
			return client.photo.create({
				data: {
					file,
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
