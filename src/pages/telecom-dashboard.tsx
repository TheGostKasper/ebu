import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowRight, Bell, Search } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  InputBase,
} from "@mui/material";

const DashboardCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-80 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out 
      ${isHovered ? "h-80" : "h-40"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Content */}
      <div className="p-4">
        <div className="text-gray-800 text-lg font-semibold">Mobility</div>
        <div className="text-2xl font-bold">QAR 4,500</div>
        <div className="mt-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {/* Placeholder for Pie Chart */}
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hidden Content - only visible when hovered */}
      {isHovered && (
        <div className="absolute inset-0 bg-gray-100 p-4 transition-opacity duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Active</span>
            <span className="text-green-500">80</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Suspended</span>
            <span className="text-yellow-500">24</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Barred</span>
            <span className="text-red-500">18</span>
          </div>
          <div className="mt-4">
            {/* Placeholder for Pie Chart */}
            <div className="w-20 h-20 rounded-full bg-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const services = [
    {
      name: "Mobility",
      amount: "QAR 4,500",
      type: "bg-gray-800",
      percentage: 50,
      statuses: { active: 80, suspended: 24, barred: 18 },
    },
    { name: "Fiber", amount: "QAR 13,100", type: "bg-red-800" },
    { name: "IoT", amount: "QAR 3,300", type: "bg-red-700" },
    { name: "Push to Talk", amount: "QAR 4,500", type: "bg-red-600" },
    { name: "3rd Party Services", amount: "Coming Soon", type: "bg-red-500" },
  ];

  const actions = [
    {
      description: "November Bill - Payment Pending",
      status: "Suspended",
      statusColor: "text-yellow-500",
    },
    {
      description: "November Bill",
      status: "Active",
      statusColor: "text-green-500",
    },
    {
      description: "Add new SIMs in Fiber",
      status: "Active",
      statusColor: "text-green-500",
    },
    {
      description: "November Bill",
      status: "Barred",
      statusColor: "text-red-500",
    },
  ];

  const requests = [
    { description: "Add new SIMs in Fiber" },
    { description: "Allocate new devices in IoT" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-center mb-6 p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600">Chooser's name</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Create a Request
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Purchase New SIM
          </button>
          <span className="text-gray-500 hidden lg:inline-block">
            Tuesday July 18, 2024
          </span>
        </div>
      </header>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {services.map((service, idx) => (
          <DashboardCard key={idx}/>
        ))}
      </div>

      {/* Bill Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Outstanding Bill</h3>
          <p className="text-2xl font-bold">10,000 QAR</p>
        </div>
        <div className="bg-white p-6 text-center rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Current Bill</h3>
          <p className="text-2xl font-bold">15,000 QAR</p>
        </div>
        <div className="bg-yellow-500 p-6 text-center text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Bill</h3>
          <p className="text-2xl font-bold">25,000 QAR</p>
          <button className="bg-white text-yellow-500 px-4 py-2 mt-4 rounded-lg hover:bg-gray-100">
            Pay Now
          </button>
        </div>
      </div>

      {/* Action Required and Open Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Action Required */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Action Required (4)</h3>
          <ul className="space-y-3">
            {actions.map((action, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <span>{action.description}</span>
                <span className={action.statusColor}>{action.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Open Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Open Requests (2)</h3>
          <ul className="space-y-3">
            {requests.map((request, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <span>{request.description}</span>
                <span className="text-blue-500">&gt;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
