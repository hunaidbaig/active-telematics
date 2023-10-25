import React from "react";
import { useNavigate, Link } from "react-router-dom";

const DashboardNavBar = ({ toggleHandle }) => {
  const nav = useNavigate()

  function handleLogOut(){
    localStorage.removeItem('userToken');
    nav("/signin")
  }

  return (
    <nav
      class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm">
              <Link   class="opacity-5 text-dark" to="">
                Pages
              </Link  >
            </li>
            <li
              class="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          <h6 class="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
        <div
          class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            {/* <form action='insertion/messageSent.php' method='post'>
                            <div class='input-group'>
                                <input type='text' name='messagetoresellers' class='form-control' placeholder='Send message to All' />

                            </div>
                            <button type='submit' name='submit' class='btn bg-gradient-secondary mt-3 w-100'>Send</button>
                        </form> */}
          </div>
          <ul class="navbar-nav  justify-content-end">
            <li
              class="nav-item d-xl-none ps-3 d-flex align-items-center"
              onClick={(e) => toggleHandle()}
            >
              <div class="nav-link text-body p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                  <i class="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
            <li>
              <form onSubmit={handleLogOut}>
                <button
                  // type="submit"
                  class="btn bg-gradient-primary mt-3 w-100"
                >
                  Logout
                </button>
              </form>
            </li>
            {/* <li class="nav-item px-3 d-flex align-items-center">
              <Link   to="" class="nav-link text-body p-0">
                <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </Link  >
            </li>
            <li class="nav-item dropdown pe-2 d-flex align-items-center">
              <Link  
                to=""
                class="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa fa-bell cursor-pointer"></i>
              </Link  >
              <ul
                class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li class="mb-2">
                  <Link   class="dropdown-item border-radius-md" to="/">
                    <div class="d-flex py-1">
                      <div class="my-auto">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/img/team-2.jpg"
                          }
                          alt=""
                          class="avatar avatar-sm  me-3 "
                        />
                      </div>
                      <div class="d-flex flex-column justify-content-center"></div>
                    </div>
                  </Link  >
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
