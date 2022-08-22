import {gql} from '@apollo/client';

const DELETE_CUSTOMER = gql`
mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
        id
        name
        email
        phone
    }
}
`;

export {DELETE_CUSTOMER};