import client from "../../client"

export default {
	Query: {
		me: async (_, __, { loggedInUser, protectedResolver }) => {
			protectedResolver(loggedInUser)
			console.log(loggedInUser)
			const ok = await client.user.findUnique({ where: { id: loggedInUser.id } })

			return ok
		},
	},
}
