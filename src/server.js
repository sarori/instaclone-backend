require("dotenv").config()
import { ApolloServer } from "apollo-server-express"
import express from "express"
import logger from "morgan"
import http from "http"
import client from "./client"
import { typeDefs, resolvers } from "./schema"
import { getUser, protectedResolver } from "./users/user.utils"
import pubsub from "./pubsub"

const apollo = new ApolloServer({
	resolvers,
	typeDefs,
	context: async ({ req }) => {
		if (req) {
			return {
				loggedInUser: await getUser(req.headers.token),
				protectedResolver,
				client,
			}
		}
	},
})

const app = express()

app.use(logger("tiny"))
apollo.applyMiddleware({ app })
app.use("/static", express.static("uploads"))

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

const PORT = process.env.PORT
httpServer.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}/graphql`)
})
