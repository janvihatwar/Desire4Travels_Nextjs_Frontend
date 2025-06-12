import Link from 'next/link';
import { activities } from './data';

export default function Activity() {
  return (
    <div className="min-h-screen bg-gray-50">
      
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
            <Link key={activity.id} href={`/activity/${activity.slug}`} passHref>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-gray-300 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{activity.title}</h2>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex justify-end items-center">
                    <span className="text-lg font-bold text-blue-600">Starting from {activity.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}