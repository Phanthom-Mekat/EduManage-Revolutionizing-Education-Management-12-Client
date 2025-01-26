import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, User, LogOut } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    logOut()
        .then(() => navigate("/"))
        .catch(err => console.log(err));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl font-bold text-blue-600">StudyHub</h1>
          </div>
          <ul className="flex flex-col py-4">
            <li>
              <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100">
                <LayoutDashboard className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-enroll-class"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100"
              >
                <BookOpen className="mr-3" />
                My Enroll Class
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100">
                <User className="mr-3" />
                Profile
              </Link>
            </li>
          </ul>
          <div className="mt-auto mb-4 px-6">
            <Button variant="" className="w-full bg-black " onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Student Dashboard</h2>
          <div className="flex items-center">
            <img src={user?.photoURL || "/placeholder.svg"} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
            <span className="font-medium text-gray-700">{user?.displayName}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

