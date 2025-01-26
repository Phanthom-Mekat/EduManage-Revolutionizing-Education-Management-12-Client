import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const MyEnrollClass = () => {
  // This would typically come from an API or context
  const enrolledClasses = [
    { id: 1, title: "Introduction to React", teacher: "John Doe", image: "https://example.com/react.jpg" },
    { id: 2, title: "Advanced JavaScript", teacher: "Jane Smith", image: "https://example.com/javascript.jpg" },
    // Add more classes as needed
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden">
            <img
              src={classItem.image || "/placeholder.svg"}
              alt={classItem.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
              <p className="text-gray-600">Teacher: {classItem.teacher}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Link to={`/dashboard/myenroll-class/${classItem.id}`}>
                <Button>Continue</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyEnrollClass

