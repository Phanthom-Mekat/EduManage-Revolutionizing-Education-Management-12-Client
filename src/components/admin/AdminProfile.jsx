import { useContext, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/provider/AuthProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, Edit2, Check, Shield, BookOpen, Users, Award, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const AdminProfile = () => {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)

  const adminStats = {
    joinDate: "January 2024",
    totalManaged: "7",
    activeUsers: "10",
    totalReviews: "45"
  }

  const StatCard = ({ title, value, icon: Icon, gradient, delay = 0 }) => (
    <FadeIn delay={delay}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900/50 backdrop-blur-xl">
          <div className={`absolute inset-0 ${gradient} opacity-40 dark:opacity-20`} />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </FadeIn>
  )

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Admin Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account and view system overview</p>
          </div>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className={`gap-2 ${isEditing ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none" : ""}`}
          >
            {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur-xl h-full">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-300" />
                    <div className="relative">
                      <Avatar className="w-40 h-40 border-4 border-white dark:border-gray-800 shadow-xl">
                        <AvatarImage src={user?.photoURL} alt={user?.displayName} className="object-cover" />
                        <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                          {user?.displayName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-900">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.displayName}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none px-3 py-1">
                        <Shield className="w-3.5 h-3.5 mr-1.5" />
                        Administrator
                      </Badge>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-none px-3 py-1">
                        <Award className="w-3.5 h-3.5 mr-1.5" />
                        Full Access
                      </Badge>
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-none px-3 py-1">
                        <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Mail className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Phone className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Phone</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.phoneNumber || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Calendar className="text-green-600 dark:text-green-400 w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Join Date</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{adminStats.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Award className="text-orange-600 dark:text-orange-400 w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last Active</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Today</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Stats Column */}
        <div className="space-y-4">
          <FadeIn delay={0.2}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Platform Overview
            </h3>
          </FadeIn>
          <StatCard 
            title="Classes Managed"
            value={adminStats.totalManaged}
            icon={BookOpen}
            gradient="from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
            delay={0.3}
          />
          <StatCard 
            title="Active Users"
            value={adminStats.activeUsers}
            icon={Users}
            gradient="from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
            delay={0.4}
          />
          <StatCard 
            title="Total Reviews"
            value={adminStats.totalReviews}
            icon={Award}
            gradient="from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminProfile