const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type TestData {
        text: String!
        count: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    schema {
        query: RootQuery
    }
`);