import { Navbar } from "../components/Navbar";

export default function History() {
  return (
    <div className={`History ${
      location.pathname === "/history" ? "history-background" : ""
    }`}
    >
      <Navbar />
      <h1 className="my-4">History</h1>
    </div>
  );
}
