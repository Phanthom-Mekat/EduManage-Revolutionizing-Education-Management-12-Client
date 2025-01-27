import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/provider/AuthProvider"

const PaymentPage = () => {
  const [classDetails, setClassDetails] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/classes/${id}`)
        setClassDetails(response.data)
      } catch (error) {
        console.error("Error fetching class details:", error)
      }
    }

    fetchClassDetails()
  }, [id])

  const handleInputChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // In a real application, you would integrate with a payment gateway here
      const paymentResponse = await axios.post("http://localhost:5000/process-payment", {
        classId: id,
        userId: user.uid,
        amount: classDetails.price,
        ...paymentInfo,
      })

      if (paymentResponse.data.success) {
        // Enroll the user in the class
        await axios.post("http://localhost:5000/enroll", {
          classId: id,
          userId: user.uid,
        })

        navigate("/dashboard/my-enroll-classes")
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Payment failed. Please try again.")
    }
  }

  if (!classDetails) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Payment for {classDetails.title}</h2>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handleInputChange} required />
          </div>
          <Button type="submit" className="w-full">
            Pay ${classDetails.price}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PaymentPage

