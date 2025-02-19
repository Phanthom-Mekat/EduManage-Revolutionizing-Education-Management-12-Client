import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, BookOpen, User, LogOut, Menu, X, Home, GraduationCap, Star, Clock } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [enrolledClasses, setEnrolledClasses] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user details
        const userRes = await fetch('https://edumanagebackend.vercel.app/users');
        const users = await userRes.json();
        const userId = users.find((u) => u.email === user?.email)?.uid;

        // Fetch enrolled classes
        const classesResponse = await fetch(`https://edumanagebackend.vercel.app/enrolled-classes/${userId}`);
        if (!classesResponse.ok) {
          throw new Error('Failed to fetch enrolled classes');
        }
        const classesData = await classesResponse.json();
        setEnrolledClasses(classesData.enrolledClasses || []);

        // Fetch reviews
        const reviewsResponse = await fetch('https://edumanagebackend.vercel.app/reviews');
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchDashboardData();
    }
  }, [user]);

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/my-enroll-class", icon: BookOpen, label: "My Enroll Class" },
    { path: "/dashboard/profile", icon: User, label: "Profile" },
  ]

  // Calculate statistics
  const totalEnrolledCourses = enrolledClasses.length;
  const averageProgress = enrolledClasses.reduce((acc, course) => acc + (course.progress || 0), 0) / totalEnrolledCourses || 0;
  const completedCourses = enrolledClasses.filter(course => course.progress === 100).length;

  // Chart data
  const progressData = enrolledClasses.map(course => ({
    name: course.title?.substring(0, 15) + '...',
    progress: course.progress || 0
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  const renderDashboardContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-full"><span className="loading text-primary loading-dots loading-xl"></span></div>;
    }

    if (error) {
      return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                  <h3 className="text-2xl font-bold">{totalEnrolledCourses}</h3>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Average Progress</p>
                  <h3 className="text-2xl font-bold">{averageProgress.toFixed(1)}%</h3>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed Courses</p>
                  <h3 className="text-2xl font-bold">{completedCourses}</h3>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                  <h3 className="text-2xl font-bold">{reviews.length}</h3>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledClasses.slice(0, 3).map((course, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-gray-500">Progress: {course.progress || 0}%</p>
                    </div>
                    <div className="w-16 h-16">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={[
                              { value: course.progress || 0 },
                              { value: 100 - (course.progress || 0) }
                            ]}
                            innerRadius={20}
                            outerRadius={30}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {[0, 1].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : '#e5e7eb'} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
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
            <h1 className="text-3xl font-bold text-blue-600">EduManage</h1>
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
            <Link to='/' className="w-full btn flex items-center justify-center hover:bg-blue-50">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
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
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">Student Dashboard</h2>
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
          {window.location.pathname === '/dashboard' ? renderDashboardContent() : <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout