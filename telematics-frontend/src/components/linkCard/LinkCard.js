import React from 'react'
import { Link } from 'react-router-dom'

const LinkCard = ({ links }) => {
    return (
        <div className="container-fluid py-4">
            <div className="row">
            
                {
                    links.map((link, index)=>{
                        return(
                            <div key={index} className="col-xl-6 col-sm-6 mb-xl-0 mb-4">
                                <Link to={link.to}  style={{ textDecoration:'none', color: '#344767' }}>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="row">
                                                <div className="col-8 d-flex align-items-center">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bolder mb-0">{link.title}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4 text-end">
                                                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                        <i className="1 text-lg opacity-10" aria-hidden="true">
                                                            { link.icon }
                                                        </i> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LinkCard