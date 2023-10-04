import React from "react";
import { Link } from "react-router-dom";
function FaceRecognitionNavbar({toggleHandle}) {
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
              <Link className="opacity-5 text-dark" to="#">
                Pages
              </Link>
            </li>
            <li
              className="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              Face Recognition
            </li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Face Recognition</h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group"></div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center"  onClick={(e)=> toggleHandle()}>
              <Link
                to="#"
                className="nav-link text-body p-0"
                id="iconNavbarSidenav"
              >

                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </Link>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <Link to="#" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default FaceRecognitionNavbar;
