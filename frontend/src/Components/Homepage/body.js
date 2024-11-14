import React, { useRef,useState } from "react";
import Header from "./header";
import Footer from "./footer";
import ProfileForm from "../Profile/profileform";

function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const aboutSectionRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollToAbout = () => {
    aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496664444929-8c75efb9546f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGFzdGhldGljJTIwYmclMjBmb3IlMjB3b3JrfGVufDB8fDB8fHww')" }}>
      <Header scrollToAbout={scrollToAbout} />
      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes blink {
            50% { border-color: transparent; }
          }
          .typing-animation {
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            border-right: 3px solid;
            width: 100%;
            max-width: fit-content;
            animation: typing 3s steps(30, end) infinite alternate, blink 0.75s step-end infinite;
          }
        `}
      </style>

      {/* Main Section */}
      <section className="flex-grow flex items-center justify-center bg-gradient-to-r from-indigo-300/75 via-purple-400/75 to-pink-300/75 backdrop-blur-sm relative min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center text-white relative z-10">
          <h1 className="text-5xl font-bold mb-6 typing-animation">
            Welcome to Collab<span className="text-sky-400/70">At</span>
          </h1>
          <p className="text-2xl font-light text-indigo-100 mb-10 max-w-2xl mx-auto">
            Collaborate, Create, and Connect with<br/> fellow developers
          </p>
          <button
            onClick={openModal}
            className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:text-white hover:bg-blue-400/90 font-extrabold hover:scale-105 transform transition duration-300"
          >
            Get Started
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="bg-indigo-100 py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700/90 mb-6">About CollabAt</h2>
          <p className="text-gray-800 text-lg max-w-3xl mx-auto mb-8">
            CollabAt is an innovative platform designed to help developers connect, collaborate, and form teams for hackathons and coding contests. Whether you're a beginner or an expert, CollabAt makes it easy to find team members with similar interests, communicate through chat, and share resources for successful projects.
          </p>
          <button
            className="bg-blue-600/90 text-white px-6 py-3 rounded-lg hover:bg-purple-600 hover:scale-105 transition duration-300"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Combined Services & Features Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-16 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-12">Our Services & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Profile Creation */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 transition border-4 border-white hover:border-sky-300 duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Profile Creation</h3>
              <p className="text-gray-600">Customize your profile with skills, interests, and experiences, making it easier for others to connect with you.</p>
            </div>

            {/* Real-Time Chat */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 border-4 border-white hover:border-sky-300 transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Real-Time Chat</h3>
              <p className="text-gray-600">Chat live with teammates, share resources, and keep project discussions centralized and accessible.</p>
            </div>

            {/* Hackathons & Events */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 border-4 border-white hover:border-sky-300 transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Hackathons & Events</h3>
              <p className="text-gray-600">Browse upcoming events, join teams, and stay updated on important dates and deadlines.</p>
            </div>

            {/* Resource Sharing */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 border-4 border-white hover:border-sky-300 transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Resource Sharing</h3>
              <p className="text-gray-600">Easily share links, code snippets, documents, and other resources with teammates.</p>
            </div>

            {/* Team Formation */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 border-4 border-white hover:border-sky-300 transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Team Formation</h3>
              <p className="text-gray-600">Find compatible team members based on skills and project interests, ensuring strong and effective teams.</p>
            </div>

            {/* Project Insights */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-r from-yellow-100/50 to-sky-100/50 border-4 border-white hover:border-sky-300 transition duration-300 transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">Project Insights</h3>
              <p className="text-gray-600">Gain valuable insights into your projects with stats, feedback, and guidance from experts.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700/90 mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-lg text-gray-700 italic">"CollabAt helped me find the perfect team for my hackathon. The experience was seamless and fun!"</p>
              <h3 className="mt-4 font-semibold text-blue-700">- Arav T.</h3>
            </div>
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <p className="text-lg text-gray-700 italic">"The real-time chat and resource sharing features are game-changers for remote team collaboration."</p>
              <h3 className="mt-4 font-semibold text-blue-700">- Sam K.</h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-32 flex flex-col justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-lg mb-10">Collaborate with talented developers and turn your ideas into reality!</p>
          <button
            onClick={openModal}
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-red-400/80 hover:text-white transition duration-300"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Modal for ProfileForm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <ProfileForm />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Body;
