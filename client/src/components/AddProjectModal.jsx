import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
// import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function AddProjectModal() {
    const [name, setName] = useState('') //Creating a react-state function called 'setName'
    const [description, setDescription] = useState('')
    const [customerId, setCustomerId] = useState('')
    //status is an enum. 
    const [status, setStatus] = useState('potential');

    //Using the addProject Mutation here which is defined in the mutations file.. 
    const [addProject] = useMutation(ADD_CUSTOMER, {
        variables: { name, email, phone },
        update(cache, { data: { addCustomer } }) {
            const { customers } = cache.readQuery({
                query: GET_CUSTOMERS
            });
            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: { customers: [...customers, addCustomer] }
            })
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || phone === '') {
            return alert('Please Complete All Fields.');
        }
        addProject(name, description, customerId, status);
        setName('');
        setDescription('');
        setCustomerId('');
        setStatus('');
        //This is here so that the Modal closes upon the form being submitted. 
        document.getElementById("addProjectModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
    return (
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
                                        onChange={(e) => setDesciption(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className='form-lable'>
                                        Status
                                    </label>
                                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="potential">Potential</option>
                                        <option value="quote-delivered">Quote-Delivered</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="complete">Complete</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="delayed">Delayed</option>
                                    </select>
                                </div>
                                <button type='submit' className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
