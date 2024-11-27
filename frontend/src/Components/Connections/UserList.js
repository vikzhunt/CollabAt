import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, InputAdornment, Divider } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserCard from "./UserCard";
import { getAllUsers, sendConnectionRequest, acceptConnectionRequest, removeConnectionRequest, getPendingRequests } from "./../../APIs/User.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [connections, setConnections] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [view, setView] = useState("connect");
  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const currEmail = localStorage.getItem("email");
      const currUserId = localStorage.getItem("crUserId");

      try {
        const userResponse = await getAllUsers();
        const newUsers = userResponse.data.userList.filter(
          (user) => user.email !== currEmail
        );
        setUsers(newUsers);

        const initialConnections = {};
        newUsers.forEach((user) => {
          initialConnections[user._id] = { status: "not connected" };
        });

        // const currentUserResponse = await getConnections(currUserId); // Make an API call
        // const cr = currentUserResponse.data;
        // console.log("Current User with Connections:", cr);

        // // Update connections from the current user
        // if (cr.connections) {
        //   cr.connections.forEach((connection) => {
        //     initialConnections[connection._id] = { status: "connected" };
        //   });
        // }
        setConnections(initialConnections);

        const response = await getPendingRequests(currUserId);
        // console.log("hello");
        console.log("Pending requests response:", response);
        const { pendingRequests } = response;
        if (!pendingRequests || pendingRequests.length === 0) {
          console.log("No pending requests found.");
        }
        setPendingRequests(pendingRequests);
        const updatedConnections = {};
        pendingRequests.forEach((req) => {
          if (req.from) {
            updatedConnections[req.from] = { status: "pending" };
          }
          if (req.to) {
            updatedConnections[req.to] = { status: "requested" };
          }
        });
        setConnections((prev) => ({ ...prev, ...updatedConnections }));
        console.log(updatedConnections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reloadData]);

  useEffect(() => {
    console.log("Updated connections: ", connections);
  }, [connections]);

  useEffect(() => {
    const cr = localStorage.getItem("crUserId");
    if (search === "") {
      const filtered = users.filter((user) => !user.connections?.includes(cr));
      setFilteredUsers(filtered);
    } else {
      const filtered = users.filter(
        (user) =>
          (user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.degree.toLowerCase().includes(search.toLowerCase()) ||
            user.interests?.some((interest) =>
              interest.toLowerCase().includes(search.toLowerCase())
            ) ||
            user.skills?.some((skill) =>
              skill.toLowerCase().includes(search.toLowerCase())
            )) &&
          !user.connections?.includes(cr)
      );
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleConnect = async (userId) => {
    const currUserId = localStorage.getItem("crUserId");
    if (!currUserId) return;
    try {
      const res = await sendConnectionRequest({
        fromId: currUserId,
        toId: userId,
      });
      console.log("Response from backend: ", res);
      setConnections((prev) => ({
        ...prev,
        [userId]: { status: "pending" },
      }));
      setPendingRequests((prev) => [
        ...prev,
        { from: { _id: currUserId }, to: { _id: userId } },
      ]);
      setReloadData(!reloadData);
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleAccept = async (connectionRequestId) => {
    const currUserId = localStorage.getItem("crUserId");
    // console.log(connectionRequestId.from);
    // console.log("hi");
    if (!currUserId || !connectionRequestId) return;
    console.log(connectionRequestId.from);
    try {
      const res = await acceptConnectionRequest({
        userId: currUserId,
        requesterId: connectionRequestId.from,
      });
      console.log("hy");
      if (res.status === 200) {
        setConnections((prev) => ({
          ...prev,
          [connectionRequestId.from]: { status: "connected" },
        }));
        setPendingRequests((prev) =>
          prev.filter((req) => req.from !== connectionRequestId.from)
        );
      } else {
        console.error("Failed to accept request: ", res.data);
      }
      setReloadData(!reloadData);
    } catch (error) {
      console.log("Error accepting connection:", error);
    }
  };

  const handleRemove = async (connectionRequestId) => {
    try {
      const currUserId = localStorage.getItem("crUserId");
      //console.log(connectionRequestId);
      //console.log(currUserId);

      if (!currUserId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      if (!connectionRequestId || !connectionRequestId._id) {
        console.error("Invalid connection request ID.");
        return;
      }

      console.log(
        `Attempting to remove connection request from: ${connectionRequestId._id}`
      );

      const response = await removeConnectionRequest({
        fromId: currUserId,
        toId: connectionRequestId._id,
      });

      if (response.status === 200) {
        console.log("Connection request removed successfully.");
      } else {
        console.error("Failed to remove connection request:", response.data);
      }
      setReloadData(!reloadData);
    } catch (error) {
      console.error(
        "Error removing connection request:",
        error.message || error
      );
    }
  };

  return (
    <Box className="w-full max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <Box className="flex justify-around mb-6 cursor-pointer">
        <Typography
          variant="h5"
          className={`font-bold pb-2 ${
            view === "connect"
              ? "text-blue-900 border-b-4 border-blue-900"
              : "text-gray-500"
          }`}
          onClick={() => {
            setView("connect");
            setReloadData(!reloadData);
          }}
        >
          Find Connections
        </Typography>
        <Typography
          variant="h5"
          className={`font-bold pb-2 ${
            view === "requests"
              ? "text-blue-900 border-b-4 border-blue-900"
              : "text-gray-500"
          }`}
          onClick={() => {
            setView("requests");
            setReloadData(!reloadData);
          }}
        >
          Requests
        </Typography>
        <Typography
          variant="h5"
          className={`font-bold pb-2 ${
            view === "connections"
              ? "text-blue-900 border-b-4 border-blue-900"
              : "text-gray-500"
          }`}
          onClick={() => {
            setView("connections");
            setReloadData(!reloadData);
          }}
        >
          Connections
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
                  onConnect={() => {
                    handleConnect(user._id);
                  }}
                  isRequested={connections[user._id]?.status === "requested"}
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
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => {
              console.log(request);
              const user = users.find((u) => u._id.toString() === request.from);
              console.log(user);
              if (!user) return null;
              const isCurrentUserReceiver =
                localStorage.getItem("crUserId") !== request.from;

              return (
                <UserCard
                  key={user._id}
                  user={user}
                  onAccept={() => handleAccept(request)}
                  isConnected={connections[user._id]?.status === "connected"}
                  isRequested={connections[user._id]?.status === "requested"}
                  isPending={connections[user._id]?.status === "pending"}
                  showAcceptButton={isCurrentUserReceiver}
                />
              );
            })
          ) : (
            <Typography variant="body1" className="text-center text-gray-500">
              No pending requests found.
            </Typography>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {(() => {
            const currentUserId = localStorage.getItem("crUserId");
            const connectedUsers = users.filter((user) => {
              const isConnected = user.connections?.includes(currentUserId);
              return isConnected;
            });
            if (connectedUsers.length > 0) {
              return connectedUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  isConnected={true}
                  onRemove={() => {
                    handleRemove(user);
                  }}
                />
              ));
            } else {
              console.log("No connected users found.");
              return (
                <Typography
                  variant="body1"
                  className="text-center text-gray-500"
                >
                  No connections found.
                </Typography>
              );
            }
          })()}
        </div>
      )}
    </Box>
  );
};

export default UserList;
