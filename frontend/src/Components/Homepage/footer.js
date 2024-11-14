import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {/* Colab Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-300">CollabAt</h3>
            <p className="text-gray-400 mb-4">Empowering developers to work together, connect, and build amazing projects. Join us to collaborate on hackathons and projects worldwide.</p>
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CollabAt. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-blue-300 transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">Contact</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">Services</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-blue-300 transition">Blog</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">FAQ</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">Support</Link></li>
              <li><Link to="/" className="hover:text-blue-300 transition">Tutorials</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://github.com" className="hover:text-blue-300 transition">GitHub</a></li>
              <li><a href="https://twitter.com" className="hover:text-blue-300 transition">Twitter</a></li>
              <li><a href="https://linkedin.com" className="hover:text-blue-300 transition">LinkedIn</a></li>
              <li><a href="https://facebook.com" className="hover:text-blue-300 transition">Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-10 border-t border-gray-600 pt-6 text-center text-gray-500 text-sm">
          <p>Designed by CollabAt Team • Built for Developers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
