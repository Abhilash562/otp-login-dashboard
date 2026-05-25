import Navbar from './Navbar.jsx';  // default import
import Sidebar from './Sidebar.jsx'; // default import

const DashboardLayout = ({ children }) => (
  <div className="dashboard" style={{ display: 'flex' }}>
    <Sidebar />
    <div className="main-content" style={{ flex: 1, padding: '1rem' }}>
      <Navbar />
      {children}
    </div>
  </div>
);

export default DashboardLayout;