import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/provider/AuthProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Mail,
  Star,
  Users,
  Award,
  Book,
  CalendarDays,
  GraduationCap
} from "lucide-react"

const TeacherProfile = () => {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)

  const teacherStats = {
    experience: "5+ years",
    totalStudents: "250+",
    coursesCreated: "12",
    rating: "4.8",
    specialization: "Computer Science",
    totalReviews: "180",
    activeClasses: "4",
    nextClass: "Advanced Web Development - 2:00 PM"
  }

  const TeacherStatCard = ({ icon: Icon, label, value, bgColor }) => (
    <Card className="border-none shadow-md">
      <CardContent className={`${bgColor} p-4 rounded-lg`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-90 rounded-lg">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Profile Section */}
        <Card className="lg:col-span-3 border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                Teacher Profile
              </CardTitle>
              <p className="text-gray-600 mt-1">Educational Expert</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r text-black from-emerald-50 to-teal-50 p-6 rounded-xl">
              <div className="relative">
                <Avatar className="w-36 h-36 border-4 border-white shadow-lg">
                  <AvatarImage src={user.photoURL} alt={user.displayName} />
                  <AvatarFallback className="text-3xl bg-emerald-100 text-emerald-700">
                    {user.displayName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 right-0 bg-emerald-100 text-emerald-700 px-4">
                  Verified Teacher
                </Badge>
              </div>
              
              <div className="text-center text-gray-800 md:text-left space-y-3">
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                <div className="flex flex-wrap gap-2 text-gray-800 justify-center md:justify-start">
                    
                </div>
                <p className="text-gray-600 ">
                  {teacherStats.experience} Teaching Experience
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TeacherStatCard
                icon={Users}
                label="Total Students"
                value={teacherStats.totalStudents}
                bgColor="bg-blue-50"
              />
              <TeacherStatCard
                icon={BookOpen}
                label="Courses Created"
                value={teacherStats.coursesCreated}
                bgColor="bg-emerald-50"
              />
              <TeacherStatCard
                icon={Star}
                label="Reviews"
                value={teacherStats.totalReviews}
                bgColor="bg-amber-50"
              />
              <TeacherStatCard
                icon={Award}
                label="Active Classes"
                value={teacherStats.activeClasses}
                bgColor="bg-purple-50"
              />
            </div>

            {/* Contact Information */}
            <Card className="border-none bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="w-5 h-5 text-gray-500" />
                    <span>Next Class: {teacherStats.nextClass}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-gradient-to-b from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Course Completion Rate</span>
                  <Badge className="bg-emerald-100 text-emerald-700">98%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Student Satisfaction</span>
                  <Badge className="bg-amber-100 text-amber-700">96%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <Badge className="bg-blue-100 text-blue-700">100%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Teaching Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">
                    Advanced Web Development
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">
                    React Fundamentals
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">
                    JavaScript Mastery
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TeacherProfile