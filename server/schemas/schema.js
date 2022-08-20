//mongoose models. 
const Project = require('../models/Project');
const Customer = require('../models/Customer');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');

//Customer Schema. 
const CustomerSchema = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})
//Project Schema.
const ProjectSchema = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        //add the relationship of project to customer. In this setup the Project is the PARENT.
        customer: {
            type: CustomerSchema,
            resolve(parent, args) {
                //the parent in this instance is the project so when the project query is called
                //it will also return the customer via the customerId that matches w/ the project.
                return customer.findById(parent.customerId);
            }
        }
    })
})

//ROOT QUERY STUFF
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //To Fetch all customers. 
        customers: {
            type: new GraphQLList(CustomerSchema),
            resolve(parent, args) {
                //using the mongoose models to talk to our mongodb database. 
                return Customer.find();
            }
        },
        //To Fetch a customer.
        customer: {
            type: CustomerSchema,
            args: {id: {type: GraphQLID}},
            //resolvers. (what we want our customer query to return with)
            resolve(parent, args) {
                //this is where our mongoDB stuff will go. 
                return Customer.findById(args.id);
            }
        },
        //To Fetch all projects. 
        projects: {
          type: new GraphQLList(ProjectSchema),
          resolve(parent, args) {
            return Project.find();
          }
        },
        //To Fetch a Project by Id. 
        project: {
            type: ProjectSchema,
            args: {id: {type: GraphQLID}},
            //resolvers. (what we want our project query to return with)
            resolve(parent, args) {
                //more mongodb stuff. 
                //return the one project from the projects array where the project.id matches the
                //id that is submitted via the arguments for the resolver (args);
                return Project.findById(args.id);
            }
        }
    }
})

//***MUTATIONS****

// Customer Mutation.
const customerMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerSchema,
            args: {
                //using the GraphQL 'Non-Null' methode to make these fields required. 
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const customer = new Customer({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return customer.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: customerMutation,
})