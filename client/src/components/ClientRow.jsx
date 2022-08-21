import { FaTrash } from 'react-icons/fa';

export default function ClientRow({ customer }) {
    return (
        <tr>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm'>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
