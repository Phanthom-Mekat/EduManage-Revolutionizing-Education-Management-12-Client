import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/provider/AuthProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Book,
  Trophy,
  Clock
} from "lucide-react"

const MyProfile = () => {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)

  const studentStats = {
    joinDate: "February 2024",
    enrolledCourses: "12 Courses",
    completedCourses: "8 Courses",
    averageGrade: "A-"
  }

  const StatCard = ({ title, value, icon }) => (
    <Card className="bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-all duration-300">
      <CardContent className="flex items-center p-4">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <Card className="md:col-span-2 bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Profile
              </CardTitle>
              <p className="text-gray-600 mt-2">Welcome back, {user.displayName}!</p>
            </div>
            <Button 
              variant=""
              onClick={() => setIsEditing(!isEditing)}
              className="hover:bg-blue-50"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-blue-100 ring-4 ring-blue-50">
                  <AvatarImage src={user.photoURL} alt={user.displayName} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user.displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 right-0 bg-gradient-to-r from-blue-500 to-purple-500">
                  Active Student
                </Badge>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="" className="bg-blue-50">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    Student
                  </Badge>
                  <Badge variant="" className="bg-purple-50">
                    <Trophy className="w-3 h-3 mr-1" />
                    {studentStats.averageGrade}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="text-blue-500" size={16} />
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="text-blue-500" size={16} />
                  <span className="font-medium">Phone:</span>
                  <span>{user.phoneNumber || "Not provided"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="text-blue-500" size={16} />
                  <span className="font-medium">Join Date:</span>
                  <span>{studentStats.joinDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="text-blue-500" size={16} />
                  <span className="font-medium">Last Active:</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learning Journey
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <StatCard 
              title="Enrolled Courses"
              value={studentStats.enrolledCourses}
              icon={<Book className="text-blue-600" size={20} />}
            />
            <StatCard 
              title="Completed Courses"
              value={studentStats.completedCourses}
              icon={<Trophy className="text-blue-600" size={20} />}
            />
            <StatCard 
              title="Average Grade"
              value={studentStats.averageGrade}
              icon={<GraduationCap className="text-blue-600" size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile