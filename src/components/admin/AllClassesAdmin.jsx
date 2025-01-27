import{ useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axios from "axios"

const AllClassesAdmin = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/all-classes")
      setClasses(response.data)
    } catch (error) {
      console.error("Error fetching classes:", error)
    }
  }

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/classes/${id}/approve`)
      fetchClasses()
    } catch (error) {
      console.error("Error approving class:", error)
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/classes/${id}/reject`)
      fetchClasses()
    } catch (error) {
      console.error("Error rejecting class:", error)
    }
  }

  const handleProgress = async (id) => {
    // Implement progress functionality
    console.log("View progress for class:", id)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Classes</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Short Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((classItem) => (
            <TableRow key={classItem._id}>
              <TableCell>{classItem.title}</TableCell>
              <TableCell>
                <img
                  src={classItem.imageUrl || "/placeholder.svg"}
                  alt={classItem.title}
                  className="w-10 h-10 rounded"
                />
              </TableCell>
              <TableCell>{classItem.instructorEmail}</TableCell>
              <TableCell>{classItem.description.substring(0, 50)}...</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApprove(classItem._id)}
                  disabled={classItem.status === "approved"}
                  className="mr-2"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(classItem._id)}
                  disabled={classItem.status === "rejected"}
                  variant="destructive"
                  className="mr-2"
                >
                  Reject
                </Button>
                <Button onClick={() => handleProgress(classItem._id)} disabled={classItem.status !== "approved"}>
                  Progress
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllClassesAdmin

