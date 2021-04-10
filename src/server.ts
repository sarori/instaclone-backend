require("dotenv").config()
import { ApolloServer } from "apollo-server"
import schema from "./schema"
import { getUser, protectResolver } from "./src/users/user.utils"

const server = new ApolloServer({
	schema,
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
			protectResolver,
		}
	},
})

const PORT = process.env.PORT
server.listen(PORT).then(() => console.log(`Server is running on http://localhost:${PORT}/`))
