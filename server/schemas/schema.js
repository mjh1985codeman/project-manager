//mongoose models. 
const Project = require('../models/Project');
const Customer = require('../models/Customer');

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql');

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
                return Customer.findById(parent.customerId);
            }
        }
    })
})

//**QUERIES**//

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
        //To Fetch an individual customer by id.
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
        //To Fetch an individual Project by Id. 
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
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Adding a Customer.
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
        //Deleting a Customer. 
        deleteCustomer: {
            type: CustomerSchema,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                //logic to cascade delete the customer's associated project(s)
                //so that the customer's project(s) are also deleted upon the customer
                //being deleted. 
                Project.find({customerId: args.id}).then((projects) => {
                    projects.forEach(project => {
                        project.remove();
                    })
                })
                return Customer.findByIdAndRemove(args.id);
            },
        },
        //Adding a Project. 
        addProject: {
            type: ProjectSchema,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        //the name must be unique from one ENUM type to another.
                        name: 'ProjectStatus',
                        values: {
                            //the value is based on the Model.
                            'new': {value: 'Potential'},
                            'quote': {value: 'Quote-Delivered'},
                            'progress': {value: 'In-Progress'},
                            'complete': {value: 'Complete'},
                            'cancelled': {value: 'Cancelled'},
                            'delayed': {value: 'Delayed'},
                        }
                    })
                },
                customerId: {type: GraphQLNonNull(GraphQLID)},
            },
            //Adding a Project Resolver.
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    customerId: args.customerId,
                });
                return project.save();
            }
        },
        //Deleting a Project.
        deleteProject: {
            type: ProjectSchema,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            }
        },
        //Updating a Project.
        updateProject: {
            type: ProjectSchema,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        //the name must be unique from one ENUM type to another.
                        name: 'ProjectStatusUpdate',
                        values: {
                            //the value is based on the Model.
                            'new': {value: 'Potential'},
                            'quote': {value: 'Quote-Delivered'},
                            'progress': {value: 'In-Progress'},
                            'complete': {value: 'Complete'},
                            'cancelled': {value: 'Cancelled'},
                            'delayed': {value: 'Delayed'},
                        }
                    })
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    //All this is doing is basically saying if the project is not there
                    //then it will create it.  
                    {new: true}
                );
            }
        }
    }, 
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})