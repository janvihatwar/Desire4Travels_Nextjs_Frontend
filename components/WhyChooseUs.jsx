// // components/WhyChooseUs.jsx
// import { CheckCircle } from "lucide-react";

// const reasons = [
//   "Personalized itineraries tailored to each traveler",
//   "Trusted local partnerships for authentic experiences",
//   "24/7 real-time support throughout the journey",
//   "Transparent pricing with no hidden charges",
//   "Safe, comfortable, and well-coordinated trips",
//   "Founded by passionate travelers with firsthand experience",
//   // "Flexible plans with clear inclusions & cancellation policies",
//   // "Consistently high customer satisfaction and repeat bookings",
//   // "Handpicked destinations curated for unique, memorable experiences"
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
//           Why Choose <span className="text-blue-500">Desire4Travels?</span>
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//           We're not just a travel agency — we're passionate travelers helping you create unforgettable memories.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
//           {reasons.map((reason, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex gap-4 items-start"
//             >
//               <CheckCircle className="text-blue-500 w-6 h-6 mt-1" />
//               <p className="text-gray-800">{reason}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;



// components/WhyChooseUs.jsx
// import { CheckCircle } from "lucide-react";

// const reasons = [
//   "Personalized itineraries tailored to each traveler",
//   "Trusted local partnerships for authentic experiences",
//   "24/7 real-time support throughout the journey",
//   "Transparent pricing with no hidden charges",
//   "Safe, comfortable, and well-coordinated trips",
//   "Founded by passionate travelers with firsthand experience",
// ];

// const WhyChooseUs = () => {
//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-10 sm:py-14 md:py-16 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
//           Why Choose <span className="text-blue-500">Desire4Travels?</span>
//         </h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//           We're not just a travel agency — we're passionate travelers helping you create unforgettable memories.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
//           {reasons.map((reason, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-4 sm:p-5 md:p-6 hover:shadow-xl transition duration-300 flex gap-3 items-start h-full w-full"
//             >
//               <CheckCircle className="text-blue-500 w-6 h-6 mt-1" />
//               <p className="text-gray-800 text-sm sm:text-base leading-snug line-clamp-4">
//                 {reason}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;

import { CheckCircle } from "lucide-react";

const reasons = [
  "Personalized itineraries tailored to each traveler",
  "Trusted local partnerships for authentic experiences",
  "24/7 real-time support throughout the journey",
  "Transparent pricing with no hidden charges",
  "Safe, comfortable, and well-coordinated trips",
  "Founded by passionate travelers with firsthand experience",
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 px-4 sm:px-6">
      {/* Blue Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 opacity-95 blur-[1px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Why Choose <span className="text-blue-200">Desire4Travels?</span>
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-12 text-lg sm:text-xl">
          We're not just a travel agency — we're passionate travelers helping you create unforgettable memories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-5 sm:p-6 md:p-7 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start h-full"
            >
              <CheckCircle className="text-blue-300 w-6 h-6 mt-1 shrink-0" />
              <p className="text-white text-sm sm:text-base leading-snug font-medium">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
