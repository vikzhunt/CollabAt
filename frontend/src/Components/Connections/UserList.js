import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserCard from "./UserCard";
import { getAllUsers } from "./../../APIs/User.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [connections, setConnections] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      let response = await getAllUsers();
      const curr = localStorage.getItem('email');
      let newresponse = response.data.userList.filter((user)=> user.email !== curr)
      setUsers(newresponse);
    };
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users?.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.degree.toLowerCase().includes(search.toLowerCase()) ||
          user.interests
            .join(", ")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.skills.toLowerCase().includes(search.toLowerCase()) ||
          user.techSkills.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleConnect = (userId) => {
    setConnections((prev) => ({ ...prev, [userId]: true }));
  };

  return (
    <Box className="w-full max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <Typography
        variant="h4"
        className="text-center font-bold mb-6 pb-5 text-blue-900/90"
      >
        Connect with People
      </Typography>

      {/* Search User */}
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

      {/* User Cards */}
      <div className="space-y-6">
        {filteredUsers?.length ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onConnect={handleConnect}
              isConnected={connections[user.id]}
            />
          ))
        ) : (
          <Typography variant="body1" className="text-center text-gray-500">
            No users found for this search criteria.
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default UserList;
