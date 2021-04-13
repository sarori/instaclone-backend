require("dotenv").config()
import { ApolloServer } from "apollo-server-express"
import express from "express"
import logger from "morgan"
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

const app = express()
app.use(logger("tiny"))
server.applyMiddleware({ app })

const PORT = process.env.PORT
app.listen({ port: PORT }, () => {
	console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
