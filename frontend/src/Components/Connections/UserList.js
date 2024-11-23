import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, InputAdornment, Divider } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserCard from "./UserCard";
import { getAllUsers, sendConnectionRequest, acceptConnectionRequest, getPendingRequests } from "./../../APIs/User.js"; // Ensure correct imports

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [connections, setConnections] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [view, setView] = useState("connect"); // Updated to manage new views

  // Fetch all users
  useEffect(() => {
    const getUsers = async () => {
      let response = await getAllUsers();
      const curr = localStorage.getItem("email");
      let newresponse = response.data.userList.filter((user) => user.email !== curr);
      setUsers(newresponse);

      const initialConnections = {};
      newresponse.forEach((user) => {
        initialConnections[user._id] = { status: "not connected" };
      });
      setConnections(initialConnections);
    };
    getUsers();
  }, []);

  // Fetch pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      const currUserId = localStorage.getItem("crUserId");
      if (currUserId) {
        try {
          const response = await getPendingRequests(currUserId); 
          console.log("Pending requests response:", response); // Log the response
          const { pendingRequests } = response.data;
          if (!pendingRequests || pendingRequests.length === 0) {
            console.log("No pending requests found.");
          }
          setPendingRequests(pendingRequests); // Set state with the correct data
  
          const updatedConnections = {};
          pendingRequests.forEach((req) => {
            updatedConnections[req.from._id] = { status: "pending" };
          });
          setConnections((prev) => ({ ...prev, ...updatedConnections }));
  
        } catch (error) {
          console.error("Error fetching pending requests:", error);
        }
      }
    };
    fetchPendingRequests();
  }, []);
  

  // Filter users based on search input
  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.degree.toLowerCase().includes(search.toLowerCase()) ||
          user.interests?.some((interest) => interest.toLowerCase().includes(search.toLowerCase())) || // Added optional chaining
          user.skills?.some((skill) => skill.toLowerCase().includes(search.toLowerCase())) // Added optional chaining
      );
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  // Handle sending connection requests
  const handleConnect = async (userId) => {
    const currUserId = localStorage.getItem("crUserId"); // Fixed: consistent variable naming
    if (!currUserId) return;
    try {
      const res = await sendConnectionRequest({ fromId: currUserId, toId: userId });
      console.log("Response from backend: ",res)
      setConnections((prev) => ({
        ...prev,
        [userId]: { status: "pending" },
      }));
      setPendingRequests((prev) => [...prev, { from: { _id: currUserId }, to: { _id: userId } }]);
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  // Handle accepting connection requests
  const handleAccept = async (connectionRequestId) => {
    const currUserId = localStorage.getItem("crUserId");
    if (!currUserId || !connectionRequestId) return;
    try {
      const res = await acceptConnectionRequest({ userId: currUserId, requesterId: connectionRequestId.from._id }); 
      if(res.status === 200){
        setConnections((prev) => ({
          ...prev,
          [connectionRequestId.from._id]: { status: "connected" },
        }));
        setPendingRequests((prev) => prev.filter((req) => req.from._id !== connectionRequestId.from._id));
      } else {
        console.error("Failed to accept request: ", res.data.message);
      }
    } catch (error) {
      console.log("Error accepting connection:", error);
    }
  };

  return (
    <Box className="w-full max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      {/* Toggle View */}
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
          className={`font-bold pb-2 ${view === "requests" ? "text-blue-900 border-b-4 border-blue-900" : "text-gray-500"}`}
          onClick={() => setView("requests")}
        >
          Requests
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

      {/* View logic */}
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
                  isConnected={connections[user._id]?.status === "connected"}
                  isPending={connections[user._id]?.status === "pending"}
                />
              ))
            ) : (
              <Typography variant="body1" className="text-center text-gray-500">
                No users found for this search criteria.
              </Typography>
            )}
          </div>
        </>
      ) : view === "requests" ? (
        <div className="space-y-6">
          {pendingRequests.map((request) => {
            const user = users.find((u) => u._id === request.from._id);
            if (!user) return null;
            const isCurrentUserReceiver = localStorage.getItem("crUserId") === request.to._id;
            return (
              <UserCard
                key={user._id}
                user={user}
                onAccept={isCurrentUserReceiver ? () => handleAccept(request) : null}
                isConnected={connections[user._id]?.status === "connected"}
                isPending={connections[user._id]?.status === "pending"}
                showAcceptButton={isCurrentUserReceiver}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {users.filter((user) => connections[user._id]?.status === "connected").map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isConnected={connections[user._id]?.status === "connected"}
            />
          ))}
        </div>
      )}
    </Box>
  );
};

export default UserList;
