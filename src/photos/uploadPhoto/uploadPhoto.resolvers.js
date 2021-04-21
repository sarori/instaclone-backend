export default {
	Mutation: {
		uploadPhoto: async (_, { file, caption }, { loggedInUser, protectedResolver }) => {
			if (caption) {
				//parse caption
				//get or create Hashtags
			}
			//save the photo wtih the Parsed hashtags
			//add the photo to the hashtags
		},
	},
}
