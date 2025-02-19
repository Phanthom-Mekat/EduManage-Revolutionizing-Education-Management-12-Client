import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Hamburger from "hamburger-react";
import { ThemeContext } from "@/provider/ThemeProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://edumanagebackend.vercel.app/users?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        setUserRole(data[0].role);
                    }
                });
        }
    }, [user]);

    const handleLogout = () => {
        logOut()
            .then(() => { 
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    const getDashboardLink = () => {
        switch(userRole) {
            case 'admin':
                return '/admin';
            case 'teacher':
                return '/teacher';
            default:
                return '/dashboard';
        }
    };

    const activeClassName = "text-primary font-semibold border-b-2 border-primary transition-all duration-300";
    const inactiveClassName = "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300";

    const navLinks = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `px-3 py-2 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/all-classes" 
                    className={({ isActive }) => 
                        `px-3 py-2 ${isActive ? activeClassName : inactiveClassName}`
                    }
                >
                    All Classes
                </NavLink>
            </li>
            {userRole !== 'teacher' && userRole !== 'admin' && (
                <li>
                    <NavLink 
                        to="/teach" 
                        className={({ isActive }) => 
                            `px-3 py-2 ${isActive ? activeClassName : inactiveClassName}`
                        }
                    >
                        Teach on EduManage
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="navbar container mx-auto">
                <div className="navbar-start lg:hidden">
                    <Hamburger
                        toggled={isMenuOpen}
                        toggle={setIsMenuOpen}
                        color={isDarkMode ? "#60A5FA" : "#3B82F6"}
                        size={24}
                    />
                </div>

                <div className="navbar-start hidden lg:flex">
                    <Link to="/" className="btn btn-ghost text-xl dark:text-white">
                        <FaChalkboardTeacher className="text-2xl text-primary dark:text-blue-400 mr-2" />
                        <span className="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                            EduManage
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {navLinks}
                    </ul>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 lg:hidden z-50 border-t dark:border-gray-700">
                        <ul className="menu p-4 space-y-2">
                            {navLinks}
                        </ul>
                    </div>
                )}

                <div className="navbar-end space-x-4">
                    <label className="swap swap-rotate">
                        <input 
                            type="checkbox" 
                            onChange={toggleDarkMode} 
                            checked={isDarkMode}
                            className="theme-controller"
                        />
                        <svg className="swap-on fill-current w-6 h-6 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        <svg className="swap-off fill-current w-6 h-6 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-primary dark:ring-blue-400">
                                <div className="w-10 rounded-full">
                                    <img 
                                        src={user?.photoURL?.split("?")[0] || "https://via.placeholder.com/150"}
                                        alt="user-profile" 
                                    />
                                </div>
                            </label>
                            <ul 
                                tabIndex={0} 
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-52 border dark:border-gray-700"
                            >
                                <li className="px-4 py-2 cursor-default text-gray-700 dark:text-gray-300">
                                    {user?.displayName}
                                </li>
                                <li>
                                    <NavLink 
                                        to={getDashboardLink()}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left text-gray-700 dark:text-gray-300"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <NavLink 
                            to="/auth/login"
                            className="btn bg-primary hover:bg-primary/90 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
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