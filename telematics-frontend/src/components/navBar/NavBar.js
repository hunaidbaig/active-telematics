import React from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const NavBar = ({ toggleHandle, title, backBtn = null, nestedRoute=null }) => {
    const nav = useNavigate()

    function handleLogOut() {
        localStorage.removeItem('userToken');
        nav("/signin")
    }

    return (
        <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
        >
            <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm">
                            <Link className="opacity-5 text-dark" to="">
                                Pages
                            </Link>
                        </li>
                        {
                            nestedRoute &&
                                <li
                                    className={`breadcrumb-item text-sm text-dark active ${nestedRoute && 'opacity-5 text-dark' } `}
                                    aria-current="page"
                                >
                                    { nestedRoute }
                                </li>

                        }
                        <li
                            className={`breadcrumb-item text-sm text-dark active `}
                            aria-current="page"
                        >
                            {title} 
                            
                        </li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0" style={{ marginRight: '1rem' }}>
                        {title}
                    </h6>
                    {
                        backBtn &&
                            <Link to={backBtn} className="back-btn">
                                <IoReturnDownBack style={{ height: '2rem', width: '26px', display: 'block' }} />
                            </Link>

                    }
                </nav>
                    
                <div
                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                    id="navbar"
                >
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    {/* {
                        temp &&
                            <div className="input-group">
                                <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Type here..." />
                            </div>

                    } */}
                    </div>

                    <ul className="navbar-nav justify-content-end">
                        <li
                            className="nav-item d-xl-none ps-3 d-flex align-items-center"
                            onClick={(e) => toggleHandle()}
                        >
                            <div className="nav-link text-body p-0" id="iconNavbarSidenav">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </div>
                        </li>
                        <li>
                            {
                                title === 'Dashboard' ?
                                    <form onSubmit={handleLogOut}>
                                        <button
                                            // type="submit"
                                            className="btn bg-gradient-primary mt-3 w-100"
                                        >
                                            Logout
                                        </button>
                                    </form> : null

                            }
                        </li>
                    </ul>
                </div>
            </div>
            
        </nav>
    );
};

export default NavBar;