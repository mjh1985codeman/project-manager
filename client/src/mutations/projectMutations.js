import {gql} from '@apollo/client';

const ADD_PROJECT = gql`
mutation addProject($name: String!, $description: String!, $status: String!){
    addCustomer(name: $name, email: $email, phone: $phone)
    {
        id
        name
        email
        phone
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