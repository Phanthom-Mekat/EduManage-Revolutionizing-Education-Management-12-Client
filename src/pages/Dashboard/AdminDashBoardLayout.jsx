import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, UserPlus, Users, BookOpen, User, LogOut, Menu, X, Home } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"

const AdminDashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(err => console.log(err))
  }

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/teacher-request", icon: UserPlus, label: "Teacher Request" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/all-classes", icon: BookOpen, label: "All Classes" },
    { path: "/admin/profile", icon: User, label: "Profile" },
  ]

  // eslint-disable-next-line react/prop-types
  const NavItem = ({ path, icon: Icon, label }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 transition-colors duration-200
        ${isActive ? "bg-blue-100 text-blue-600 font-medium" : ""}`
      }
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </NavLink>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out z-30
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-6 shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">AdminHub</h1>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavItem {...item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-4 p-4 border-t">
          <Link to='/'
              
              className="w-full btn  flex items-center justify-center hover:bg-blue-50"
            >
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
            <Button
              variant=""
              className="w-full flex items-center justify-center hover:bg-blue-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-3">
              <button
                className="text-gray-600 hover:text-gray-900 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block font-medium text-gray-700">
                {user?.displayName}
              </div>
              <img
                src={user?.photoURL || "/placeholder.svg"}
                alt="Profile"
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardLayout