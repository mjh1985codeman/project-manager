import React from 'react'
import AddCustomerModal from '../components/AddCustomerModal'
import Projects from '../components/Projects'
import Customers from '../components/Customers'
import AddProjectModal from '../components/AddProjectModal'

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddCustomerModal />
                <AddProjectModal />
            </div>
            <Projects />
            <hr />
            <Customers />
        </>
    )
}
