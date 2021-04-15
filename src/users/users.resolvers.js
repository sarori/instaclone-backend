//Resolver of Field in Graphql type User

export default {
	User: {
		totalFollowing: (root) => {
			console.log(root)
			return 0
		},
		totalFollowers: () => 999,
	},
}
