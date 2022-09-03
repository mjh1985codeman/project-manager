

export default function ProjectCard({ project }) {
    return (
        <>
            <div className="col-md-4">
                <div className='card mb-3'>
                    <div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className='card-title'>{project.name}</h5>
                            <a className='btn btn-dark' href={`/projects/${project.id}`}>
                                View
                            </a>
                        </div>
                        <p>Status: {project.status}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
