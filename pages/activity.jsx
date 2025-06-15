import Link from 'next/link';
import { activities } from '../lib/data';
import { useState } from 'react';
import Head from 'next/head';

export default function Activity() {
  const [showModal, setShowModal] = useState(false);
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!number) return alert('Please enter your mobile number.');
    setLoading(true);
    try {
      const res = await fetch('https://desire4travels-1.onrender.com/activity-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number }),
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Adventure Activities with Desire4Travels | Trekking, Paragliding, Camping & More</title>
        <meta
          name="description"
          content="Explore thrilling adventure activities with Desire4Travels including trekking, paragliding, rafting, scuba diving, and more. Safe, guided, and unforgettable experiences await you."
        />
        <meta
          name="keywords"
          content="adventure activities, trekking, paragliding, bungee jumping, flying fox, rafting, igloo stays, scuba diving India, giant swing, camping trips, Desire4Travels, travel adventures, outdoor experiences, Adventures in india"
        />
        <meta name="author" content="Desire4Travels" />
        <meta property="og:title" content="Adventure Activities with Desire4Travels | Trekking, Paragliding, Camping & More" />
        <meta property="og:description" content="Explore thrilling adventure activities with Desire4Travels including trekking, paragliding, rafting, scuba diving, and more. Safe, guided, and unforgettable experiences await you." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.desire4travels.com/activities" />
      </Head>

      {/* Hero Banner */}
      <div className="w-screen bg-gradient-to-r from-[#0F172A] to-[#5B76D6] text-white text-center py-12 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4">
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white">
            Adventure Activities
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Experience India's top adrenaline-filled adventures — from trekking to scuba diving.
          </p>
        </div>
      </div>

      {/* Activity Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
            >
              <Link href={`/activity/${activity.slug}`} passHref>
                <div className="h-48 bg-gray-300 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4 flex flex-col space-y-2">
                <Link href={`/activity/${activity.slug}`} passHref>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    {activity.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm line-clamp-2">{activity.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-blue-600">
                    Starting from {activity.price}
                  </span>
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                  >
                    Enquiry Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            {!submitted ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Request a Callback</h2>
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-green-600 font-semibold text-lg">
                Callback requested successfully!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
