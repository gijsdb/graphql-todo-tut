const { GraphQLServer } = require('graphql-yoga');
const data = require('./data.js');

const typeDefs = `
    type Todo {
        id: ID!
        title: String!
        done: Boolean!
    }

    type Query{
        allTodos: [Todo!]
    }

    type Mutation {
        createTodo(title: String!, done: Boolean!): Todo!
        deleteTodo(title: String!): Todo!
        updateTodo(title: String!, done: Boolean!): Todo!
    }
`;

const resolvers = {
    Query: {
        allTodos: () => data
    },
    Mutation: {
        createTodo:(_, { title, done }) => {
            const todo = {
                id: data.length,
                title, 
                done
            };
            data.push(todo);
            return todo;
        },
        deleteTodo:(_, { title }) => {
            const todoIndex = data.findIndex(todo => todo.title === title)
            const todo = data[todoIndex];
            data.splice(todoIndex, 1);
            return todo;
        },
        updateTodo:(_, { title, done }) => {
            const todo = data.find(todo => todo.title === title);
            todo.done = done;
            return todo;
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => console.log('Server is running on localhost:4000'))