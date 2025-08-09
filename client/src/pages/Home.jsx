import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4">
      <div className="w-1/6 border border-b-gray-500 text-gray-300 justify-between rounded-xl p-4 flex flex-col bg-purple-400">
        <Sidebar />
      </div>
      <div className="w-5/6 border border-b-gray-500 rounded-xl p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
