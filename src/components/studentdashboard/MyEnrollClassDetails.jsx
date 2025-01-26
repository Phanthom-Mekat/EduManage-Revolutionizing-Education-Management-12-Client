import  { useState } from "react"
import { useParams } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from "react-simple-star-rating"

const MyEnrollClassDetails = () => {
  const { id } = useParams()
  const [assignments, setAssignments] = useState([
    { id: 1, title: "React Hooks", description: "Create a custom hook", deadline: "2023-07-30", submissionCount: 0 },
    { id: 2, title: "State Management", description: "Implement Redux", deadline: "2023-08-15", submissionCount: 0 },
    // Add more assignments as needed
  ])

  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false)
  const [evaluation, setEvaluation] = useState({ description: "", rating: 0 })

  const handleSubmit = (assignmentId) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, submissionCount: assignment.submissionCount + 1 }
          : assignment,
      ),
    )
  }

  const handleEvaluationSubmit = () => {
    // Here you would typically send the evaluation to your backend
    console.log("Evaluation submitted:", evaluation)
    setIsEvaluationOpen(false)
    setEvaluation({ description: "", rating: 0 })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Class Details</h2>
        <Dialog open={isEvaluationOpen} onOpenChange={setIsEvaluationOpen}>
          <DialogTrigger asChild>
            <Button>Teaching Evaluation Report (TER)</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Teaching Evaluation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Textarea
                placeholder="Enter your feedback here"
                value={evaluation.description}
                onChange={(e) => setEvaluation({ ...evaluation, description: e.target.value })}
              />
              <div className="flex items-center space-x-2">
                <span>Rating:</span>
                <Rating
                  onClick={(rate) => setEvaluation({ ...evaluation, rating: rate })}
                  ratingValue={evaluation.rating}
                />
              </div>
              <Button onClick={handleEvaluationSubmit}>Send Evaluation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Submission</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.description}</TableCell>
              <TableCell>{assignment.deadline}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Input type="file" className="max-w-xs" />
                  <Button onClick={() => handleSubmit(assignment.id)}>Submit</Button>
                  <span>({assignment.submissionCount} submissions)</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MyEnrollClassDetails

