// import { useRouter } from 'next/router'; 
// import { useState } from 'react';
// import { activities } from '../../lib/data';

// export default function ActivityDetail() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const activity = activities.find((a) => a.slug === slug);
//   const [showModal, setShowModal] = useState(false);
//   const [number, setNumber] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async () => {
//     if (!number) return alert('Please enter your mobile number.');
//     setLoading(true);
//     try {
//       const res = await fetch('https://desire4travels-1.onrender.com/activity-callback', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ number }),
//       });
//       if (res.ok) {
//         setSubmitted(true);
//         setNumber('');
//         setTimeout(() => setShowModal(false), 2000);
//       } else {
//         alert('Failed to submit. Try again.');
//       }
//     } catch (err) {
//       alert('Error connecting to the server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!activity) {
//     return <div className="min-h-screen flex items-center justify-center">Activity not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="h-96 bg-gray-300 overflow-hidden">
//           <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
//         </div>

//         <div className="p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.title}</h1>

//           <div className="flex flex-wrap gap-4 mb-6">
//             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//               Starting from {activity.price}
//             </span>
//           </div>

//           <p className="text-gray-700 text-lg mb-6">{activity.details}</p>

//           <div className="mt-8">
//             <button
//               onClick={() => setShowModal(true)}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Enquiry Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
// {showModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//     <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center">
//       {!submitted ? (
//         <>
//           <h2 className="text-2xl font-semibold mb-4">Request a Callback</h2>
//           <input
//             type="tel"
//             value={number}
//             onChange={(e) => setNumber(e.target.value)}
//             placeholder="Enter your mobile number"
//             className="w-full border border-gray-300 rounded-md p-3 mb-5 text-center text-lg"
//           />
//           <div className="flex justify-between w-full">
//             <button
//               onClick={() => setShowModal(false)}
//               className="px-5 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="text-green-600 font-semibold text-xl py-8">
//           Callback requested successfully!
//         </div>
//       )}
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

import { useRouter } from 'next/router';
import { useState } from 'react';
import { activities } from '../../lib/data';

export default function ActivityDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const activity = activities.find((a) => a.slug === slug);
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!number) return alert('Please enter your mobile number.');
    if (!activity?.title) return alert('Activity name missing.');

    setLoading(true);
    try {
      const res = await fetch('https://desire4travels-1.onrender.com/activity-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, activityName: activity.title }),
      });

      if (res.ok) {
        setSubmitted(true);
        setNumber('');
        setTimeout(() => {
          setShowModal(false);
          setSubmitted(false);
        }, 2000);
      } else {
        alert('Failed to submit. Try again.');
      }
    } catch (err) {
      alert('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  if (!activity) {
    return <div className="min-h-screen flex items-center justify-center">Activity not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 bg-gray-300 overflow-hidden">
          <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Starting from {activity.price}
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-6">{activity.details}</p>

          <div className="mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enquiry Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl text-center">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-semibold mb-2">Request a Callback</h2>
                <h3 className="text-sm text-gray-700 italic mb-4">
                  For: <span className="text-blue-700 font-medium">{activity.title}</span>
                </h3>
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full border border-gray-300 rounded-md p-3 mb-5 text-center text-lg"
                />
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-green-600 font-semibold text-xl py-8">
                Callback requested successfully!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
