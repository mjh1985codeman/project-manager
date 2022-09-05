import {gql} from '@apollo/client';

//Note on the ADD_PROJECT the $status is referencing the enum NAME called ProjectStatus
//referenced in the server directory schema.js file in the addProject mutation schema.  
const ADD_PROJECT = gql`
mutation AddProject($name: String!, $description: String!, $status: ProjectStatus! $customerId: ID!) {
    addProject(name: $name, description: $description, 
        status: $status, customerId: $customerId) {
            id
            name
            description
            status
            customer {
                id
                name
                email
                phone
            }
        }
}
`

const DELETE_PROJECT = gql`
mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
        id
    }
}
`;

//Note on the UPDATE_PROJECT the $status is referencing the enum NAME called ProjectStatusUpdate
//referenced in the server directory schema.js file in the updateProject mutation schema. 
const UPDATE_PROJECT = gql`
mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!) {
    updateProject(id: $id, name: $name, description: $description, 
        status: $status) {
            id
            name
            description
            status
            customer {
                id
                name
                email
                phone
            }
        }
}
`

export {DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT};