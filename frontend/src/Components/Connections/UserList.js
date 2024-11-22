import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, InputAdornment, Divider } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserCard from "./UserCard";
import { getAllUsers, sendConnectionRequest, acceptConnection, getConnections } from "./../../APIs/User.js"; // Ensure getConnections is imported

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [connections, setConnections] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [view, setView] = useState("connect");

  // Fetch users and set up initial connections
  useEffect(() => {
    const getUsers = async () => {
      let response = await getAllUsers();
      const curr = localStorage.getItem("email");
      let newresponse = response.data.userList.filter((user) => user.email !== curr);
      setUsers(newresponse);

      const initialConnections = {};
      newresponse.forEach((user) => {
        initialConnections[user._id] = { status: "not connected", pending: "not requested" };
      });
      setConnections(initialConnections);
    };
    getUsers();
  }, []);

  // Fetch pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        try {
          const response = await getConnections({ email: userEmail });
          if (response && response.data) {
            const pendingRequests = response.data.connectionRequests.filter(
              (request) => request.status === "pending"
            );
            setPendingRequests(pendingRequests);
          } else {
            console.error("Failed to fetch connections, no data found");
          }
        } catch (error) {
          console.error("Error fetching pending requests:", error);
        }
      }
    };
    
    fetchPendingRequests();
  }, []);
  
  // Filter users based on the search term
  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.degree.toLowerCase().includes(search.toLowerCase()) ||
          user.interests.some((interest) => interest.toLowerCase().includes(search.toLowerCase())) ||
          user.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredUsers(filtered);
  
      // Log the filtered results for debugging
      console.log("Filtered Users:", filtered);
    }
  }, [search, users]); // Ensure dependencies are correct
  
  const handleConnect = async (userId) => {
    const currEmail = localStorage.getItem("email");
    if (!currEmail) return;

    try {
      const response = await sendConnectionRequest({currEmail, userId});
      if (response.status === 200) {
        setConnections((prevConnections) => ({
          ...prevConnections,
          [userId]: { status: "pending", pending: "pending" },
        }));
        setPendingRequests((prevRequests) => [...prevRequests, { userId }]);
      } else {
        console.error("Failed to send connection request:", response.message);
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleAccept = async (userId) => {
    const currUserId = localStorage.getItem("userId");
    if (!currUserId) return;

    try {
      const response = await acceptConnection(currUserId, userId);
      if (response.status === 200) {
        setConnections((prevConnections) => ({
          ...prevConnections,
          [userId]: { status: "connected", pending: "not pending" },
        }));
        setPendingRequests((prevRequests) => prevRequests.filter((req) => req.userId !== userId));
      } else {
        console.log("Failed to accept connection:", response.message);
      }
    } catch (error) {
      console.log("Error accepting connection:", error);
    }
  };

  return (
    <Box className="w-full max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <Box className="flex justify-around mb-6 cursor-pointer">
        <Typography
          variant="h5"
          className={`font-bold pb-2 ${view === "connect" ? "text-blue-900 border-b-4 border-blue-900" : "text-gray-500"}`}
          onClick={() => setView("connect")}
        >
          Connect with People
        </Typography>
        <Typography
          variant="h5"
          className={`font-bold pb-2 ${view === "connections" ? "text-blue-900 border-b-4 border-blue-900" : "text-gray-500"}`}
          onClick={() => setView("connections")}
        >
          Your Connections
        </Typography>
      </Box>

      <Divider className="mb-6" />

      {view === "connect" ? (
        <>
          <TextField
            label="Search by name, degree, interests, or skills"
            variant="outlined"
            fullWidth
            margin="normal"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-8"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="space-y-6">
            {filteredUsers?.length ? (
              filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onConnect={() => handleConnect(user._id)}
                  onAccept={() => handleAccept(user._id)}
                  isConnected={connections[user._id]?.status === "connected"}
                  isPending={pendingRequests.some((req) => req.userId === user._id)}
                />
              ))
            ) : (
              <Typography variant="body1" className="text-center text-gray-500">
                No users found for this search criteria.
              </Typography>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {pendingRequests.map((request) => {
            const user = users.find((u) => u._id === request.userId);
            return (
              user && (
                <UserCard
                  key={user._id}
                  user={user}
                  onConnect={() => handleConnect(user._id)}
                  onAccept={() => handleAccept(user._id)}
                  isConnected={connections[user._id]?.status === "connected"}
                  isPending={pendingRequests.some((req) => req.userId === user._id)}
                />
              )
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default UserList;
