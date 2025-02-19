import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, UserPlus, Users, BookOpen, User, LogOut, Menu, X, Home, Star, GraduationCap } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AdminDashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    users: [],
    classes: [],
    teacherRequests: [],
    reviews: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, classes, teacherReqs, reviews] = await Promise.all([
          fetch('https://edumanagebackend.vercel.app/users').then(res => res.json()),
          fetch('https://edumanagebackend.vercel.app/all-classes').then(res => res.json()),
          fetch('https://edumanagebackend.vercel.app/reqteachers').then(res => res.json()),
          fetch('https://edumanagebackend.vercel.app/reviews').then(res => res.json())
        ]);

        setStats({
          users,
          classes,
          teacherRequests: teacherReqs.classes,
          reviews: reviews.reviews || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

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

  // Calculate summary statistics
  const totalUsers = stats.users.length;
  const totalClasses = stats.classes.length;
  const pendingTeacherRequests = stats.teacherRequests.filter(req => req.status === 'pending').length;
  const totalReviews = stats.reviews.length;

  // Prepare data for user roles pie chart
  const userRolesData = stats.users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(userRolesData).map(([role, count]) => ({
    name: role,
    value: count
  }));

  // Prepare data for class status bar chart
  const classStatusData = stats.classes.reduce((acc, cls) => {
    acc[cls.status] = (acc[cls.status] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(classStatusData).map(([status, count]) => ({
    status,
    count
  }));

  // Prepare data for enrollment trend line chart
  const enrollmentData = stats.classes.map(cls => ({
    name: cls.title?.substring(0, 15) + '...',
    enrollments: cls.totalEnrollment || 0
  }));

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center pt-6">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{totalUsers}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center pt-6">
            <BookOpen className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <h3 className="text-2xl font-bold">{totalClasses}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center pt-6">
            <GraduationCap className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Teachers</p>
              <h3 className="text-2xl font-bold">{pendingTeacherRequests}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center pt-6">
            <Star className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
              <h3 className="text-2xl font-bold">{totalReviews}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Roles Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Class Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Class Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enrollment Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Class Enrollment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enrollments" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
              className="w-full btn flex items-center justify-center hover:bg-blue-50"
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
        {window.location.pathname === '/admin' ? DashboardContent() : <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardLayout