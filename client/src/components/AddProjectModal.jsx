import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CUSTOMERS } from '../queries/customerQueries';

export default function AddProjectModal() {
    const [name, setName] = useState('') //Creating a react-state function called 'setName'
    const [description, setDescription] = useState('')
    const [customerId, setCustomerId] = useState('')
    //status is an enum. 
    const [status, setStatus] = useState('potential');

    //Add Project logic.  
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, customerId, status },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            })
        }
    })

    //GET Customers for select. 
    const { loading, error, data } = useQuery(GET_CUSTOMERS);

    //Using the addProject Mutation here which is defined in the mutations file.. 

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || status === '') {
            return alert('Please Complete All Fields.');
        }

        addProject(name, description, customerId, status);

        setName('');
        setDescription('');
        setStatus('potential');
        setCustomerId('');
        //This is here so that the Modal closes upon the form being submitted. 
        document.getElementById("addProjectModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    };

    if (loading) return null;
    if (error) return "Something went wrong."

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addProjectModal">
                        <div className='d-flex, align-items-center'>
                            <FaList />
                            <div>New Project</div>
                        </div>
                    </button>
                    <div className="modal fade" id="addProjectModal" role="dialog" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className='form-lable'>
                                                Name
                                            </label>
                                            <input type='text' className='form-control' id='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}//creating function that calls the setName 'State' function to update State.
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-lable'>
                                                Description
                                            </label>
                                            <textarea type='email' className='form-control' id='description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-lable'>
                                                Status
                                            </label>
                                            <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                {/* note that the option 'value' references the key in the values object in the addProject mutation in the server 
                                               directory's schema.js file's addProject mutation.  */}
                                                <option value="new">Potential</option>
                                                <option value="quote">Quote-Delivered</option>
                                                <option value="progress">In Progress</option>
                                                <option value="complete">Complete</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="delayed">Delayed</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className='form-lable'>Customer</label>
                                            <select id="customerId" className="form-select" value={customerId}
                                                onChange={(e) => setCustomerId(e.target.value)}>
                                                <option value="">Select Customer...</option>
                                                {data.customers.map((customer) => (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.name}
                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <button type='submit' className="btn btn-secondary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
