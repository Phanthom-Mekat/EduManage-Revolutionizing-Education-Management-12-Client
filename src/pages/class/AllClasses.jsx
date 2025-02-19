import { useState, useEffect } from "react"
import axios from "axios"
import ClassCard from "./ClassCard"

const AllClasses = () => {
  const [classes, setClasses] = useState([])
  const [sortOrder, setSortOrder] = useState("default") // default, asc, desc

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://edumanagebackend.vercel.app/classes?status=approved")
        setClasses(response.data.classes)
      } catch (error) {
        console.error("Error fetching classes:", error)
      }
    }

    fetchClasses()
  }, [])

  const handleSort = (order) => {
    setSortOrder(order)
    const sortedClasses = [...classes].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price
      } else if (order === "desc") {
        return b.price - a.price
      }
      return 0
    })
    setClasses(sortedClasses)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Classes</h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleSort("asc")}
            className={`px-4 py-2 rounded ${
              sortOrder === "asc"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => handleSort("desc")}
            className={`px-4 py-2 rounded ${
              sortOrder === "desc"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Price: High to Low
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <ClassCard key={classItem._id} classItem={classItem} />
        ))}
      </div>
    </div>
  )
}

export default AllClasses
