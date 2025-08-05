// import React, { useState } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';

// let DOMPurify;

// if (typeof window !== 'undefined') {
//   DOMPurify = require('dompurify');
// }

// import { FiArrowLeft, FiCalendar, FiUser, FiChevronRight } from 'react-icons/fi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// const API_BASE_URL = "https://desire4travels-1.onrender.com/blogs";

// export async function getServerSideProps(context) {
//   const { slug } = context.params;

//   try {
//     const [blogResponse, similarResponse] = await Promise.all([
//       axios.get(`${API_BASE_URL}/${slug}`),
//       axios.get(API_BASE_URL),
//     ]);

//     const blog = blogResponse.data;

//     if (!blog) {
//       return {
//         notFound: true,
//       };
//     }

//     const similarBlogs = similarResponse.data
//       .filter(b => b.category === blog.category && String(b.id) !== String(blog.id))
//       .slice(0, 3)
//       .map(blog => ({
//         ...blog,
//         image: blog.image?.startsWith('http') ? blog.image : `${API_BASE_URL.replace('/blogs', '')}${blog.image}`,
//       }));

//     return {
//       props: {
//         blog,
//         similarBlogs,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: error.response?.data?.message || error.message || 'Failed to load blog',
//       },
//     };
//   }
// }

// const BlogPost = ({ blog, similarBlogs = [], error }) => {
//   const [tripFormData, setTripFormData] = useState({
//     destination: '',
//     startDate: null,
//     noofdays: '',
//     travelers: '',
//     preference: '',
//     mobileNumber: ''
//   });

//   if (error) {
//     return (
//       <div className="error-container">
//         <Head>
//           <title>Error | Desire4Travel</title>
//         </Head>
//         <div className="error-icon">!</div>
//         <h3>Error Loading Content</h3>
//         <p>{error}</p>
//         <Link href="/blogs" className="error-back-btn">
//           <FiArrowLeft /> Back to Blogs
//         </Link>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="not-found-container">
//         <Head>
//           <title>Not Found | Desire4Travel</title>
//         </Head>
//         <h3>Blog Post Not Found</h3>
//         <p>The requested blog post doesn't exist or may have been removed.</p>
//         <Link href="/blogs" className="not-found-btn">
//           <FiArrowLeft /> Browse All Blogs
//         </Link>
//       </div>
//     );
//   }

//   const sanitizedContent = DOMPurify ? DOMPurify.sanitize(blog.content) : blog.content;

//   const absoluteImageUrl = blog.image?.startsWith('http') ? blog.image : `${API_BASE_URL.replace('/blogs', '')}${blog.image}`;

//   const handleTripChange = (e) => {
//     const { name, value } = e.target;
//     setTripFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (date) => {
//     setTripFormData(prev => ({ ...prev, startDate: date }));
//   };

//   const handleTripSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://desire4travels-1.onrender.com/api/plan-trip', tripFormData);
//       alert('Trip planned successfully! We will contact you shortly.');
//       setTripFormData({
//         destination: '',
//         startDate: null,
//         noofdays: '',
//         travelers: '',
//         preference: '',
//         mobileNumber: ''
//       });
//     } catch (err) {
//       alert(`Error: ${err.response?.data?.message || 'Failed to submit trip plan'}`);
//     }
//   };

//   return (
//     <div className="blog-page-wrapper">
//       <Head>
//         <title>{blog.title} | Desire4Travels</title>
//         <meta name="description" content={blog.excerpt?.replace(/<[^>]+>/g, '') || 'Travel blog post'} />
//         <meta property="og:title" content={blog.title} />
//         <meta property="og:description" content={blog.excerpt?.replace(/<[^>]+>/g, '') || 'Travel blog post'} />
//       </Head>

//       <div className="main-content-area">
//         <div className="blog-post-container">
//           <article className="blog-post">
//             <header className="blog-post-header">
//               <h1>{blog.title}</h1>
//               <div className="blog-meta">
//                 <span><FiUser /> {blog.author}</span>
//                 <span><FiCalendar /> {new Date(blog.date).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}</span>
//               </div>
//             </header>

//             <div className="blog-image-box">
//               <img
//                 src={absoluteImageUrl}
//                 alt={blog.alt || blog.title}
//                 className="blog-featured-image"
//                 loading="eager"
//                 onError={e => {
//                   e.target.onerror = null;
//                   e.target.src = '/placeholder-image.jpg';
//                 }}
//               />
//             </div>

//             <div
//               className="blog-content"
//               dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//             />
//           </article>
//         </div>

//         <div className="side-suggestions right">
//           <div className="trip-box">
//             <h3>Plan Your Dream Trip</h3>
//             <form onSubmit={handleTripSubmit}>
//               <input
//                 type="text"
//                 name="destination"
//                 placeholder="Where to?"
//                 value={tripFormData.destination}
//                 onChange={handleTripChange}
//                 required
//               />

//               <DatePicker
//                 selected={tripFormData.startDate}
//                 onChange={handleDateChange}
//                 placeholderText="Travel Dates"
//                 minDate={new Date()}
//                 className="date-picker"
//                 required
//               />

//               <input
//                 type="number"
//                 name="noofdays"
//                 placeholder="Duration (days)"
//                 min="1"
//                 value={tripFormData.noofdays}
//                 onChange={handleTripChange}
//                 required
//               />

//               <input
//                 type="number"
//                 name="travelers"
//                 placeholder="Travelers"
//                 min="1"
//                 value={tripFormData.travelers}
//                 onChange={handleTripChange}
//                 required
//               />

//               <input
//                 type="tel"
//                 name="mobileNumber"
//                 placeholder="Your Phone Number"
//                 pattern="[0-9]{10}"
//                 value={tripFormData.mobileNumber}
//                 onChange={handleTripChange}
//                 required
//               />

//               <button type="submit" className="submit-btn">
//                 Get Custom Plan
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="bottom-suggestions">
//         <h3 className="suggestions-title">You Might Also Like</h3>
//         <div className="suggestions-grid">
//           {similarBlogs.map(b => (
//             <Link key={b.id} href={`/blogs/${b.id}`}>
//               <div className="suggestion-card">
//                 <div className="suggestion-image-container">
//                   <img
//                     src={b.image}
//                     alt={b.alt || b.title}
//                     loading="lazy"
//                     onError={e => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//                 <div className="suggestion-info">
//                   <h4>{b.title}</h4>
//                   <p>{b.excerpt?.slice(0, 60)}...</p>
//                   <span className="read-more">
//                     Read More <FiChevronRight />
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="mobile-suggestions">
//         <h3>Related Articles</h3>
//         <div className="mobile-suggestions-grid">
//           {similarBlogs.map(b => (
//             <Link key={b.id} href={`/blogs/${b.id}`}>
//               <div className="mobile-suggestion-card">
//                 <div className="mobile-suggestion-image">
//                   <img
//                     src={b.image}
//                     alt={b.alt || b.title}
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="mobile-suggestion-info">
//                   <h4>{b.title}</h4>
//                   <p>{b.excerpt?.slice(0, 80)}...</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="sticky-contact-buttons">
//         <a href="tel:+1234567890" className="sticky-button call">
//           <span></span> Call Us
//         </a>
//         <a
//           href="https://wa.me/1234567890"
//           className="sticky-button whatsapp"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span></span> WhatsApp
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BlogPost;

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';

// let DOMPurify;

// if (typeof window !== 'undefined') {
//   DOMPurify = require('dompurify');
// }

// import { FiArrowLeft, FiCalendar, FiUser, FiChevronRight } from 'react-icons/fi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';

// const API_BASE_URL = "https://desire4travels-1.onrender.com/blogs";

// export async function getServerSideProps(context) {
//   const { slug } = context.params;

//   try {
//     const [blogResponse, similarResponse] = await Promise.all([
//       axios.get(`${API_BASE_URL}/${slug}`),
//       axios.get(API_BASE_URL),
//     ]);

//     const blog = blogResponse.data;

//     if (!blog) {
//       return {
//         notFound: true,
//       };
//     }

//     const similarBlogs = similarResponse.data
//       .filter(b => b.category === blog.category && String(b.id) !== String(blog.id))
//       .slice(0, 3)
//       .map(blog => ({
//         ...blog,
//         image: blog.image?.startsWith('http') ? blog.image : `${API_BASE_URL.replace('/blogs', '')}${blog.image}`,
//       }));

//     return {
//       props: {
//         blog,
//         similarBlogs,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: error.response?.data?.message || error.message || 'Failed to load blog',
//       },
//     };
//   }
// }

// const BlogPost = ({ blog, similarBlogs = [], error }) => {
//   const [tripFormData, setTripFormData] = useState({
//     destination: '',
//     startDate: '',
//     noofdays: '',
//     travelers: '',
//     preference: '',
//     mobileNumber: ''
//   });

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 max-w-4xl mx-auto">
//         <Head>
//           <title>Error | Desire4Travel</title>
//         </Head>
//         <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">!</div>
//         <h3 className="text-2xl font-bold mb-2">Error Loading Content</h3>
//         <p className="text-gray-600 mb-6">{error}</p>
//         <Link href="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-1">
//           <FiArrowLeft /> Back to Blogs
//         </Link>
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 max-w-4xl mx-auto">
//         <Head>
//           <title>Not Found | Desire4Travel</title>
//         </Head>
//         <h3 className="text-2xl font-bold mb-2">Blog Post Not Found</h3>
//         <p className="text-gray-600 mb-6">The requested blog post doesn't exist or may have been removed.</p>
//         <Link href="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-1">
//           <FiArrowLeft /> Browse All Blogs
//         </Link>
//       </div>
//     );
//   }

//   const sanitizedContent = DOMPurify ? DOMPurify.sanitize(blog.content) : blog.content;
//   const absoluteImageUrl = blog.image?.startsWith('http') ? blog.image : `${API_BASE_URL.replace('/blogs', '')}${blog.image}`;

//   const handleTripChange = (e) => {
//     const { name, value } = e.target;
//     setTripFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const [successMessage, setSuccessMessage] = useState('');

//   const handleTripSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://desire4travels-1.onrender.com/api/plan-trip', tripFormData);
//       setSuccessMessage('Trip planned successful! Will contact you shortly.');
//       setTripFormData({
//         destination: '',
//         startDate: '',
//         noofdays: '',
//         travelers: '',
//         preference: '',
//         mobileNumber: ''
//       });
//     } catch (err) {
//       setSuccessMessage(`Error: ${err.response?.data?.message || 'Failed to submit trip plan'}`);
//     }

//     // Auto-hide message after 4 seconds
//     setTimeout(() => {
//       setSuccessMessage('');
//     }, 4000);
//   };



//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <Head>
//         <title>{blog.title} | Desire4Travels</title>
//         <meta name="description" content={blog.excerpt?.replace(/<[^>]+>/g, '') || 'Travel blog post'} />
//         <meta property="og:title" content={blog.title} />
//         <meta property="og:description" content={blog.excerpt?.replace(/<[^>]+>/g, '') || 'Travel blog post'} />
//       </Head>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Main Blog Content - Stretched to left */}
//         <div className="lg:w-2/3">
//           <article className="bg-white rounded-xl shadow-lg overflow-hidden">
//             <div className="relative h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>

//             <div className="p-6 sm:p-8">
//               <header className="mb-8 text-center">
//                 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative pb-4">
//                   {blog.title}
//                   <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
//                 </h1>
//                 <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
//                   <span className="flex items-center gap-2">
//                     <FiUser className="text-gray-400" /> {blog.author}
//                   </span>
//                   <span className="flex items-center gap-2">
//                     <FiCalendar className="text-gray-400" />
//                     {new Date(blog.date).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric'
//                     })}
//                   </span>
//                 </div>
//               </header>

//               <div className="w-full h-96 sm:h-[500px] rounded-xl overflow-hidden shadow-lg mb-8">
//                 <img
//                   src={absoluteImageUrl}
//                   alt={blog.alt || blog.title}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   onError={e => {
//                     e.target.onerror = null;
//                     e.target.src = '/placeholder-image.jpg';
//                   }}
//                 />
//               </div>

//               <div
//                 className="prose max-w-none text-gray-800"
//                 dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//               />
//             </div>
//           </article>
//         </div>

//         {/* Sidebar */}
//         <div className="lg:w-1/3">
//           <div className="bg-gradient-to-b from-blue-800 via-blue-600 to-cyan-500 p-6 rounded-2xl shadow-2xl sticky top-6">
//             <h3 className="text-2xl font-bold text-white mb-6 text-center relative pb-4">
//               Plan Your Dream Trip
//               <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></span>
//             </h3>

//             <form onSubmit={handleTripSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="destination"
//                 placeholder="Where to?"
//                 value={tripFormData.destination}
//                 onChange={handleTripChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <input
//                 type="text"
//                 name="startDate"
//                 placeholder="Travel Dates"
//                 value={tripFormData.startDate}
//                 onChange={handleTripChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <input
//                 type="number"
//                 name="noofdays"
//                 placeholder="Duration (days)"
//                 min="1"
//                 value={tripFormData.noofdays}
//                 onChange={handleTripChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <input
//                 type="number"
//                 name="travelers"
//                 placeholder="Travelers"
//                 min="1"
//                 value={tripFormData.travelers}
//                 onChange={handleTripChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <input
//                 type="tel"
//                 name="mobileNumber"
//                 placeholder="Your Phone Number"
//                 pattern="[0-9]{10}"
//                 value={tripFormData.mobileNumber}
//                 onChange={handleTripChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                 required
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 shadow-lg"
//               >
//                 Get Custom Plan
//               </button>
//             </form>
//           </div>

//           {successMessage && (
//             <div
//               className={`mt-4 p-4 rounded-md text-white transition-opacity duration-500 ${successMessage.startsWith('Error') ? 'bg-red-500' : 'bg-blue-500'
//                 }`}
//             >
//               {successMessage}
//             </div>
//           )}
//         </div>

//       </div>

//       {/* Similar Blogs Section */}
//       <div className="mt-16">
//         <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center relative pb-4">
//           You Might Also Like
//           <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
//         </h3>

//         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {similarBlogs.map(b => (
//             <Link key={b.id} href={`/blogs/${b.id}`}>
//               <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
//                 <div className="relative pt-[56.25%] overflow-hidden">
//                   <img
//                     src={b.image}
//                     alt={b.alt || b.title}
//                     className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                     onError={e => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>

//                 <div className="p-6 flex flex-col flex-grow items-center text-center">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{b.title}</h4>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-3">{b.excerpt?.slice(0, 80)}...</p>
//                   <div className="mt-auto flex items-center justify-center text-blue-600 font-medium text-sm">
//                     Read More <FiChevronRight className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {similarBlogs.map(b => (
//             <Link key={b.id} href={`/blogs/${b.id}`}>
//               <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
//                 {/* Image container with fixed aspect ratio (16:9) */}
//                 <div className="relative pt-[56.25%] overflow-hidden">
//                   <img
//                     src={b.image}
//                     alt={b.alt || b.title}
//                     className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                     onError={e => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>

//                 {/* Content container */}
//                 <div className="p-6 flex flex-col flex-grow items-center text-center">
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{b.title}</h4>

//                   {/* ✅ Wrap paragraph in div.w-full to allow full width */}
//                   <div className="w-full">
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-left">
//                       {b.excerpt?.slice(0, 80)}...
//                     </p>
//                   </div>

//                   <div className="mt-auto flex items-center justify-center text-blue-600 font-medium text-sm">
//                     Read More <FiChevronRight className="ml-1" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//       </div>

//       {/* Sticky Contact Buttons */}
//       <div className="fixed bottom-1/2 right-0 transform translate-y-1/2 flex flex-col gap-3 z-50">
//         <a
//           href="tel:+91-7977022583"
//           className="bg-blue-600 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
//         >
//           <span>Call</span>
//         </a>
//         <a
//           href="https://wa.me/+91-7977022583"
//           className="bg-green-500 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <span>WhatsApp</span>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BlogPost;



import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FiArrowLeft, FiCalendar, FiUser, FiChevronRight, FiTag, FiList } from 'react-icons/fi';
import axios from 'axios';

let DOMPurify;

if (typeof window !== 'undefined') {
  DOMPurify = require('dompurify');
}

const API_BASE_URL = "https://desire4travels-1.onrender.com/blogs";


function getFirstTwoSentences(text) {
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, 2).join(' ').trim();
}



export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const [blogResponse, similarResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/${slug}`),
      axios.get(API_BASE_URL),
    ]);

    const blog = blogResponse.data;

    if (!blog) {
      return {
        notFound: true,
      };
    }

    const similarBlogs = similarResponse.data
      .filter(b => b.category === blog.category && String(b.id) !== String(blog.id))
      .slice(0, 3)
      .map(blog => ({
        ...blog,
        image: blog.images?.[0] || blog.image,
      }));

    return {
      props: {
        blog,
        similarBlogs,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.response?.data?.message || error.message || 'Failed to load blog',
      },
    };
  }
}

const BlogPost = ({ blog, similarBlogs = [], error }) => {
  const [tripFormData, setTripFormData] = useState({
    destination: '',
    startDate: '',
    noofdays: '',
    travelers: '',
    preference: '',
    mobileNumber: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  // Get all images (first one will be the hero image, rest will be in content)
  const allImages = blog.images?.length > 0 ? blog.images : blog.image ? [blog.image] : [];
  const heroImage = allImages[0];
  const contentImages = allImages.slice(1);

  // Function to process content and insert images at paragraph breaks
  const processContentWithImages = (content) => {
    if (!content || !contentImages.length) return content;

    const paragraphs = content.split('</p>');
    let imageIndex = 0;
    
    return paragraphs.map((paragraph, index) => {
      // Insert image after every 3 paragraphs (adjust as needed)
      if (index > 0 && index % 3 === 0 && imageIndex < contentImages.length) {
        const imageUrl = contentImages[imageIndex];
        imageIndex++;
        return `${paragraph}</p>
          <div class="my-8 mx-auto max-w-3xl">
            <div class="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src="${imageUrl}" 
                alt="Blog content image ${imageIndex}" 
                class="w-full h-auto object-cover"
                loading="lazy"
                onerror="this.onerror=null;this.src='/placeholder-image.jpg'"
              />
            </div>
          </div>`;
      }
      return `${paragraph}</p>`;
    }).join('');
  };

  const processedContent = DOMPurify ? 
    DOMPurify.sanitize(processContentWithImages(blog.content)) : 
    processContentWithImages(blog.content);

  const handleTripChange = (e) => {
    const { name, value } = e.target;
    setTripFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTripSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://desire4travels-1.onrender.com/api/plan-trip', tripFormData);
      setSuccessMessage('Trip planned successfully! We will contact you shortly.');
      setTripFormData({
        destination: '',
        startDate: '',
        noofdays: '',
        travelers: '',
        preference: '',
        mobileNumber: ''
      });
    } catch (err) {
      setSuccessMessage(`Error: ${err.response?.data?.message || 'Failed to submit trip plan'}`);
    }

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 max-w-4xl mx-auto">
        <Head>
          <title>Error | Desire4Travel</title>
        </Head>
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">!</div>
        <h3 className="text-2xl font-bold mb-2">Error Loading Content</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link href="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-1">
          <FiArrowLeft /> Back to Blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 max-w-4xl mx-auto">
        <Head>
          <title>Not Found | Desire4Travel</title>
        </Head>
        <h3 className="text-2xl font-bold mb-2">Blog Post Not Found</h3>
        <p className="text-gray-600 mb-6">The requested blog post doesn't exist or may have been removed.</p>
        <Link href="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-1">
          <FiArrowLeft /> Browse All Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
  <title>{blog.title} | Desire4Travelss</title>

  <meta
    name="description"
    content={getFirstTwoSentences(blog.excerpt?.replace(/<[^>]+>/g, '') || '')}
/>

  <meta name="keywords" content={blog.metaKeywords || blog.category || blog.title} />
  <meta name="author" content={blog.author || 'Desire4Travels'} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={blog.title} />
  <meta
    property="og:description"
    content={getFirstTwoSentences(blog.excerpt?.replace(/<[^>]+>/g, '') || '')}
/>
  {heroImage && <meta property="og:image" content={heroImage} />}
</Head>


      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Blog Content */}
        <div className="lg:w-2/3">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>

            <div className="p-6 sm:p-8">
              <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative pb-4">
                  {blog.title}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <FiUser className="text-gray-400" /> {blog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiCalendar className="text-gray-400" />
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {/* <span className="flex items-center gap-2">
                    <FiTag className="text-gray-400" /> {blog.category}
                  </span> */}
                </div>
              </header>

              {/* Hero Image */}
              {heroImage && (
                <div className="w-full h-80 sm:h-[30rem] rounded-xl overflow-hidden shadow-lg mb-8 relative">
                  <img
                    src={heroImage}
                    alt={blog.alt || blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              )}

              {/* Processed Content with Inline Images */}
              <div
                className="prose prose-lg max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </article>

          {/* Author Bio Section */}
          {/* <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="/default-avatar.jpg" 
                  alt={blog.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">{blog.author}</h4>
                <p className="text-gray-600 text-sm">Travel Writer & Explorer</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              {blog.author} is a passionate traveler who loves sharing authentic experiences and hidden gems from around the world.
            </p>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Trip Planning Form */}
          <div className="bg-gradient-to-b from-blue-800 via-blue-600 to-cyan-500 p-6 rounded-2xl shadow-2xl sticky top-6">
            <h3 className="text-2xl font-bold text-white mb-6 text-center relative pb-4">
              Plan Your Dream Trip
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></span>
            </h3>

            <form onSubmit={handleTripSubmit} className="space-y-4">
              <input
                type="text"
                name="destination"
                placeholder="Where to?"
                value={tripFormData.destination}
                onChange={handleTripChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <input
                type="text"
                name="startDate"
                placeholder="Travel Dates"
                value={tripFormData.startDate}
                onChange={handleTripChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <input
                type="number"
                name="noofdays"
                placeholder="Duration (days)"
                min="1"
                value={tripFormData.noofdays}
                onChange={handleTripChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <input
                type="number"
                name="travelers"
                placeholder="Travelers"
                min="1"
                value={tripFormData.travelers}
                onChange={handleTripChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <input
                type="tel"
                name="mobileNumber"
                placeholder="Your Phone Number"
                pattern="[0-9]{10}"
                value={tripFormData.mobileNumber}
                onChange={handleTripChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 shadow-lg"
              >
                Get Custom Plan
              </button>
            </form>

            {successMessage && (
              <div
                className={`mt-4 p-4 rounded-md text-white transition-opacity duration-500 ${successMessage.startsWith('Error') ? 'bg-red-500' : 'bg-green-500'
                  }`}
              >
                {successMessage}
              </div>
            )}
          </div>

          {/* Table of Contents */}
          {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiList className="text-blue-600" /> Table of Contents
            </h3>
            <ul className="space-y-2">
              {blog.content.match(/<h[2-3][^>]*>.*?<\/h[2-3]>/g)?.map((heading, i) => {
                const text = heading.replace(/<[^>]+>/g, '');
                const level = heading.startsWith('<h2') ? 2 : 3;
                return (
                  <li key={i} className={level === 3 ? 'ml-4' : ''}>
                    <a 
                      href={`#heading-${i}`} 
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div> */}

          {/* Popular Tags */}
          {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiTag className="text-blue-600" /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Adventure', 'Culture', 'Food', 'Budget', 'Luxury', 'Beach', 'Mountain', 'Family'].map(tag => (
                <a 
                  key={tag} 
                  href={`/blogs?tag=${tag.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-full text-sm transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* Similar Blogs Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center relative pb-4">
          You Might Also Like
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarBlogs.map((b, index) => (
            <Link key={b.id} href={`/blogs/${b.slug || b.id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
                <div className="relative pt-[56.25%] overflow-hidden">
                  <img
                    src={b.images?.[0] || b.image}
                    alt={b.alt || b.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {b.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{b.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{b.excerpt?.replace(/<[^>]+>/g, '').slice(0, 120)}...</p>
                  <div className="mt-auto flex items-center text-blue-600 font-medium text-sm">
                    Read More <FiChevronRight className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sticky Contact Buttons */}
      <div className="fixed bottom-1/2 right-0 transform translate-y-1/2 flex flex-col gap-3 z-50">
        <a
          href="tel:+91-7977022583"
          className="bg-blue-600 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
        >
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/+91-7977022583"
          className="bg-green-500 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default BlogPost;