import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import CustomerInfo from '../components/CustomerInfo';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_PROJECT } from '../queries/projectQueries';

export default function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
        variables: { id }
    });

    if (loading) return <Spinner />
    if (error) return <p>Somthing Went Wrong.</p>

    return (
        <>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>
                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead">{data.project.status}</p>
                    <CustomerInfo customer={data.project.customer} />
                </div>
            )}
        </>
    )
}