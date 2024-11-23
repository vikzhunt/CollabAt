import React from "react";
import { PersonAdd as PersonAddIcon, CheckCircle as CheckCircleIcon, Done as DoneIcon } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material"; // Import MUI components for styling

const UserCard = ({ user, onConnect, onAccept, isConnected, isPending, showAcceptButton }) => {
  return (
    <Box className="w-full bg-white rounded-lg border hover:bg-yellow-50/20 hover:border-yellow-500 shadow-lg p-6 mb-6">
      <div className="flex items-start space-x-6">
        {/* User Profile Image */}
        <img
          src="https://images.unsplash.com/photo-1647684379498-4cdcc826556e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
          alt={user.name || "User profile image"}
          className="w-40 h-40 object-cover rounded-lg"
        />

        {/* User Details */}
        <div className="flex-1">
          <Typography variant="h6" className="font-bold text-gray-800">{user.name}</Typography>
          <Typography variant="body2" className="text-gray-500">{user.email}</Typography>
          <Typography variant="body2" className="text-gray-500">{user.degree}</Typography>
          <Typography variant="body2" className="text-gray-500">{user.interest}</Typography>
          <Typography variant="body2" className="text-gray-500">
            {user.techSkills?.length ? user.techSkills.join(", ") : "No skills listed"}
          </Typography> {/* Fallback for tech skills */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Conditional rendering for buttons based on connection status */}
          {(!isConnected && !isPending) ? (
            <Button
              onClick={onConnect}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-full"
              aria-label="Send request"
            >
              <PersonAddIcon />
              <span>Connect</span>
            </Button>
          ) : isPending && showAcceptButton ? ( // Only show accept button if this is the recipient
            <Box>
              <Button
                onClick={onAccept}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full"
                aria-label="Accept request"
              >
                <DoneIcon />
                <span>Accept</span>
              </Button>
              <Button
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full"
                aria-label="Reject request"
              >
                <CheckCircleIcon />
                <span>Reject</span>
              </Button>
            </Box>
          ) : (
            <Button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full"
              disabled
              aria-label="Connected"
            >
              <CheckCircleIcon />
              <span>Connected</span>
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default UserCard;
