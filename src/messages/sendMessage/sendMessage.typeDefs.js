import { gql } from "apollo-server"

export default gql`
	type Mutation {
		sendMessage(payload: String!, roomdId: Int, userId: Int): MutationResponse!
	}
`
