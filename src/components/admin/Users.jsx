import  { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users")
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleMakeAdmin = async (id) => {
    try {
      await axios.put(`http://localhost:5000/users/${id}/make-admin`)
      fetchUsers()
    } catch (error) {
      console.error("Error making user admin:", error)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/search?term=${searchTerm}`)
      setUsers(response.data)
    } catch (error) {
      console.error("Error searching users:", error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Users</h2>
      <div className="mb-4 flex">
        <Input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>User Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <img
                  src={user.photo || "/placeholder.svg"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleMakeAdmin(user._id)} disabled={user.role === "admin"}>
                  Make Admin
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users

