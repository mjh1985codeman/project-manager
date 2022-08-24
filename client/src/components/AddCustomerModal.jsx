import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
//import { useMutation } from '@apollo/client';

export default function AddCustomerModal() {
    const [name, setName] = useState('') //Creating a react-state function called 'setName'
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone);
        document.getElementById("addCustomerModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }
    return (
        <>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addCustomerModal">
                <div className='d-flex, align-items-center'>
                    <FaUserPlus />
                    <div>Add Customer</div>
                </div>
            </button>
            <div className="modal fade" id="addCustomerModal" role="dialog" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCustomerModalLabel">Add Customer</h5>
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
                                        Email
                                    </label>
                                    <input type='email' className='form-control' id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className='form-lable'>
                                        Phone
                                    </label>
                                    <input type='text' className='form-control' id='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
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
