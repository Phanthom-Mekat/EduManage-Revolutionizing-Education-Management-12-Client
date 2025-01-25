import { Link, NavLink } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Hamburger from "hamburger-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    };

    const navLinks = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/all-classes" 
                    className={({ isActive }) => 
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    All Classes
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/teach" 
                    className={({ isActive }) => 
                        isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                >
                    Teach on EduManage
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar container mx-auto">
                {/* Mobile Menu */}
                <div className="navbar-start lg:hidden">
                    <Hamburger
                        toggled={isMenuOpen}
                        toggle={setIsMenuOpen}
                        color="#3B82F6"
                        size={24}
                    />
                </div>

                {/* Logo */}
                <div className="navbar-start hidden lg:flex">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <FaChalkboardTeacher className="text-2xl text-primary mr-2" />
                        EduManage
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {navLinks}
                    </ul>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-base-100 lg:hidden z-50">
                        <ul className="menu p-4 space-y-2">
                            {navLinks}
                        </ul>
                    </div>
                )}

                {/* User Section */}
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img 
                                        src={user?.photoURL || "https://i.ibb.co/4Y3N8vM/avatar.png"} 
                                        alt="user-profile" 
                                    />
                                </div>
                            </label>
                            <ul 
                                tabIndex={0} 
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li className="px-4 py-2 cursor-default">
                                    {user?.displayName}
                                </li>
                                <li>
                                    <NavLink 
                                        to="/dashboard" 
                                        className="hover:bg-gray-100 rounded-lg"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="hover:bg-gray-100 rounded-lg text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <NavLink 
                            to="/auth/login"
                            className="btn btn-primary text-white"
                        >
                            Sign In
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;