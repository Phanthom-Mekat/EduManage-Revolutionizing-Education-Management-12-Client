import { useState, useEffect } from "react"
import axios from "axios"
import ClassCard from "./ClassCard"

const AllClasses = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/classes?status=approved")
        setClasses(response.data.classes)
      } catch (error) {
        console.error("Error fetching classes:", error)
      }
    }

    fetchClasses()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <ClassCard key={classItem._id} classItem={classItem} />
        ))}
      </div>
    </div>
  )
}

export default AllClasses

