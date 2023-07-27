import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [donorData, setDonorData] = useState({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token1");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/donors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setDonorData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-gray">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg hover:shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-red-400 hover:text-red-600 transition-colors duration-300 ease-out text-center">
          Dashboard
        </h1>
        {Object.keys(donorData).length > 0 ? (
          <div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Name:</span>
              <span className="text-gray-600">
                {donorData.firstName} {donorData.lastName}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Email:</span>
              <span className="text-gray-600">{donorData.email}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Phone:</span>
              <span className="text-gray-600">{donorData.phone}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">BloodGroup:</span>
              <span className="text-gray-600">{donorData.bloodGroup}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Age:</span>
              <span className="text-gray-600">{donorData.age}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No donor data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
