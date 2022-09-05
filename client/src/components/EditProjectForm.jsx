import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_SINGLE_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
    //state values. 
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    //updateProject Function using the updateProject Mutation. 
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_SINGLE_PROJECT, variables: { id: project.id } }]
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !status) {
            return alert("Please fill out all fields!");
        }

        //call the update Project Mutation. 
        updateProject(name, description, status);
    }

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
