// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import DestinationCard from '../components/DestinationCard';

// const ITEMS_PER_PAGE = 12;
// const tripTypes = ['All', 'Mountain', 'Beach', 'Religious', 'Treks', 'Offbeat', 'Other'];

// export default function Destination({ initialDestinations, initialFilteredType }) {
//   const router = useRouter();
//   const { triptype } = router.query;

//   const [destinations, setDestinations] = useState(initialDestinations);
//   const [filteredType, setFilteredType] = useState(initialFilteredType || 'All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredDestinations = React.useMemo(() => {
//     let result = destinations;

//     if (filteredType !== 'All') {
//       const normalizedType = filteredType.toLowerCase();
//       result = result.filter(dest => {
//         if (Array.isArray(dest.type)) {
//           return dest.type.some(t => t.trim().toLowerCase() === normalizedType);
//         }
//         return dest.type?.trim().toLowerCase() === normalizedType;
//       });
//     }

//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(dest =>
//         dest.name?.toLowerCase().includes(query) ||
//         dest.state?.toLowerCase().includes(query)
//       );
//     }

//     return result;
//   }, [destinations, filteredType, searchQuery]);

//   const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
//   const paginatedDestinations = filteredDestinations.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   useEffect(() => {
//     if (!triptype) {
//       setFilteredType('All');
//       setCurrentPage(1);
//     } else {
//       const matchedType = tripTypes.find(t => t.toLowerCase() === triptype.toLowerCase()) || 'All';
//       setFilteredType(matchedType);
//       setCurrentPage(1);
//     }
//   }, [triptype]);

//   const handleTypeChange = (e) => {
//     const selected = e.target.value;
//     setCurrentPage(1);
//     if (selected === 'All') {
//       router.push('/destination', undefined, { shallow: true });
//     } else {
//       router.push(`/destination?triptype=${selected.toLowerCase()}`, undefined, { shallow: true });
//     }
//   };

//   // const goToNextPage = () => {
//   //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   // };

//   // const goToPrevPage = () => {
//   //   if (currentPage > 1) setCurrentPage(currentPage - 1);
//   // };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };


//   return (
//     <div className="destination-page">
//       <Head>
//         <title>Best Places to Visit – Sightseeing, Stays & More</title>
//         <meta
//           name="description"
//           content="Discover stunning travel destinations across continents with Desire4Travels. Browse curated guides, local insights, and inspiration for your next trip."
//         />
//         <meta
//           name="keywords"
//           content="travel destinations, top places to visit, destination guides, travel spots, international travel, exotic destinations, Indian destinations, adventure travel locations, tropical vacations, best cities to visit, travel planning, cultural destinations, bucket list places, best places to visit"
//         />
//         <meta name="author" content="Desire4Travels" />
//         <meta property="og:title" content="Best Places to Visit – Travel Guides & Tips | Desire4Travels" />
//         <meta
//           property="og:description"
//           content="Discover stunning travel destinations across continents with Desire4Travels. Browse curated guides, local insights, and inspiration for your next trip."
//         />
//       </Head>

//       <header className="destination-hero px-4 sm:px-8 py-8">
//         <div className="destination-hero-content max-w-5xl mx-auto">
//           <h1 className="destination-title text-3xl sm:text-4xl font-bold text-center mb-6">Destinations</h1>

//           <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-center gap-4">
//             {/* Search Input + Button Group with downward offset */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-3 w-full sm:w-[50%]">
//               <input
//                 type="text"
//                 placeholder="Search destination..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full sm:w-[65%] px-4 py-2.5 border border-gray-300 rounded-md text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               />

//               <button
//                 onClick={() => setCurrentPage(1)}
//                 className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
//               >
//                 Search
//               </button>
//             </div>

//             {/* Dropdown Filter (aligned top) */}
//             <select
//               value={filteredType}
//               onChange={handleTypeChange}
//               className="w-full sm:w-[25%] px-4 py-2.5 border border-gray-300 rounded-md text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
//             >
//               {tripTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>


//         </div>
//       </header>

//       <div className="cards-container px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {paginatedDestinations.length > 0 ? (
//           paginatedDestinations.map(dest => (
//             <DestinationCard
//               key={dest.id}
//               imgSrc={dest.image}
//               title={dest.name}
//               location={dest.state}
//               tripType={dest.type}
//               rating={parseFloat(dest.rating || 0).toFixed(1)}
//               onClick={() => router.push(`/destination/${dest.id}`)}
//             />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-600">No destinations available.</p>
//         )}
//       </div>

//       {totalPages > 1 && (
//         <div className="text-center my-8">
//           <button
//             onClick={goToPrevPage}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded-md mr-4 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
//           >
//             Previous
//           </button>
//           <span className="text-lg">Page {currentPage} of {totalPages}</span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md ml-4 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const { triptype } = context.query || {};

//   try {
//     const res = await fetch('https://desire4travels-1.onrender.com/api/destinations');
//     if (!res.ok) {
//       throw new Error('Failed to fetch destinations');
//     }
//     const data = await res.json();
//     const allDestinations = data.destinations || [];

//     const normalizeType = (type) => (typeof type === 'string' ? type.trim().toLowerCase() : '');
//     let filteredType = 'All';
//     let filteredDestinations = allDestinations;

//     if (triptype) {
//       const normalizedParam = triptype.toLowerCase();
//       const validTypes = tripTypes.map(t => t.toLowerCase());

//       if (validTypes.includes(normalizedParam)) {
//         filteredType = triptype.charAt(0).toUpperCase() + triptype.slice(1).toLowerCase();
//         if (normalizedParam !== 'all') {
//           filteredDestinations = allDestinations.filter(dest => {
//             if (Array.isArray(dest.type)) {
//               return dest.type.some(t => normalizeType(t) === normalizedParam);
//             }
//             return normalizeType(dest.type) === normalizedParam;
//           });
//         }
//       }
//     }

//     return {
//       props: {
//         initialDestinations: filteredDestinations,
//         initialFilteredType: filteredType,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching destinations:', error);
//     return {
//       props: {
//         initialDestinations: [],
//         initialFilteredType: 'All',
//       },
//     };
//   }
// }



import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DestinationCard from '../components/DestinationCard';

const ITEMS_PER_PAGE = 12;
const tripTypes = ['All', 'Mountain', 'Beach', 'Religious', 'Treks', 'Offbeat', 'Other'];

export default function Destination({ initialDestinations, initialFilteredType }) {
  const router = useRouter();
  const { triptype } = router.query;

  const [destinations, setDestinations] = useState(initialDestinations);
  const [filteredType, setFilteredType] = useState(initialFilteredType || 'All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = React.useMemo(() => {
    let result = destinations;

    if (filteredType !== 'All') {
      const normalizedType = filteredType.toLowerCase();
      result = result.filter(dest => {
        if (Array.isArray(dest.type)) {
          return dest.type.some(t => t.trim().toLowerCase() === normalizedType);
        }
        return dest.type?.trim().toLowerCase() === normalizedType;
      });
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(dest =>
        dest.name?.toLowerCase().includes(query) ||
        dest.state?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [destinations, filteredType, searchQuery]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (!triptype) {
      setFilteredType('All');
      setCurrentPage(1);
    } else {
      const matchedType = tripTypes.find(t => t.toLowerCase() === triptype.toLowerCase()) || 'All';
      setFilteredType(matchedType);
      setCurrentPage(1);
    }
  }, [triptype]);

  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setCurrentPage(1);
    if (selected === 'All') {
      router.push('/destination', undefined, { shallow: true });
    } else {
      router.push(`/destination?triptype=${selected.toLowerCase()}`, undefined, { shallow: true });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to the destination-hero section
      const heroSection = document.querySelector('.destination-hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to the destination-hero section
      const heroSection = document.querySelector('.destination-hero');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="destination-page">
      <Head>
        <title>Best Places to Visit – Sightseeing, Stays & More</title>
        <meta
          name="description"
          content="Discover stunning travel destinations across continents with Desire4Travels. Browse curated guides, local insights, and inspiration for your next trip."
        />
        <meta
          name="keywords"
          content="travel destinations, top places to visit, destination guides, travel spots, international travel, exotic destinations, Indian destinations, adventure travel locations, tropical vacations, best cities to visit, travel planning, cultural destinations, bucket list places, best places to visit"
        />
        <meta name="author" content="Desire4Travels" />
        <meta property="og:title" content="Best Places to Visit – Travel Guides & Tips | Desire4Travels" />
        <meta
          property="og:description"
          content="Discover stunning travel destinations across continents with Desire4Travels. Browse curated guides, local insights, and inspiration for your next trip."
        />
      </Head>

<header className="destination-hero px-4 sm:px-8 py-8">
  <div className="destination-hero-content max-w-5xl mx-auto">
    <h1 className="destination-title text-3xl sm:text-4xl font-bold text-center mb-6"   style={{ marginBottom: '1rem' }} // equals mb-10 (40px)
>
      Destinations
    </h1>

    {/* Horizontal Flex Row for Search + Dropdown */}
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search destination..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-[45%] px-4 py-2.5 border border-gray-300 rounded-md text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />

      {/* Search Button */}
      <button
        onClick={() => setCurrentPage(1)}
        className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
      >
        Search
      </button>

      {/* Dropdown */}
      <select
        value={filteredType}
        onChange={handleTypeChange}
        className="w-full sm:w-[25%] px-4 py-2.5 border border-gray-300 rounded-md text-base text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
      >
        {tripTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  </div>
</header>

      <div className="cards-container px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {paginatedDestinations.length > 0 ? (
          paginatedDestinations.map(dest => (
            <DestinationCard
              key={dest.id}
              imgSrc={dest.image}
              title={dest.name}
              location={dest.state}
              tripType={dest.type}
              rating={parseFloat(dest.rating || 0).toFixed(1)}
              onClick={() => router.push(`/destination/${dest.id}`)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No destinations available.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="text-center my-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md mr-4 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Previous
          </button>
          <span className="text-lg">Page {currentPage} of {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ml-4 ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { triptype } = context.query || {};

  try {
    const res = await fetch('https://desire4travels-1.onrender.com/api/destinations');
    if (!res.ok) {
      throw new Error('Failed to fetch destinations');
    }
    const data = await res.json();
    const allDestinations = data.destinations || [];

    const normalizeType = (type) => (typeof type === 'string' ? type.trim().toLowerCase() : '');
    let filteredType = 'All';
    let filteredDestinations = allDestinations;

    if (triptype) {
      const normalizedParam = triptype.toLowerCase();
      const validTypes = tripTypes.map(t => t.toLowerCase());

      if (validTypes.includes(normalizedParam)) {
        filteredType = triptype.charAt(0).toUpperCase() + triptype.slice(1).toLowerCase();
        if (normalizedParam !== 'all') {
          filteredDestinations = allDestinations.filter(dest => {
            if (Array.isArray(dest.type)) {
              return dest.type.some(t => normalizeType(t) === normalizedParam);
            }
            return normalizeType(dest.type) === normalizedParam;
          });
        }
      }
    }

    return {
      props: {
        initialDestinations: filteredDestinations,
        initialFilteredType: filteredType,
      },
    };
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return {
      props: {
        initialDestinations: [],
        initialFilteredType: 'All',
      },
    };
  }
}