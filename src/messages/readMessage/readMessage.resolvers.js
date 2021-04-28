import client from "../../client"

export default {
	Mutation: {
		readMessage: async (_, { id }, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			const message = await client.message.findFirst({
				where: {
					id,
					userId: {
						not: loggedInUser.id,
					},
					room: {
						users: {
							some: {
								id: loggedInUser.id,
							},
						},
					},
				},
				select: {
					id: true,
				},
			})
			if (!message) {
				return {
					ok: false,
					error: "Message not found",
				}
			}
			await client.message.update({
				where: {
					id,
				},
				data: {
					read: true,
				},
			})
			return {
				ok: true,
			}
		},
	},
}
