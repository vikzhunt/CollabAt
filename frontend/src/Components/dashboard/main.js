// src/Components/dashboard/Dashboard.js
import React, { useState } from 'react';
import Navbar from '../Navbar/navbar';
import Sidebar from '../Navbar/sidebar';
import ProfileView from '../Profile/profileview';
import Profile from '../Profile/profileform'; 
import Connections from '../Connections/UserList'; 
import ChatRoom from '../Chat/ChatRoom'; 
import ResourceSharing from '../Resources/ResourceSharing'; 
import EventsList from '../events/eventlisting';
import DiscussionRooms from '../DiscussionRooms/discussionroom';
import { FaUserFriends, FaRegCommentDots, FaFolderOpen, FaCalendarAlt } from 'react-icons/fa';
import TeamGroups from '../TeamGroup/teamgroup';
import InsightsAndBlog from '../Insights/insight';


const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <ProfileView />;
      case 'Connections':
        return <Connections />;
      case 'ChatRoom':
        return <ChatRoom />;
      case 'ResourceSharing':
        return <ResourceSharing />;
      case 'Events':
        return <EventsList />;
      case 'DiscussionRooms':
        return <DiscussionRooms />;
      case 'Insights':
        return <InsightsAndBlog />;
      case 'TeamGroups':
        return <TeamGroups />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="flex flex-1 pt-16">
        {/* <Sidebar /> */}
        <div className="fixed top-16 left-0 h-full w-55 shadow-md z-10 mt-1">
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <main className="flex-1 ml-60 pt-6 pl-10 pr-6 bg-gray-200 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6 text-slate-600/90 hover:text-blue-800/90">Welcome to CollabAt Dashboard</h2>
          
          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div 
              onClick={() => setActiveComponent('Connections')}
              className="bg-white p-5 rounded-lg border shadow-md hover:bg-indigo-50 hover:border-indigo-400 transition duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <FaUserFriends className="text-3xl text-indigo-500 mr-4" />
                <div>
                  <p className="text-xl font-medium text-indigo-800">Connections</p>
                  <p className="text-gray-500">Find new connections</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setActiveComponent('ChatRoom')}
              className="bg-white p-5 rounded-lg border shadow-md hover:bg-green-50/50 hover:border-green-400 transition duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <FaRegCommentDots className="text-3xl text-green-800/90 mr-4" />
                <div>
                  <p className="text-xl font-medium text-green-800/90">Chat Room</p>
                  <p className="text-gray-500">Join discussions</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setActiveComponent('ResourceSharing')}
              className="bg-white p-5 rounded-lg shadow-md hover:bg-sky-50 border hover:border-sky-400 transition duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <FaFolderOpen className="text-3xl text-sky-500 mr-4" />
                <div>
                  <p className="text-xl font-medium text-sky-800">Resources</p>
                  <p className="text-gray-500">Share and access files</p>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => setActiveComponent('Events')}
              className="bg-white p-5 rounded-lg shadow-md hover:bg-yellow-50 border hover:border-yellow-400 transition duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                <FaCalendarAlt className="text-3xl text-yellow-500 mr-4" />
                <div>
                  <p className="text-xl font-medium text-yellow-800">Events</p>
                  <p className="text-gray-500">View upcoming events</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Render Part */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

