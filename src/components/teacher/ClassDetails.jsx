import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import CreateAssignmentModal from "./CreateAssignmentModal"
import { useLoaderData } from "react-router-dom"

const ClassDetails = () => {
  const loaderData = useLoaderData()
  const [classDetails, setClassDetails] = useState(loaderData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateAssignment = () => {
    setIsModalOpen(true)
  }

  const handleAssignmentCreated = async () => {
    try {
      // Refresh class details after creating assignment
      const response = await axios.get(
        `http://localhost:5000/classes/${classDetails._id}`
      )
      setClassDetails(response.data)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error refreshing class details:", error)
    }
  }

  if (!classDetails) return <div>Loading...</div>

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Class Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">Total Enrollment</h3>
            <p className="text-3xl font-bold">{classDetails.totalEnrollment}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
            <p className="text-3xl font-bold">{classDetails.totalAssignments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">Total Submissions</h3>
            <p className="text-3xl font-bold">{classDetails.totalSubmissions}</p>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleCreateAssignment}>Create Assignment</Button>
      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAssignmentCreated={handleAssignmentCreated}
        classId={classDetails._id}  // Use correct class ID from loader data
      />
    </div>
  )
}

export default ClassDetails