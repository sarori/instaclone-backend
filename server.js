require("dotenv").config()
import { ApolloServer } from "apollo-server"
import schema from "./schema"

const server = new ApolloServer({
	schema,
	context: {
		token:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjE4MDQyNTQwfQ.CMCuvBjCsz2KmPGhjwQbcsN9b3ce40Vcn-TVfHzHw3g",
	},
})

const PORT = process.env.PORT

server.listen(PORT).then(() => console.log(`Server is running on http://localhost:${PORT}/`))
