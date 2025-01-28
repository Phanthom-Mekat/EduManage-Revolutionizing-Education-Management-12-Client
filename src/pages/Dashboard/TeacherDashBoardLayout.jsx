import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PlusCircle, BookOpen, User, LogOut, Menu, X, Home } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"

const TeacherDashBoardLayout = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(err => console.log(err))
  }

  const navItems = [
    { path: "/teacher", icon: <LayoutDashboard className="mr-3" />, label: "Dashboard" },
    { path: "/teacher/addclass", icon: <PlusCircle className="mr-3" />, label: "Add Class" },
    { path: "/teacher/my-classes", icon: <BookOpen className="mr-3" />, label: "My Classes" },
    { path: "/teacher/profile", icon: <User className="mr-3" />, label: "Profile" }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 bg-white shadow-md h-full z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-6 shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">TeacherHub</h1>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 transition-colors ${
                      isActive ? "bg-blue-100 text-blue-600 font-medium" : ""
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4 mb-4 px-6">
          <Link to='/'
              
              className="w-full btn  flex items-center justify-center hover:bg-blue-50"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
            <Button
              variant="ghost"
              className="w-full hover:bg-red-100 hover:text-red-600 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 lg:px-6 py-4 bg-white shadow-md">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Teacher Dashboard</h2>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block mr-4">
              <span className="font-medium text-gray-700">{user?.displayName}</span>
            </div>
            <img
              src={user?.photoURL || "/placeholder.svg"}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TeacherDashBoardLayout