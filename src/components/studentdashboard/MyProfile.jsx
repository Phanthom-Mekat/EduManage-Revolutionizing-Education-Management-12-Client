import  { useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/provider/AuthProvider"

const MyProfile = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>Name:</strong> {user.displayName}
            </p>
            <p className="text-lg">
              <strong>Role:</strong> Student
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> {user.phoneNumber || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyProfile

