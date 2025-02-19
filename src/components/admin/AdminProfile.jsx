import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/provider/AuthProvider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, Phone, MapPin, Calendar } from "lucide-react"

const AdminProfile = () => {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)

  const adminStats = {
    joinDate: "January 2024",
    location: "New York, USA",
    totalManaged: "7 Classes",
    activeUsers: "10 Students"
  }

  const StatCard = ({ title, value, icon }) => (
    <Card className="bg-white">
      <CardContent className="flex items-center p-4">
        <div className="p-2 bg-blue-50 rounded-lg mr-3">
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
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
            <Button 
              variant=""
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-blue-100">
                <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                <AvatarFallback className="text-2xl">
                  {user?.displayName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                <Badge variant="secondary" className="text-blue-600">Admin</Badge>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                  <MapPin size={16} />
                  {adminStats.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span className="font-medium">Email:</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} />
                  <span className="font-medium">Phone:</span>
                  <span>{user?.phoneNumber || "Not provided"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="font-medium">Join Date:</span>
                  <span>{adminStats.joinDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="font-medium">Last Active:</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <div className="grid grid-cols-1 gap-4">
            <StatCard 
              title="Total Classes Managed"
              value={adminStats.totalManaged}
              icon={<Calendar className="text-blue-600" size={20} />}
            />
            <StatCard 
              title="Active Students"
              value={adminStats.activeUsers}
              icon={<Clock className="text-blue-600" size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile