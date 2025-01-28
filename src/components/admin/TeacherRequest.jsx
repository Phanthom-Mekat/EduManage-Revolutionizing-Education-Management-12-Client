import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

const TeacherRequest = () => {
  const [teacherRequests, setTeacherRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchTeacherRequests();
  }, []);

  const fetchTeacherRequests = async () => {
    try {
      const response = await axios.get("https://edumanagebackend.vercel.app/reqteachers");
      setTeacherRequests(response.data.classes);
    } catch (error) {
      console.error("Error fetching teacher requests:", error);
      toast.error("Failed to fetch teacher requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request) => {
    setProcessing(true);
    try {
      console.log("Approving request for:", request.instructorEmail);
  
      // Step 1: Approve the teacher request
      const approveResponse = await axios.put(
        `https://edumanagebackend.vercel.app/reqteachers/${request._id}/approve`
      );
      console.log("Approval response:", approveResponse.data);
  
      toast.success("Teacher request approved successfully");
      fetchTeacherRequests(); // Refresh the list
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error(`Failed to approve: ${error.response?.data?.message || error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (id) => {
    setProcessing(true);
    try {
      await axios.put(`https://edumanagebackend.vercel.app/reqteachers/${id}/reject`);
      toast.success("Teacher request rejected");
      fetchTeacherRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject teacher request");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Teacher Requests</h2>
      
      <div className="rounded-lg border shadow-sm">
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
                    src={request.instructorImage}
                    alt={request.instructorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{request.experience}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === "pending" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : request.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(request)}
                      disabled={request.status !== "pending" || processing}
                      size="sm"
                    >
                      {processing ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : null}
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request._id)}
                      disabled={request.status !== "pending" || processing}
                      variant="destructive"
                      size="sm"
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeacherRequest;