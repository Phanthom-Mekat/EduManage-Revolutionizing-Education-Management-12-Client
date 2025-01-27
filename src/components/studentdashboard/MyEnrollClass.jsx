import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";

const MyEnrollClass = () => {
    const {user} = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        // Fetch user from API
        const res = await fetch('http://localhost:5000/users');
        const users = await res.json();
        const userId = users.find((u) => u.email === user?.email)?.uid;
        const response = await fetch(`http://localhost:5000/enrolled-classes/${userId}`);
        console.log(res)
        if (!response.ok) {
          throw new Error('Failed to fetch enrolled classes');
        }
        
        const data = await response.json();
        setEnrolledClasses(data.enrolledClasses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading enrolled classes: {error}</p>
      </div>
    );
  }

  if (enrolledClasses.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">No Enrolled Classes</h2>
        <p className="text-gray-600 mb-4">You havent enrolled in any classes yet.</p>
        <Link to="/all-classes">
          <Button>Browse Classes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses.map((classItem) => (
          <Card key={classItem._id} className="overflow-hidden">
            <img
              src={classItem.image || "/api/placeholder/400/300"}
              alt={classItem.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
              <p className="text-gray-600 mb-2">Instructor: {classItem.instructorName}</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Progress: {classItem.progress || 0}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${classItem.progress || 0}%` }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between">
              <Link to={`/dashboard/myenroll-class/${classItem._id}`}>
                <Button>Continue Learning</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;