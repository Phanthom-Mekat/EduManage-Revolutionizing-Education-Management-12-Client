import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, BookOpen, User, LogOut, Menu, X, Home, GraduationCap, Star, Clock, TrendingUp, Award, Activity, ChevronRight, Brain, MessageCircle, BarChart3, Bell, Sparkles, Trophy } from "lucide-react"
import { AuthContext } from "@/provider/AuthProvider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { FadeIn } from "@/components/ui/micro-interactions"
import PageTitle from "@/components/PageTitle"


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
    { path: "/dashboard/quiz-generator", icon: Brain, label: "Quiz Generator" },
    { path: "/dashboard/ai-study-buddy", icon: MessageCircle, label: "AI Study Buddy" },
    { path: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/dashboard/flashcards", icon: Sparkles, label: "Flashcards" },
    { path: "/dashboard/achievements", icon: Trophy, label: "Achievements" },
    { path: "/dashboard/notifications", icon: Bell, label: "Notifications" },
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

  const NavItem = ({ path, icon: Icon, label }) => (
    <NavLink
      to={path}
      end={path === "/dashboard"}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl font-medium transition-all duration-200
        ${isActive
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800"
        }`
      }
    >
      <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110`} />
      <span>{label}</span>
    </NavLink>
  )

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <Card className="max-w-md border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <X className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    const activityData = [
      { name: 'Mon', hours: 2 },
      { name: 'Tue', hours: 4.5 },
      { name: 'Wed', hours: 3 },
      { name: 'Thu', hours: 5 },
      { name: 'Fri', hours: 4 },
      { name: 'Sat', hours: 6 },
      { name: 'Sun', hours: 3.5 },
    ];

    const radarData = [
      { subject: 'Math', A: 120, fullMark: 150 },
      { subject: 'Science', A: 98, fullMark: 150 },
      { subject: 'English', A: 86, fullMark: 150 },
      { subject: 'History', A: 99, fullMark: 150 },
      { subject: 'Physics', A: 85, fullMark: 150 },
      { subject: 'Coding', A: 65, fullMark: 150 },
    ];

    return (
      <div className="space-y-6">
        {/* Welcome Banner */}
        <FadeIn>
          <Card className="border-none bg-indigo-600 text-white overflow-hidden relative shadow-lg">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium mb-1">Welcome back,</p>
                  <h2 className="text-3xl font-bold mb-2">{user?.displayName}</h2>
                  <p className="text-indigo-100">Keep up the great work! 🚀</p>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-indigo-100 text-sm">Completion Rate</p>
                    <p className="text-2xl font-bold">{totalEnrolledCourses > 0 ? ((completedCourses / totalEnrolledCourses) * 100).toFixed(0) : 0}%</p>
                  </div>
                  <div className="w-20 h-20">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            { value: completedCourses },
                            { value: totalEnrolledCourses - completedCourses }
                          ]}
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#fff" />
                          <Cell fill="rgba(255,255,255,0.3)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FadeIn delay={0.1}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Enrolled Courses</p>
                      <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalEnrolledCourses}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        Active learning
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
                      <BookOpen className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Average Progress</p>
                      <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{averageProgress.toFixed(1)}%</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        Keep going!
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
                      <Clock className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                      <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{completedCourses}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        Well done!
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Reviews</p>
                      <h3 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{reviews.length}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        Feedback given
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center">
                      <Star className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </FadeIn>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FadeIn delay={0.5}>
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-semibold">Course Progress</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {progressData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={progressData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-800" />
                        <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                        <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Bar dataKey="progress" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    No course data available
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-semibold">Recent Activity</span>
                  <Link
                    to="/dashboard/my-enroll-class"
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {enrolledClasses.length > 0 ? (
                    enrolledClasses.slice(0, 4).map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                          {course.progress || 0}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress || 0}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-full bg-indigo-600 rounded-full"
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium min-w-[40px] text-right">
                              {course.progress || 0}%
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No courses enrolled yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FadeIn delay={0.7}>
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-semibold">Weekly Learning Activity</span>
                  <Activity className="w-5 h-5 text-indigo-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-800" />
                      <XAxis dataKey="name" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                      <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.8}>
            <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-semibold">Skills Assessment</span>
                  <Brain className="w-5 h-5 text-emerald-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} className="dark:fill-gray-400" />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                      <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.5}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTitle />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-800">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  EduManage
                </h1>
              </Link>
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.path} {...item} />
                ))}
              </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <Link
                to='/'
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
              >
                <Home className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">Home</span>
              </Link>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white border-none transition-all duration-300 rounded-xl"
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
          <header className="h-20 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-10">
            <div className="h-full flex items-center justify-between px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <button
                  className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {window.location.pathname === '/dashboard' ? 'Dashboard' :
                      window.location.pathname.includes('/my-enroll-class') ? 'My Courses' :
                        window.location.pathname.includes('/profile') ? 'My Profile' : 'Student Dashboard'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                    {window.location.pathname === '/dashboard' ? 'Overview of your learning journey' :
                      window.location.pathname.includes('/my-enroll-class') ? 'Manage your enrolled courses' :
                        window.location.pathname.includes('/profile') ? 'View and edit your profile' : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="h-10 w-px bg-gray-200 dark:bg-gray-800" />
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="hidden sm:block text-right">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
                  </div>
                  <div className="relative">
                    <img
                      src={user?.photoURL || "/placeholder.svg"}
                      alt="Profile"
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 dark:group-hover:ring-blue-400 transition-all"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950">
            <div className="p-4 lg:p-8">
              {window.location.pathname === '/dashboard' ? renderDashboardContent() : <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout