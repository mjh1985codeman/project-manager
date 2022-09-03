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
mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
        id
        name
        email
        phone
    }
}
`;

export {DELETE_PROJECT, ADD_PROJECT};