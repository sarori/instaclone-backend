import client from "../../client"

export default {
	Query: {
		seeRooms: async (_, __, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const rooms = await client.room.findMany({
				where: {
					users: {
						some: {
							id: loggedInUser.id,
						},
					},
				},
			})
			return rooms
		},
	},
}
