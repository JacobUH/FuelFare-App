import { Navbar } from "../components/Navbar";

export default function Dashboard() {
  return (
    <div 
    className={`Dashboard ${
      location.pathname === "/dashboard" ? "dashboard-background" : ""
    }`}
    >
      <Navbar />
      
    </div>
  );
}