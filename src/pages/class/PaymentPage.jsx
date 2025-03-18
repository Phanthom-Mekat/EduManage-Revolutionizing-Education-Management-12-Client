import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthContext } from "@/provider/AuthProvider"

const PaymentPage = () => {
  const [classDetails, setClassDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  })
  const [validationErrors, setValidationErrors] = useState({})
  
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`https://edumanagebackend.vercel.app/classes/${id}`)
        setClassDetails(response.data)
      } catch (error) {
        setError("Failed to load class details. Please try again.")
      }
    }
    fetchClassDetails()
  }, [id])

  const validateForm = () => {
    const errors = {}
    if (!/^\d{16}$/.test(paymentInfo.cardNumber)) {
      errors.cardNumber = "Card number must be 16 digits"
    }
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format"
    }
    if (!/^\d{3}$/.test(paymentInfo.cvv)) {
      errors.cvv = "CVV must be 3 digits"
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "expiryDate" && value.length === 2 && !value.includes("/")) {
      formattedValue = value + "/"
    }

    setPaymentInfo(prev => ({
      ...prev,
      [name]: formattedValue
    }))
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    if (!validateForm()) return

    setLoading(true)
    try {
  
      const paymentResponse = await axios.post("https://edumanagebackend.vercel.app/api/payments", {
        classId: id,
        userId: user?.uid,
        amount: classDetails?.price,
        ...paymentInfo
      });

      if (paymentResponse.data.success) {
        try {
          await axios.post("https://edumanagebackend.vercel.app/enroll", {
            classId: id,
            userId: user?.uid
          });
          navigate("/dashboard/my-enroll-class");
        } catch (enrollError) {
          setError("Payment successful but enrollment failed. Please contact support.");
          console.error("Enrollment error:", enrollError);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Payment failed. Please try again.";
      setError(errorMessage);
      console.error("Payment error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (!classDetails) return <div className="text-center p-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-neutral-900">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Payment for {classDetails.title}</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-6 dark:bg-neutral-800 dark:text-white">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber" className="dark:text-white">Card Number</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              className= {validationErrors.cardNumber ? "border-red-500 dark:border-red-500" : ""}
              required
            />
            {validationErrors.cardNumber && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-500">{validationErrors.cardNumber}</p>
            )}
          </div>

          <div>
            <Label htmlFor="expiryDate" className="dark:text-white">Expiry Date</Label>
            <Input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              maxLength={5}
              placeholder="MM/YY"
              className={validationErrors.expiryDate ? "border-red-500 dark:border-red-500" : ""}
              required
            />
            {validationErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-500">{validationErrors.expiryDate}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cvv" className="dark:text-white">CVV</Label>
            <Input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleInputChange}
              maxLength={3}
              placeholder="123"
              className={validationErrors.cvv ? "border-red-500 dark:border-red-500" : ""}
              required
            />
            {validationErrors.cvv && (
              <p className="text-red-500 text-sm mt-1 dark:text-red-500">{validationErrors.cvv}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${classDetails.price}`}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PaymentPage