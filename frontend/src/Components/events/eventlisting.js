// src/Components/EventListings/EventListings.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';

const EventListings = () => {
  const [events] = useState([
    {
      name: 'Global Hackathon 2024',
      date: 'March 15, 2024',
      location: 'Online',
      organizer: 'Tech World Inc.',
      eventType: 'Virtual',
      description: 'Join developers from around the world to solve real-world challenges in this 48-hour hackathon.',
      link: '//',
      image: 'https://media.istockphoto.com/id/1788126253/photo/developers-in-a-coworking-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=HGz6ITE5WbqSMcAmeuiXSiIQycoWOT70hYFFYUPOJKc=',
    },
    {
      name: 'AI & Robotics Challenge',
      date: 'April 5, 2024',
      location: 'San Francisco, CA',
      organizer: 'Innovate Robotics',
      eventType: 'On-site',
      description: 'A challenge to push the limits of AI and robotics technology. Participants will build, test, and showcase their innovations.',
      link: '//',
      image: 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2F0aG9uc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      name: 'Web Development Sprint',
      date: 'May 22, 2024',
      location: 'New York, NY',
      organizer: 'DevConnect NYC',
      eventType: 'Hybrid',
      description: 'A 24-hour sprint focused on web technologies. Build applications and compete with top developers.',
      link: '//',
      image: 'https://plus.unsplash.com/premium_photo-1726754457459-d2dfa2e3a434?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFja2F0aG9uc3xlbnwwfHwwfHx8MA%3D%3D',
    },
  ]);

  return (
    <div className="p-8 bg-slate-100 rounded-lg shadow-lg max-w-2xl mx-auto">
      <Typography variant="h4" className="text-center font-extrabold text-blue-900/90 mb-4 pb-4">
        Upcoming Hackathons & Contests
      </Typography>
      <ul className="space-y-6">
        {events.map((event, index) => (
          <li key={index} className="border border-gray-300 bg-white rounded-lg p-8 hover:bg-yellow-50/20 hover:shadow-lg hover:border-yellow-500 transition-shadow duration-200 ease-in-out">
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold text-sky-700/95 mb-2">{event.name}</h3>
            <p className="text-gray-500 text-lg mb-1"><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-500 text-lg mb-1"><strong>Location:</strong> {event.location}</p>
            <p className="text-gray-500 text-lg mb-1"><strong>Organizer:</strong> {event.organizer}</p>
            <p className="text-gray-500 text-lg mb-1"><strong>Event Type:</strong> {event.eventType}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <a 
              href={event.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-900/90 hover:bg-sky-600/95 text-white px-8 py-2 rounded-lg font-semibold shadow-md transition-colors duration-200 ease-in-out"
            >
              Register Here
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListings;
