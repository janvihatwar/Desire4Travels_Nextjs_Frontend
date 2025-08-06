// import React from "react";
// import PackageCard from "../components/PackageCard";
// import Head from "next/head";

// export default function Package({ packages }) {
//   return (
//     <div className="package-container">
// <Head>
//   <title>Travel Deals for Couples, Families & Groups | Desire4Travels</title>
//   <meta
//     name="description"
//     content="Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
//   />
//   <meta
//     name="keywords"
//     content="travel packages, vacation packages, custom travel plans, adventure travel deals, romantic getaways, family vacation packages, Couple packages, Honeymoon packages, budget travel packages, luxury travel deals, group travel packages, holiday deals, tour packages, personalized travel packages, travel itineraries, Desire4Travels packages"
//   />
//   <meta name="author" content="Desire4Travels" />
//   <meta property="og:title" content="Travel Deals for Couples, Families & Groups | Desire4Travels" />
//   <meta
//     property="og:description"
//     content="Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
//   />
//   <meta property="og:type" content="website" />
// </Head>

//       <div>
//         <header className="package-hero">
//           <div className="package-hero-content">
//             <h1 className="package-title">Our Packages</h1>
//           </div>
//         </header>

//         <div className="package-grid">
//           {packages.length > 0 ? (
//             packages.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 id={pkg.id}
//                 imgSrc={pkg.photo}
//                 packageName={pkg.packageName}
//                 destinations={pkg.destinations}
//                 price={pkg.price}
//                 duration={pkg.duration}
//               />
//             ))
//           ) : (
//             <p>No packages available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     const res = await fetch("https://desire4travels-1.onrender.com/api/packages");
//     if (!res.ok) {
//       throw new Error("Failed to fetch packages");
//     }
//     const packages = await res.json();

//     return {
//       props: { packages }, 
//     };
//   } catch (error) {
//     console.error("Error fetching packages:", error);

//     return {
//       props: { packages: [] },
//     };
//   }
// }


// import React, { useState } from "react";
// import PackageCard from "../components/PackageCard";
// import Head from "next/head";
// import { useRouter } from "next/router";

// export default function Package({ packages, totalPages, currentPage }) {
//   const router = useRouter();

//   const goToPage = (page) => {
//     router.push(`/package?page=${page}`);
//   };

//   return (
//     <div className="package-container">
//       <Head>
//         <title>Travel Deals for Couples, Families & Groups | Desire4Travels</title>
//         <meta
//           name="description"
//           content="Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
//         />
//         <meta
//           name="keywords"
//           content="travel packages, vacation packages, custom travel plans, adventure travel deals, romantic getaways, family vacation packages, Couple packages, Honeymoon packages, budget travel packages, luxury travel deals, group travel packages, holiday deals, tour packages, personalized travel packages, travel itineraries, Desire4Travels packages"
//         />
//         <meta name="author" content="Desire4Travels" />
//         <meta property="og:title" content="Travel Deals for Couples, Families & Groups | Desire4Travels" />
//         <meta
//           property="og:description"
//           content="Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
//         />
//         <meta property="og:type" content="website" />
//       </Head>

//       <header className="package-hero py-12 bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-center">
//         <div className="package-hero-content">
//           <h1 className="package-title text-4xl font-bold">Our Packages</h1>
//         </div>
//       </header>

//       <div className="package-grid px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <PackageCard
//               key={pkg.id}
//               id={pkg.id}
//               imgSrc={pkg.photo}
//               packageName={pkg.packageName}
//               destinations={pkg.destinations}
//               price={pkg.price}
//               duration={pkg.duration}
//             />
//           ))
//         ) : (
//           <p>No packages available.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-4 pb-10">
//         <button
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage <= 1}
//           className="px-4 py-2 bg-blue-400 rounded hover:bg-gray-300 disabled:opacity-50"
//         >
//           Prev
//         </button>

//         {[...Array(totalPages)].map((_, index) => {
//           const pageNum = index + 1;
//           return (
//             <button
//               key={pageNum}
//               onClick={() => goToPage(pageNum)}
//               className={`px-3 py-1 rounded ${pageNum === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//             >
//               {pageNum}
//             </button>
//           );
//         })}

//         <button
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage >= totalPages}
//           className="px-4 py-2 bg-blue-400 rounded hover:bg-gray-300 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const currentPage = parseInt(query.page) || 1;
//   const limit = 12; // items per page

//   try {
//     const res = await fetch(`https://desire4travels-1.onrender.com/api/packages`);
//     if (!res.ok) {
//       throw new Error("Failed to fetch packages");
//     }

//     const allPackages = await res.json();
//     const totalPackages = allPackages.length;
//     const totalPages = Math.ceil(totalPackages / limit);

//     // Slice packages for current page
//     const start = (currentPage - 1) * limit;
//     const paginatedPackages = allPackages.slice(start, start + limit);

//     return {
//       props: {
//         packages: paginatedPackages,
//         currentPage,
//         totalPages,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     return {
//       props: {
//         packages: [],
//         currentPage: 1,
//         totalPages: 1,
//       },
//     };
//   }
// }


import React, { useRef, useState, useEffect } from "react";

import PackageCard from "../components/PackageCard";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Package({ packages, totalPages, currentPage }) {
    const router = useRouter();
 
  const heroRef = useRef(null);

  const [jumpPage, setJumpPage] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showError, setShowError] = useState(false);


 const goToPage = (page) => {
  setIsLoading(true); // Start loading
  router.push(`/package?page=${page}`).then(() => {
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      if (heroRef.current) {
        heroRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 0);
  });
};

useEffect(() => {
  setIsLoading(false);
}, [router.query.page]);


  return (
    <div className="package-container">
      <Head>
        <title>Travel Deals for Couples, Families & Groups | Desire4Travels</title>
        <meta
          name="description"
          content=" Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
        />
        <meta
          name="keywords"
          content="travel packages, vacation packages, custom travel plans, adventure travel deals, romantic getaways, family vacation packages, Couple packages, Honeymoon packages, budget travel packages, luxury travel deals, group travel packages, holiday deals, tour packages, personalized travel packages, travel itineraries, Desire4Travels packages"
        />
        <meta name="author" content="Desire4Travels" />
        <meta property="og:title" content="Travel Deals for Couples, Families & Groups | Desire4Travels" />
        <meta
          property="og:description"
          content="Browse our travel packages for every style and budget. From romantic getaways to adventure tours, Desire4Travels offers custom itineraries and great deals."
        />
        <meta property="og:type" content="website" />
      </Head>

      <header 
        ref={heroRef} 
        className="package-hero py-12 bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-center"
      >
        <div className="package-hero-content">
          <h1 className="package-title text-4xl font-bold">Our Packages</h1>
        </div>
      </header>

      <div className="package-grid px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              imgSrc={pkg.photo}
              packageName={pkg.packageName}
              destinations={pkg.destinations}
              price={pkg.price}
              duration={pkg.duration}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No packages available.</p>
        )}
      </div>

      
<div className="flex justify-center items-center gap-4 pb-10 flex-wrap">
  {/* Page Info */}
  <p className="text-sm text-gray-700">
    Page {currentPage}/{totalPages}
  </p>

  {/* Prev Button */}
  <button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage <= 1}
    className="px-4 py-2 bg-blue-400 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Prev
  </button>

  {/* Jump to Page + Go (Horizontal) */}
  <div className="flex items-center gap-2">
    <label htmlFor="jumpPage" className="text-sm font-medium text-gray-700">
      Jump to page:
    </label>
    <input
      type="number"
      id="jumpPage"
      min="1"
      max={totalPages}
      value={jumpPage}
      onChange={(e) => setJumpPage(e.target.value)}
      className="w-20 px-2 py-1 border border-gray-300 rounded"
    />
    <button
      onClick={() => {
        const page = parseInt(jumpPage);
        if (page >= 1 && page <= totalPages) {
          goToPage(page);
          setJumpPage("");
          setShowError(false);
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        }
      }}
      className="px-3 py-1 bg-blue-400 text-white rounded hover:bg-green-600"
    >
      Go
    </button>
  </div>

  {/* Next Button */}
  <button
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage >= totalPages}
    className="px-4 py-2 bg-blue-400 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Next
  </button>
</div>


{showError && (
  <p className="text-red-600 text-sm mt-1">
    Please enter a valid page number (1 - {totalPages})
  </p>
)}



{isLoading && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}


    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const currentPage = parseInt(query.page) || 1;
  const limit = 12; // items per page

  try {
    const res = await fetch(`https://desire4travels-1.onrender.com/api/packages`);
    if (!res.ok) {
      throw new Error("Failed to fetch packages");
    }

    const allPackages = await res.json();
    const totalPackages = allPackages.length;
    const totalPages = Math.ceil(totalPackages / limit);

    // Slice packages for current page
    const start = (currentPage - 1) * limit;
    const paginatedPackages = allPackages.slice(start, start + limit);

    return {
      props: {
        packages: paginatedPackages,
        currentPage,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error fetching packages:", error);
    return {
      props: {
        packages: [],
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
}