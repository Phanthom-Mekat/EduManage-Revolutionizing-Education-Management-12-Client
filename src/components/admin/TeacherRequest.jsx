import  { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axios from "axios"

const TeacherRequest = () => {
  const [teacherRequests, setTeacherRequests] = useState([])

  useEffect(() => {
    fetchTeacherRequests()
  }, [])

  const fetchTeacherRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/classes")
      setTeacherRequests(response.data.classes)
    } catch (error) {
      console.error("Error fetching teacher requests:", error)
    }
  }

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/classes/${id}/approve`)
      fetchTeacherRequests()
    } catch (error) {
      console.error("Error approving request:", error)
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/classes/${id}/reject`)
      fetchTeacherRequests()
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Teacher Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherRequests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{request.instructorName}</TableCell>
              <TableCell>
                <img
                  src={request.instructorImage || "/placeholder.svg"}
                  alt={request.instructorName}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>{request.experience}</TableCell>
              <TableCell>{request.title}</TableCell>
              <TableCell>{request.category}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApprove(request._id)}
                  disabled={request.status !== "pending"}
                  className="mr-2"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(request._id)}
                  disabled={request.status !== "pending"}
                  variant="destructive"
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TeacherRequest

