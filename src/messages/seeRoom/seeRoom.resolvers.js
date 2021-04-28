import client from "../../client"

export default {
	Query: {
		seeRoom: async (_, { id }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const room = await client.room.findFirst({
				where: {
					id,
					users: {
						some: {
							id: loggedInUser.id,
						},
					},
				},
			})
			return room
		},
	},
}
