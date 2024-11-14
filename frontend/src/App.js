import './App.css';
import Homepage from "./Components/Homepage/body";
import Dashboard from "./Components/dashboard/main";
import Profile from "./Components/Profile/profileform";
import UserList from "./Components/Connections/UserList";
import ChatRoom from "./Components/Chat/ChatRoom";
import ResourceSharing from "./Components/Resources/ResourceSharing"
import TeamGroups from './Components/TeamGroup/teamgroup';
import InsightsAndBlog from './Components/Insights/insight';
import EventListings from './Components/events/eventlisting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiscussionRooms from './Components/DiscussionRooms/discussionroom';
import Sidebar from './Components/Navbar/sidebar';
import Navbar from './Components/Navbar/navbar';
import Login from './Components/auth/login';
import Signup from './Components/auth/signup';
function App() {
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/connect" element={<UserList />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/resourcesharing" element={<ResourceSharing />} />
          <Route path="/team" element={<TeamGroups />} />
          <Route path="/insights" element={<InsightsAndBlog />} />
          <Route path="/eventslist" element={<EventListings />} />
          <Route path="/discussionrooms" element={<DiscussionRooms />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
