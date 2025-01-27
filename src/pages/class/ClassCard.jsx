import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ClassCard = ({ classItem }) => {
  return (
    <Card className="overflow-hidden">
      <img src={classItem.image || "/placeholder.svg"} alt={classItem.title} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
        <p className="text-gray-600 mb-2">Instructor: {classItem.instructorName}</p>
        <p className="text-gray-600 mb-2">Price: ${classItem.price}</p>
        <p className="text-gray-600 mb-2">Total Enrollment: {classItem.totalEnrollment}</p>
        <p className="text-gray-600">{classItem.description.substring(0, 100)}...</p>
      </CardContent>
      <CardFooter>
        <Link to={`/all-classes/${classItem._id}`}>
          <Button>Enroll</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ClassCard

