import React, { useState } from "react";

const CardSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    { title: "Mobility", price: "QAR 4,500", details: ["50%", "Internet", "QR 4,500", "View Details"] },
    { title: "Future A", price: "QAR 3,250", details: ["Plan Details"] },
    { title: "Battery", price: "QAR 1,100", details: ["Other Info"] },
  ];

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080/?landscape')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center space-y-8 pt-16">
        {/* Title Section */}
        <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
        <p className="text-white text-lg text-center max-w-2xl">
          Enjoy your best-selling unlimited premium plan with free valet parking for only QR 350 online.
        </p>

        {/* Cards Container */}
        <div className="w-full max-w-6xl flex justify-between">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative w-1/4 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-2xl shadow-lg cursor-pointer
                transition-all duration-300 origin-bottom
                ${activeCard === index ? "h-72 scale-y-125 z-10" : "h-48 scale-y-100"}
              `}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Static Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-lg">{card.price}</p>
              </div>

              {/* Hidden Content */}
              {activeCard === index && (
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-80 p-4 rounded-2xl">
                  <h3 className="text-white text-lg font-semibold">Details:</h3>
                  <ul className="space-y-2 text-sm">
                    {card.details.map((detail, i) => (
                      <li key={i} className="text-gray-300">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
