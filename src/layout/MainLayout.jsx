import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            footer
        </div>
    );
};

export default MainLayout;