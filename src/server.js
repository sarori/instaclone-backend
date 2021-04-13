require("dotenv").config()
import { ApolloServer } from "apollo-server"
import client from "./client"
import schema, { typeDefs, resolvers } from "./schema"
import { getUser, protectResolver } from "./users/user.utils"

const server = new ApolloServer({
	resolvers,
	typeDefs,
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
			protectResolver,
			client,
		}
	},
})

const PORT = process.env.PORT
server.listen(PORT).then(() => console.log(`Server is running on http://localhost:${PORT}/`))