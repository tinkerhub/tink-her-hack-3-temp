import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-2xl text-center px-4 bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to CancerAid
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Together, we can fight cancer and bring hope to those in need.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Click Here To Know More About Cancer
        </button>
      </div>
    </div>
  );
}

export default Home;