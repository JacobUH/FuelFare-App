import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Navbar />
      <h1 className="my-4">Dashboard</h1>
      <Footer color="#093d2e" />
    </div>
  );
}
