// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import SuccessPopup from './SuccessPopup.jsx';
// import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

// const DestinationCard = ({
//   imgSrc,
//   title,
//   location,
//   tripType,
//   rating,
//   showExtras = true,
//   showLocation = true,
// }) => {
//   const [showCallbackForm, setShowCallbackForm] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [showSuccessTick, setShowSuccessTick] = useState(false);
//   const router = useRouter();

//   const handleCardClick = () => {
//     router.push(`/destination/${title}`);
//   };

//   const handleCallbackRequest = (e) => {
//     e.stopPropagation();
//     setShowCallbackForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://desire4travels-1.onrender.com/callback-destination', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           phoneNo: mobileNumber,
//           destination: title,
//           called: false,
//         }),
//       });

//       if (response.ok) {
//         setShowCallbackForm(false);
//         setMobileNumber('');
//         setShowSuccessTick(true);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       alert('Failed to send callback request. Please try again later.');
//     }
//   };

//   return (
//     <>
//       {showSuccessTick && (
//         <SuccessPopup
//           message="Your callback request has been submitted successfully."
//           onClose={() => setShowSuccessTick(false)}
//         />
//       )}

//       <div className="destination-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
//         <img src={imgSrc} alt={title} className="destination-image" />
//         <div className="card-content">
//           <h2 className="destination-title">{title}</h2>

//           {showLocation && (
//             <p className="location">
//               <FaMapMarkerAlt /> {location}
//             </p>
//           )}

//           {tripType && (
//             <p className="trip-type">
//               Type: {Array.isArray(tripType) ? tripType.join(', ') : tripType}
//             </p>
//           )}

//           {showExtras && (
//             <>
//               <p className="rating">
//                 <FaStar className="star-icon" /> {rating} / 5
//               </p>
//               <button className="request-btn" onClick={handleCallbackRequest}>
//                 Request Call Back
//               </button>
//             </>
//           )}

//           {showExtras && showCallbackForm && (
//             <div className="callback-form-overlay" onClick={(e) => e.stopPropagation()}>
//               <form className="callback-form" onSubmit={handleSubmit}>
//                 <input
//                   type="tel"
//                   placeholder="Enter mobile number"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                   required
//                 />
//                 <div>
//                   <a href="/signup" className="signup-link">
//                     Sign up for updates
//                   </a>
//                 </div>
//                 <div className="form-buttons">
//                   <button type="submit">Submit</button>
//                   <button type="button" onClick={() => setShowCallbackForm(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DestinationCard;



// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import SuccessPopup from './SuccessPopup.jsx';
// import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

// const DestinationCard = ({
//   imgSrc,
//   title,
//   location,
//   tripType,
//   rating,
//   showExtras = true,
//   showLocation = true,
// }) => {
//   const [showCallbackForm, setShowCallbackForm] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [showSuccessTick, setShowSuccessTick] = useState(false);
//   const router = useRouter();

//   const handleCardClick = () => {
//     if (!showCallbackForm) {
//       router.push(`/destination/${title}`);
//     }
//   };

//   const handleCallbackRequest = (e) => {
//     e.stopPropagation();
//     setShowCallbackForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://desire4travels-1.onrender.com/callback-destination', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           phoneNo: mobileNumber,
//           destination: title,
//           called: false,
//         }),
//       });

//       if (response.ok) {
//         setShowCallbackForm(false);
//         setMobileNumber('');
//         setShowSuccessTick(true);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       alert('Failed to send callback request. Please try again later.');
//     }
//   };

//   return (
//     <>
//       {showSuccessTick && (
//         <SuccessPopup
//           message="Your callback request has been submitted successfully."
//           onClose={() => setShowSuccessTick(false)}
//         />
//       )}

//       <div
//         className="destination-card relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
//         onClick={handleCardClick}
//         style={{ cursor: 'pointer' }}
//       >
//         <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
//         <div className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

//           {showLocation && (
//             <p className="flex items-center text-sm text-gray-600">
//               <FaMapMarkerAlt className="mr-1 text-red-500" /> {location}
//             </p>
//           )}

//           {tripType && (
//             <p className="text-sm text-gray-500">
//               Type: {Array.isArray(tripType) ? tripType.join(', ') : tripType}
//             </p>
//           )}

//           {showExtras && (
//             <>
//               <p className="flex items-center text-sm text-yellow-500">
//                 <FaStar className="mr-1" /> {rating} / 5
//               </p>
//               <button
//                 className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleCallbackRequest}
//               >
//                 Request Call Back
//               </button>
//             </>
//           )}
//         </div>

//         {showExtras && showCallbackForm && (
//           <div
//             className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <form
//               className="bg-white rounded-lg p-4 w-[90%] sm:w-[80%] md:w-[70%] shadow-xl"
//               onSubmit={handleSubmit}
//             >
//               <h3 className="text-lg font-semibold mb-2 text-gray-700">Request a Callback</h3>
//               <input
//                 type="tel"
//                 placeholder="Enter mobile number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
//               />
//               <div className="flex justify-between items-center mb-3">
//                 <a href="/signup" className="text-blue-600 text-sm hover:underline">
//                   Sign up for updates
//                 </a>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCallbackForm(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DestinationCard;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SuccessPopup from './SuccessPopup.jsx';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const DestinationCard = ({
  imgSrc,
  title,
  location,
  tripType,
  rating,
  showExtras = true,
  showLocation = true,
}) => {
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (!showCallbackForm) {
      router.push(`/destination/${title}`);
    }
  };

  const handleCallbackRequest = (e) => {
    e.stopPropagation();
    setShowCallbackForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://desire4travels-1.onrender.com/callback-destination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNo: mobileNumber,
          destination: title,
          called: false,
        }),
      });

      if (response.ok) {
        setShowCallbackForm(false);
        setMobileNumber('');
        setShowSuccessTick(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to send callback request. Please try again later.');
    }
  };

  return (
    <>
      {showSuccessTick && (
        <SuccessPopup
          message="Your callback request has been submitted successfully."
          onClose={() => setShowSuccessTick(false)}
        />
      )}

      <div
        className="destination-card bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 
                   overflow-hidden flex flex-col items-center justify-between min-h-[400px] sm:min-h-[unset] w-full text-center relative"
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />

        <div className="p-4 space-y-2 flex flex-col items-center justify-center w-full">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

          {showLocation && (
            <p className="flex items-center justify-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1 text-red-500" /> {location}
            </p>
          )}

          {tripType && (
            <p className="text-sm text-gray-500">
              Type: {Array.isArray(tripType) ? tripType.join(', ') : tripType}
            </p>
          )}

          {showExtras && (
            <>
              <p className="flex items-center justify-center text-sm text-yellow-500">
                <FaStar className="mr-1" /> {rating} / 5
              </p>
              <button
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
                onClick={handleCallbackRequest}
              >
                Request Call Back
              </button>
            </>
          )}
        </div>

        {showExtras && showCallbackForm && (
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-2xl space-y-3"
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-bold text-gray-800 text-center">Request a Callback</h3>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="text-center">
                <a href="/signup" className="text-blue-600 text-sm hover:underline">
                  Sign up for updates
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowCallbackForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default DestinationCard;
