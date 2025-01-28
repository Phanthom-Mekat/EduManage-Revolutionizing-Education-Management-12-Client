import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Quote, User, Star, Calendar, MessageSquare } from "lucide-react";


// eslint-disable-next-line react/prop-types
const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const FeedbackSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://edumanagebackend.vercel.app/reviews");
        const data = await response.json();

        if (data.success) {
          setReviews(data.reviews);
        } else {
          throw new Error(data.message || "Failed to fetch reviews");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "all") return true;
    return Math.floor(review.rating) === parseInt(activeFilter);
  });

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 rounded-lg bg-red-50 border border-red-100">
        <p className="font-medium">Error loading reviews: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg">
            Feedback from our amazing community of learners
          </p>
          
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={averageRating} size={24} />
              <span className="text-2xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-500">
              Based on {reviews.length} student reviews
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {["all", "5", "4", "3", "2", "1"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === filter
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter === "all" ? "All Reviews" : `${filter} Stars`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <Card
              key={review._id}
              className="h-full hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.name || "Anonymous"}
                        className="rounded-full object-cover w-full h-full ring-2 ring-blue-100"
                      />
                    ) : (
                      <div className="rounded-full bg-gradient-to-br from-blue-100 to-purple-100 w-full h-full flex items-center justify-center ring-2 ring-blue-100">
                        <User className="h-6 w-6 text-blue-400" />
                      </div>
                    )}
                    <Quote className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full p-1.5 shadow-lg" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.name || "Anonymous Student"}
                    </h3>
                    <p className="text-sm text-gray-500">{review.className}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-gray-600 min-h-[4.5rem] italic">
                  "{review.description || "No comment provided"}"
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} />
                    <span>{review.description?.length || 0} chars</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;