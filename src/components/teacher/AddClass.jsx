import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { AuthContext } from "@/provider/AuthProvider"

const AddClass = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const classData = {
        ...formData,
        instructorName: user?.displayName,
        instructorEmail: user?.email,
        status: "pending",
      }
      await axios.post("http://localhost:5000/classes", classData)
      navigate("/teacher/my-classes")
    } catch (error) {
      console.error("Error adding class:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add a New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <Input type="url" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instructor Name</label>
          <Input type="text" value={user?.displayName} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instructor Email</label>
          <Input type="email" value={user?.email} disabled />
        </div>
        <Button type="submit">Add Class</Button>
      </form>
    </div>
  )
}

export default AddClass

