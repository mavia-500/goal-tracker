import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
    <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
      Goal Tracker
    </Link>
    <div className="flex gap-6">
      <Link
        to="/quadrant"
        className="text-lg text-gray-700 hover:text-blue-600 transition font-medium"
      >
        Quadrant
      </Link>
      <Link
        to="/dashboard"
        className="text-lg text-gray-700 hover:text-blue-600 transition font-medium"
      >
        Dashboard
      </Link>
    </div>
  </nav>
  )
}

export default Navbar