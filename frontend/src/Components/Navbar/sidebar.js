// src/Components/Sidebar.js
import React from 'react';
import { FaUser, FaUsers, FaUserFriends, FaRegCommentDots, FaFolderOpen, FaBookOpen,FaCalendarAlt, FaComments } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <aside className="bg-slate-800 text-white w-64 p-5 min-h-screen flex flex-col space-y-4 shadow-lg">
      <button onClick={() => setActiveComponent('Profile')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaUser className="text-xl" />
        <span>Profile</span>
      </button>
      <button onClick={() => setActiveComponent('Connections')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaUserFriends className="text-xl" />
        <span>Connections</span>
      </button>
      <button onClick={() => setActiveComponent('ChatRoom')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaRegCommentDots className="text-xl" />
        <span>Chat Room</span>
      </button>
      <button onClick={() => setActiveComponent('TeamGroups')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaUsers className="text-xl" /> 
        <span>Team Groups</span>
      </button>
      <button onClick={() => setActiveComponent('ResourceSharing')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaFolderOpen className="text-xl" />
        <span>Resources</span>
      </button>
      <button onClick={() => setActiveComponent('Events')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaCalendarAlt className="text-xl" />
        <span>Events</span>
      </button>
      <button onClick={() => setActiveComponent('DiscussionRooms')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaComments className="text-xl" />
        <span>Discussion Rooms</span>
      </button>
      <button onClick={() => setActiveComponent('Insights')} className="flex items-center space-x-3 p-3 hover:bg-red-300/25 rounded hover:text-lg">
        <FaBookOpen className="text-xl" />
        <span>Insights & Blog</span>
      </button>
    </aside>
  );
};

export default Sidebar;
