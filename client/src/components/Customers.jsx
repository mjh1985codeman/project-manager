import { GET_CUSTOMERS } from '../queries/customerQueries';
import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';

export default function Customers() {
    const { loading, error, data } = useQuery(GET_CUSTOMERS)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>
    return (
        <>
            {!loading && !error && (
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.customers.map(customer => (
                            <ClientRow key={customer.id} customer={customer} />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
