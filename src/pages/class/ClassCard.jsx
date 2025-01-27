/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiUsers, FiClock, FiStar } from "react-icons/fi"

const ClassCard = ({ classItem }) => {
  const {
    _id,
    image,
    title,
    instructorName,
    price,
    totalEnrollment,
    instructorImage,
    description,
    duration,
    rating,
    category
  } = classItem

  console.log(instructorImage)
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <Badge className="absolute top-2 right-2 bg-primary/90">{category}</Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <img 
            src={instructorImage|| "/placeholder-avatar.svg"} 
            alt={instructorName}
            className="w-8 h-8 rounded-full" 
          />
          <span className="font-medium">{instructorName}</span>
        </div>

        <p className="text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FiUsers />
            <span>{totalEnrollment} students</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock />
            <span>{duration}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">${price}</span>
        <Link to={`/all-classes/${_id}`}>
          <Button className="group-hover:bg-primary/90 transition-colors">
            Enroll Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ClassCard