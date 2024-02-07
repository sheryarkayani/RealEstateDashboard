import Dashboard from "./pages/dashboard";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/explore";
import Help from "./pages/help";
import { useStateContext } from "./context";

function App() {
  const {isMobile} = useStateContext();
  return (
    <>
      <div className="flex items-start">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-x-hidden">
          <NavBar />
          <section className={`content-wrapper ${isMobile ? 'p-3' : 'p-7'} pt-20 relative min-h-screen bg-white dark:bg-gray-800`}>
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/help" element={<Help />} />
              <Route element={<h1>404</h1>} />
            </Routes>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
