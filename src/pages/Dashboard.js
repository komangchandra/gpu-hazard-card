import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4">Welcome to Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">Total Reports</h5>
              <p className="card-text fs-4">120</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">Closed Hazards</h5>
              <p className="card-text fs-4">90</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3 shadow">
            <div className="card-body">
              <h5 className="card-title">Open Hazards</h5>
              <p className="card-text fs-4">30</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
