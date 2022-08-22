import { GET_CUSTOMERS } from '../queries/customerQueries';
import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import Spinner from './Spinner'

export default function Customers() {
    //You have to use these naming conventions (loading, error and data) via the apollo/client.  
    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    if (loading) return <Spinner />;
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
