import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <NavLink
        to="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">⚡ Dashboard</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              "nav-link text-white " + (isActive ? "active bg-primary" : "")
            }
          >
            <i className="bi bi-house-door"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/hazard-reports"
            className={({ isActive }) =>
              "nav-link text-white " + (isActive ? "active bg-primary" : "")
            }
          >
            <i className="bi bi-exclamation-triangle"></i> Hazard Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/raw-data"
            className={({ isActive }) =>
              "nav-link text-white " + (isActive ? "active bg-primary" : "")
            }
          >
            <i className="bi bi-exclamation-triangle"></i> Raw Data
          </NavLink>
        </li>
      </ul>
      <hr />
      <div>
        <button className="btn btn-outline-light btn-sm w-100">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
