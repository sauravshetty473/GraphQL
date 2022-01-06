const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const{
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
} = require('graphql')
const users = [
    {
        id : 1,
        first : 'saurav',
        last : 'shetty',
    },
    {
        id : 2,
        first : 'gaurav',
        last : 'shetty',
    },
    {
        id : 3,
        first : 'malathi',
        last : 'shetty',
    },
    {
        id : 4,
        first : 'vidyadhar',
        last : 'shetty',
    },
    {
        id : 5,
        first : 'shashank',
        last : 'shetty',
    },
]


const posts = [
    {
        id : 1,
        userID : 1,
        type : 'image'
    },
    {
        id : 2,
        userID : 1,
        type : 'image'
    },
    {
        id : 3,
        userID : 1,
        type : 'image'
    },
    {
        id : 4,
        userID : 2,
        type : 'image'
    },
    {
        id : 5,
        userID : 3,
        type : 'image'
    },
]



const app = express()


const UserType = new GraphQLObjectType({
    name : 'User',
    description : 'Users belonging to user base',
    fields:()=>({
        id : {
            type : GraphQLNonNull(GraphQLInt)
        },
        first : {
            type : GraphQLNonNull(GraphQLString)
        },
        last : {
            type : GraphQLNonNull(GraphQLString)
        },
        posts : {
            type : GraphQLList(PostType),
            resolve : (user) =>{
                return posts.filter(post=>post.userID === user.id)
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name : 'Post',
    description : 'Posts belonging to user base',
    fields:()=>({
        id : {
            type : GraphQLNonNull(GraphQLInt)
        },
        userID : {
            type : GraphQLNonNull(GraphQLInt)
        },
        type : {
            type : GraphQLNonNull(GraphQLString)
        },
    })
})

const RootQueryType = new GraphQLObjectType({
    name : 'Query',
    description : 'Root Query',
    fields : () => ({
        users : {
            type : GraphQLList(UserType),
            description: 'List of All Users',
            resolve:()=>users
        },
        posts : {
            type : GraphQLList(PostType),
            description: 'List of All Posts',
            resolve:()=>posts
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use('/graphql', graphqlHTTP({
    graphiql : true,
    schema : schema
}))



app.listen(5000., ()=>console.log('Server Running'))

