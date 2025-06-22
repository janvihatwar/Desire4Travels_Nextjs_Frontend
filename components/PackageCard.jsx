// import React, { useState } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import SuccessPopup from "./SuccessPopup";

// const PackageCard = ({ id, imgSrc, packageName, destinations, price, duration }) => {
//   const router = useRouter();
//   const [showCallbackForm, setShowCallbackForm] = useState(false);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

// const formattedPrice = isNaN(Number(price.toString().replace(/,/g, '')))
//   ? "N/A"
//   : `₹${Number(price.toString().replace(/,/g, '')).toLocaleString('en-IN')}`;


//   const locations = Array.isArray(destinations) && destinations.length > 0
//     ? destinations.filter(Boolean).join(" | ")
//     : "No Destinations Available";

//   const handleCallbackRequest = (e) => {
//     e.stopPropagation();
//     setShowCallbackForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('https://desire4travels-1.onrender.com/callback-package', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           phoneNo: mobileNumber,
//           package: packageName,
//           called: false,
//         }),
//       });

//       if (response.ok) {
//         setShowCallbackForm(false);
//         setMobileNumber('');
//         setShowSuccessPopup(true);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       alert('Failed to send callback request. Please try again later.');
//     }
//   };

//   const handleCardClick = () => {
//     router.push(`/package/${id}`);
//   };

//   return (
//     <>
//       {showSuccessPopup && (
//         <SuccessPopup
//           message="Your callback request has been submitted successfully."
//           onClose={() => setShowSuccessPopup(false)}
//         />
//       )}

//       <div className="package-card-wrapper">
//         <div className="package-card cursor-pointer" onClick={handleCardClick}>
//           <Image
//             src={imgSrc}
//             alt={packageName}
//             className="package-image"
//             width={400}
//             height={250}
//             style={{ objectFit: "cover" }}
//             unoptimized={true}
//           />
//           <div className="card-content">
//             <h2 className="package-title1" title={packageName}>
//               {packageName.length > 25 ? `${packageName.slice(0, 25)}...` : packageName}
//             </h2>
//             <div className="package-location-wrapper">
//               <FaMapMarkerAlt className="package-location-icon" />
//               <span className="package-location-text">{locations}</span>
//             </div>
//             <p className="price">{formattedPrice}</p>
//             <p className="duration">{duration}</p>
//             <button className="request-btn" onClick={handleCallbackRequest}>Request Call Back</button>

//             {showCallbackForm && (
//               <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
//                 <div>
//                   <input
//                     type="tel"
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                     placeholder="Mobile Number"
//                     required
//                   />
//                 </div>
//                 <button type="submit">Submit</button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PackageCard;



import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import SuccessPopup from "./SuccessPopup";

const PackageCard = ({ id, imgSrc, packageName, destinations, price, duration }) => {
  const router = useRouter();
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const formattedPrice = isNaN(Number(price.toString().replace(/,/g, '')))
    ? "N/A"
    : `₹${Number(price.toString().replace(/,/g, '')).toLocaleString('en-IN')}`;

  const locations = Array.isArray(destinations) && destinations.length > 0
    ? destinations.filter(Boolean).join(" | ")
    : "No Destinations Available";

  const handleCallbackRequest = (e) => {
    e.stopPropagation();
    setShowCallbackForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://desire4travels-1.onrender.com/callback-package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNo: mobileNumber,
          package: packageName,
          called: false,
        }),
      });

      if (response.ok) {
        setShowCallbackForm(false);
        setMobileNumber('');
        setShowSuccessPopup(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to send callback request. Please try again later.');
    }
  };

  const handleCardClick = () => {
    if (!showCallbackForm) {
      router.push(`/package/${id}`);
    }
  };

  return (
    <>
      {showSuccessPopup && (
        <SuccessPopup
          message="Your callback request has been submitted successfully."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      <div className="package-card-wrapper" style={{ position: 'relative' }}>
        <div className="package-card cursor-pointer" onClick={handleCardClick}>
          <Image
            src={imgSrc}
            alt={packageName}
            className="package-image"
            width={400}
            height={250}
            style={{ objectFit: "cover" }}
            unoptimized={true}
          />
          <div className="card-content">
            <h2 className="package-title1" title={packageName}>
              {packageName.length > 25 ? `${packageName.slice(0, 25)}...` : packageName}
            </h2>
            <div className="package-location-wrapper">
              <FaMapMarkerAlt className="package-location-icon" />
              <span className="package-location-text">{locations}</span>
            </div>
            <p className="price">{formattedPrice}</p>
            <p className="duration">{duration}</p>
            <button 
              className="request-btn" 
              onClick={handleCallbackRequest}
            >
              Request Call Back
            </button>
          </div>
        </div>

        {showCallbackForm && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '1rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.25rem',
                width: '100%',
                maxWidth: '20rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}>
                Request a Callback
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                For: {packageName}
              </p>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  outline: 'none',
                  focus: {
                    ring: '2px',
                    ringColor: '#3b82f6'
                  }
                }}
              />

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    width: '100%',
                    hover: {
                      backgroundColor: '#1d4ed8'
                    }
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowCallbackForm(false)}
                  style={{
                    backgroundColor: '#9ca3af',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    width: '100%',
                    hover: {
                      backgroundColor: '#6b7280'
                    }
                  }}
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

export default PackageCard;