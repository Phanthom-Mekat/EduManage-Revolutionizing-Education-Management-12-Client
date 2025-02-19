import  { useState, useEffect, useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home,
  Users,
  FileCheck,
  Star 
} from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TeacherDashBoardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    totalAssignments: 0,
    averageRating: 0
  });

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch(err => console.log(err));
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://edumanagebackend.vercel.app/classes?instructorEmail=${user?.email}`);
        const data = await response.json();
        setClasses(data.classes || []);
        
        
        const totalStudents = data.classes?.reduce((acc, cls) => acc + (cls.totalEnrollment || 0), 0) || 0;
        const totalAssignments = data.classes?.reduce((acc, cls) => acc + (cls.totalAssignments || 0), 0) || 0;
        const avgRating = data.classes?.reduce((acc, cls) => acc + (cls.averageRating || 0), 0) / (data.classes?.length || 1);
        
        setStats({
          totalStudents,
          totalClasses: data.classes?.length || 0,
          totalAssignments,
          averageRating: avgRating.toFixed(1)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  const navItems = [
    { path: "/teacher", icon: <LayoutDashboard className="mr-3" />, label: "Dashboard" },
    { path: "/teacher/addclass", icon: <PlusCircle className="mr-3" />, label: "Add Class" },
    { path: "/teacher/my-classes", icon: <BookOpen className="mr-3" />, label: "My Classes" },
    { path: "/teacher/profile", icon: <User className="mr-3" />, label: "Profile" }
  ];

  // Chart data preparation
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const enrollmentData = classes.map(cls => ({
    name: cls.title,
    students: cls.totalEnrollment || 0
  }));

  const assignmentData = classes.map(cls => ({
    name: cls.title,
    submitted: cls.totalSubmissions || 0,
    total: cls.totalAssignments || 0
  }));

  const statusData = [
    { name: 'Approved', value: classes.filter(cls => cls.status === 'approved').length },
    { name: 'Pending', value: classes.filter(cls => cls.status === 'pending').length },
    { name: 'Rejected', value: classes.filter(cls => cls.status === 'rejected').length }
  ];

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <h3 className="text-2xl font-bold">{stats.totalClasses}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <FileCheck className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Assignments</p>
              <h3 className="text-2xl font-bold">{stats.totalAssignments}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Star className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold">{stats.averageRating}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment by Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={assignmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="submitted" stroke="#00C49F" />
                  <Line type="monotone" dataKey="total" stroke="#FF8042" />
                </LineChart>
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
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

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
            <Link to='/' className="w-full btn flex items-center justify-center hover:bg-blue-50">
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
          {window.location.pathname === '/teacher' ? <DashboardContent /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashBoardLayout;