
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CUSTOMER } from '../mutations/customerMutations';
import { GET_CUSTOMERS } from '../queries/customerQueries';

export default function ClientRow({ customer }) {

    //useMutation hook. 
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        variables: { id: customer.id },
        //update the apollo cache to show the customer query again after 
        //the customer has been deleted.  
        update(cache, { data: { deleteCustomer } }) {
            const { customers } = cache.readQuery({ query: GET_CUSTOMERS });
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: { customers: customers.filter(customer => customer.id !== deleteCustomer.id) }
            })
        }
    })

    return (
        <tr>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={(deleteCustomer)}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
