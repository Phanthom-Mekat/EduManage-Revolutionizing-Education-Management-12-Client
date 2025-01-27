import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios"
import { AuthContext } from "@/provider/AuthProvider"

const MyClasses = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/classes?instructorEmail=${user?.email}`)
      setClasses(response.data.classes)
    } catch (error) {
      console.error("Error fetching classes:", error)
    }
  }

  const handleUpdate = (id) => {
    // Implement update functionality
    console.log("Update class:", id)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await axios.delete(`http://localhost:5000/classes/${id}`)
        fetchClasses()
      } catch (error) {
        console.error("Error deleting class:", error)
      }
    }
  }

  const handleSeeDetails = (id) => {
    navigate(`/teacher/my-classes/${id}`)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem._id}>
            <img
              src={classItem.image || "/placeholder.svg"}
              alt={classItem.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
              <p className="text-gray-600">Price: ${classItem.price}</p>
              <p className="text-gray-600">Status: {classItem.status}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleUpdate(classItem._id)}>Update</Button>
              <Button variant="destructive" onClick={() => handleDelete(classItem._id)}>
                Delete
              </Button>
              <Button onClick={() => handleSeeDetails(classItem._id)} disabled={classItem.status !== "approved"}>
                See Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyClasses

