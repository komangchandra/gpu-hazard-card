import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-grow-1 p-4" style={{ background: "#f8f9fa" }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
