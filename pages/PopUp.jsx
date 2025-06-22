// 'use client';

// import React, { useState, useEffect } from 'react';
// import styles from './PopUp.module.css';
// import Image from 'next/image';
// import Popup from '../public/assets/Popup.png';
// import plane from '../public/assets/plane.jpg';
// import axios from 'axios';

// export default function PopUp() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [destination, setDestination] = useState('');

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem('travelPopupDismissed');
//     if (!dismissed) {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//       }, 8000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     sessionStorage.setItem('travelPopupDismissed', 'true');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { mobileNumber, destination };

//     try {
//       await axios.post('https://desire4travels-1.onrender.com/api/popup-enquiries', formData);
//       alert('Submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Submission failed!');
//     }

//     handleClose();
//   };

//   if (!isVisible) return null;

//   return (
//     <div className={styles['popup-overlay']}>
//       <div className={styles['popup-card']}>
//         <button className={styles['popup-close-button']} onClick={handleClose}>×</button>
//         <form className={styles['popup-form']} onSubmit={handleSubmit}>
//           <h2>Plan Your Next Journey</h2>
//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Where do you want to go?"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             required
//           />
//           <button type="submit">Talk with Our Travel Experts</button>

//         </form>
//         <div className={styles['popup-image']}>
//           <Image src={Popup} alt="Travel" width={400} height={400} />
//         </div>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Popup from '../public/assets/Popup.png';
// import axios from 'axios';

// export default function PopUp() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [destination, setDestination] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem('travelPopupDismissed');
//     if (!dismissed) {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//       }, 8000);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//     sessionStorage.setItem('travelPopupDismissed', 'true');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { mobileNumber, destination };

//     try {
//       await axios.post('https://desire4travels-1.onrender.com/api/popup-enquiries', formData);
//       setIsSubmitted(true);
//       setTimeout(() => handleClose(), 3000);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Submission failed!');
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl flex flex-col w-full max-w-2xl relative">
//         {/* Close button - visible on all screens */}
//         <button 
//           className="absolute -top-3 -right-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
//           onClick={handleClose}
//           aria-label="Close popup"
//         >
//           <span className="text-gray-600 text-xl">&times;</span>
//         </button>

//         {isSubmitted ? (
//           <div className="flex flex-col items-center justify-center p-8 text-center">
//             <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
//             <p className="text-lg text-gray-700 mb-6">
//               Our travel expert will contact you shortly to help plan your dream vacation.
//             </p>
//             <div className="relative w-full h-48 md:h-64">
//               <Image 
//                 src={Popup} 
//                 alt="Travel" 
//                 fill
//                 className="rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col md:flex-row">
//             <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
//                 Plan Your Next Journey
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                   type="tel"
//                   placeholder="Mobile Number"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Where do you want to go?"
//                   value={destination}
//                   onChange={(e) => setDestination(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
//                 >
//                   Connect Me Now
//                 </button>
//               </form>
//             </div>
//             <div className="w-full md:w-1/2 relative h-48 md:h-auto">
//               <Image 
//                 src={Popup} 
//                 alt="Special Offers" 
//                 fill
//                 className="object-cover rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Popup from '../public/assets/Popup.jpg';
import axios from 'axios';
import Popup2 from '../public/assets/Popup.png'; // Ensure this path is correct

export default function PopUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('travelPopupDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('travelPopupDismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { mobileNumber, destination };

    try {
      await axios.post('https://desire4travels-1.onrender.com/api/popup-enquiries', formData);
      setIsSubmitted(true);
      setTimeout(() => handleClose(), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed!');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl flex flex-col w-full max-w-2xl relative">
        {/* Close button */}
        <button
          className="absolute -top-3 -right-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <span className="text-gray-600 text-xl">&times;</span>
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our travel expert will contact you shortly to help plan your dream vacation.
            </p>
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={Popup2}
                alt="Travel"
                fill
                // className="rounded-lg object-cover"
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 px-2 py-1 md:p-6 flex flex-col justify-start">
              <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                Plan Your Next Journey
              </h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Connect Me Now
                </button>
              </form>
            </div>



            {/* Mobile view — full image without crop */}
            <div className="w-full md:hidden flex items-center justify-center bg-white p-4 rounded-t-lg">
              <Image
                src={Popup}
                alt="Special Offers"
                width={400}
                height={400}
                className="w-full h-auto max-h-[300px] object-contain rounded-lg"
              />
            </div>

            {/* Desktop view — cropped background style image */}
            <div className="hidden md:block w-full md:w-1/2 relative h-48 sm:h-64 md:h-auto min-h-[200px]">
              <Image
                src={Popup}
                alt="Special Offers"
                fill
                className="object-cover rounded-r-lg rounded-bl-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
