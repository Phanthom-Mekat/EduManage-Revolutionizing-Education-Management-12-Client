import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import CreateAssignmentModal from "./CreateAssignmentModal"

const ClassDetails = () => {
  const { id } = useParams()
  const [classDetails, setClassDetails] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchClassDetails()
  }, []) 

  const fetchClassDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/classes/${id}`)
      setClassDetails(response.data)
    } catch (error) {
      console.error("Error fetching class details:", error)
    }
  }

  const handleCreateAssignment = () => {
    setIsModalOpen(true)
  }

  const handleAssignmentCreated = () => {
    setIsModalOpen(false)
    fetchClassDetails() // Refresh class details
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
        classId={id}
      />
    </div>
  )
}

export default ClassDetails

