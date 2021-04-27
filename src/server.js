require("dotenv").config()
import { ApolloServer } from "apollo-server-express"
import express from "express"
import logger from "morgan"
import client from "./client"
import { typeDefs, resolvers } from "./schema"
import { getUser, protectedResolver } from "./users/user.utils"
import { graphqlUploadExpress } from "graphql-upload"

const apollo = new ApolloServer({
	resolvers,
	typeDefs,
	uploads: false,
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
			protectedResolver,
			client,
		}
	},
})

const app = express()
app.use(graphqlUploadExpress())
app.use(logger("tiny"))
app.use("/static", express.static("uploads"))
apollo.applyMiddleware({ app })

const PORT = process.env.PORT
app.listen({ port: PORT }, () => {
	console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
