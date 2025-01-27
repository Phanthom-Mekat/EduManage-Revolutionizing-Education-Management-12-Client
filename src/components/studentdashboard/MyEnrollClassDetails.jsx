import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "react-simple-star-rating";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthContext } from "@/provider/AuthProvider";

const MyEnrollClassDetails = () => {
    const {user} = useContext(AuthContext);
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [evaluation, setEvaluation] = useState({ description: "", rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const [classResponse, assignmentsResponse] = await Promise.all([
          fetch(`http://localhost:5000/classes/${id}`),
          fetch(`http://localhost:5000/classes/${id}/assignments`)
        ]);

        if (!classResponse.ok || !assignmentsResponse.ok) {
          throw new Error('Failed to fetch class details');
        }

        const [classData, assignmentsData] = await Promise.all([
          classResponse.json(),
          assignmentsResponse.json()
        ]);

        setClassDetails(classData);
        setAssignments(assignmentsData.assignments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleSubmit = async (assignmentId, file) => {
    if (!file) {
      setSubmitSuccess("Please select a file first");
      return;
    }

    setSubmitting(true);
    const res = await fetch('http://localhost:5000/users');
    const users = await res.json();
    const userId = users.find((u) => u.email === user?.email)?.uid;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', assignmentId);

    formData.append('userId', userId); 

    try {
      const response = await fetch(`http://localhost:5000/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Submission failed');

      const updatedAssignments = assignments.map(assignment =>
        assignment._id === assignmentId
          ? { ...assignment, submissionCount: assignment.submissionCount + 1 }
          : assignment
      );
      setAssignments(updatedAssignments);
      setSubmitSuccess("Assignment submitted successfully!");
    } catch (err) {
      setSubmitSuccess("Failed to submit assignment: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEvaluationSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/classes/${id}/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'), // Adjust based on your auth
          rating: evaluation.rating,
          description: evaluation.description
        })
      });

      if (!response.ok) throw new Error('Failed to submit evaluation');

      setIsEvaluationOpen(false);
      setEvaluation({ description: "", rating: 0 });
      setSubmitSuccess("Evaluation submitted successfully!");
    } catch (err) {
      setSubmitSuccess("Failed to submit evaluation: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error loading class details: {error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">{classDetails?.title}</h2>
          <p className="text-gray-600">Instructor: {classDetails?.instructorName}</p>
        </div>
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
                  initialValue={evaluation.rating}
                />
              </div>
              <Button onClick={handleEvaluationSubmit}>Send Evaluation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {submitSuccess && (
        <Alert className="mb-4">
          <AlertDescription>{submitSuccess}</AlertDescription>
        </Alert>
      )}

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
            <TableRow key={assignment._id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.description}</TableCell>
              <TableCell>{new Date(assignment.deadline).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="file" 
                    className="max-w-xs"
                    onChange={(e) => handleSubmit(assignment._id, e.target.files[0])}
                    disabled={submitting}
                  />
                  <span>({assignment.submissionCount || 0} submissions)</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyEnrollClassDetails;