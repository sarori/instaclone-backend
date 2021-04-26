import client from "../../client"

export default {
	Query: {
		seeFeed: async (_, __, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const feeds = await client.photo.findMany({
				where: {
					OR: [
						{
							user: {
								followers: {
									some: {
										id: loggedInUser.id,
									},
								},
							},
						},
						{
							userId: loggedInUser.id,
						},
					],
				},
				orderBy: {
					createdAt: "desc",
				},
			})
			return feeds
		},
	},
}
