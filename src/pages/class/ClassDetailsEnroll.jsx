import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"

const ClassDetailsEnroll = () => {
  const [classDetails, setClassDetails] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`https://edumanagebackend.vercel.app/classes/${id}`)
        setClassDetails(response.data)
      } catch (error) {
        console.error("Error fetching class details:", error)
      }
    }

    fetchClassDetails()
  }, [id])

  const handleEnroll = () => {
    navigate(`/payment/${id}`)
  }

  if (!classDetails) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">{classDetails.title}</h2>
      <img
        src={classDetails.image || "/placeholder.svg"}
        alt={classDetails.title}
        className="w-full max-w-2xl mb-6 rounded-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xl mb-2 dark:text-white">
            <strong>Instructor:</strong> {classDetails.instructorName}
          </p>
          <p className="text-xl mb-2 dark:text-white ">
            <strong>Price:</strong> ${classDetails.price}
          </p>
          <p className="text-xl mb-2 dark:text-white">
            <strong>Total Enrollment:</strong> {classDetails.totalEnrollment}
          </p>
          <p className="text-lg mb-4 dark:text-white">{classDetails.description}</p>
        </div>
        <div className="flex items-start justify-center">
          <Button onClick={handleEnroll} size="lg">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ClassDetailsEnroll

