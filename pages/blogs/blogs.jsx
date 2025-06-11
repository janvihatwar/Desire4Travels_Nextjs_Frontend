// import { useState, useEffect, useMemo } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// const API_BASE_URL = "https://desire4travels-1.onrender.com/blogs";
// const API_FEEDBACK_URL = "https://desire4travels-1.onrender.com/blog-feedback";

// export async function getServerSideProps() {
//   try {
//     const response = await axios.get(API_BASE_URL);
//     const data = response.data;

//     const blogsWithAbsoluteUrls = data.map(blog => ({
//       ...blog,
//       image: blog.image && (blog.image.startsWith('http') ? blog.image : `${API_BASE_URL.replace('/blogs', '')}${blog.image}`)
//     }));

//     return {
//       props: {
//         initialBlogs: blogsWithAbsoluteUrls
//       }
//     };
//   } catch (error) {
//     return {
//       props: {
//         initialBlogs: [],
//         error: error.response?.data?.message || error.message || 'Failed to fetch blogs'
//       }
//     };
//   }
// }

// const BlogList = ({ initialBlogs, error: initialError }) => {
//   const [blogs] = useState(initialBlogs);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [blogsPerPage] = useState(6);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     number: '',
//     feedback: '',
//     yourStory: ''
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [formError, setFormError] = useState('');

//   const filteredBlogs = useMemo(() => {
//     let result = blogs;

//     if (selectedCategory !== 'all') {
//       result = result.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());
//     }

//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       result = result.filter(blog =>
//         blog.title.toLowerCase().includes(term) ||
//         blog.author.toLowerCase().includes(term) ||
//         blog.excerpt.toLowerCase().includes(term)
//       );
//     }

//     return result;
//   }, [blogs, selectedCategory, searchTerm]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filteredBlogs]);

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');
//     try {
//       await axios.post(API_FEEDBACK_URL, formData);
//       setSubmitted(true);
//     } catch (err) {
//       setFormError('Something went wrong. Please try again.');
//     }
//   };

//   const categories = ['all', ...new Set(blogs.map(blog => blog.category.toLowerCase()))];

//   if (initialError) {
//     return (
//       <div className="error-container">
//         <div className="error-icon">⚠️</div>
//         <p>Error: {initialError}</p>
//         <button onClick={() => window.location.reload()} className="retry-button" aria-label="Retry loading blogs">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="blog-list-container">
//       <header className="blog-hero">
//         <div className="hero-content">
//           <h1>Desire4Travels Stories</h1>
//           <p>Discover inspiring travel stories, expert tips, and breathtaking destinations from around the globe.</p>
//           <button className="btn-primary share" onClick={() => setIsModalOpen(true)}>
//             Share Your Story
//           </button>
//         </div>
//       </header>

//       <div className="blog-content-container">
//         <div className="search-filter-container">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="clear-search"
//                 aria-label="Clear search"
//               >
//                 ×
//               </button>
//             )}
//           </div>

//           <div className="category-filter">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="category-select"
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//               ))}
//             </select>
//             <div className="select-arrow">▼</div>
//           </div>
//         </div>

//         <div className="blog-grid">
//           {currentBlogs.length > 0 ? (
//             currentBlogs.map((blog, index) => (
//               <BlogCard key={blog.id} blog={blog} index={index} />
//             ))
//           ) : (
//             <div className="no-results">
//               <img src="/images/no-results.svg" alt="No results" className="no-results-img" />
//               <h3>No matching posts found</h3>
//               <p>Try adjusting your search or filter criteria</p>
//             </div>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="pagination-button"
//               aria-label="Previous page"
//             >
//               Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//               <button
//                 key={number}
//                 onClick={() => setCurrentPage(number)}
//                 className={`pagination-button ${currentPage === number ? 'active' : ''}`}
//                 aria-label={`Go to page ${number}`}
//               >
//                 {number}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="pagination-button"
//               aria-label="Next page"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       <div className='sticky-buttons-container'>
//         <a href="tel:+91 79770 22583" className="sticky-button" target="_blank" rel="noopener noreferrer">
//           Call
//         </a>
//         <a href="https://wa.me/1234567890" className="sticky-button" target="_blank" rel="noopener noreferrer">
//           WhatsApp
//         </a>
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">×</button>
//             <h2 className="modal-title">Share Your Story</h2>

//             {submitted ? (
//               <div className="success-box">
//                 <svg className="checkmark" viewBox="0 0 52 52">
//                   <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
//                   <path className="checkmark-check" fill="none" d="M14 27l8 8 16-16" />
//                 </svg>
//                 <p className="success-message">Thank you for your story!</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="modal-form">
//                 <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
//                 <input type="tel" name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} required />
//                 <input type="text" name="feedback" placeholder="Short Feedback" value={formData.feedback} onChange={handleChange} required />
//                 <textarea name="yourStory" placeholder="Tell us your story..." rows="5" value={formData.yourStory} onChange={handleChange} required></textarea>
//                 <button type="submit" className="submit-button" aria-label="Submit feedback">Submit</button>
//                 {formError && <p className="error-message">{formError}</p>}
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const BlogCard = ({ blog, index }) => {
//   return (
//     <div
//       className="blog-card"
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <Link href={blog.url} className="blog-link">
//         <div className="blog-image-container">
//           <img
//             src={blog.image}
//             alt={blog.alt ? blog.alt.replace(/<[^>]+>/g, '') : blog.title}
//             className="blog-image"
//             loading="lazy"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/placeholder-image.jpg';
//             }}
//           />
//           <div className="image-overlay"></div>
//           <span className="blog-category-badge">{blog.category}</span>
//         </div>
//         <div className="blog-content">
//           <div className="blog-title">{blog.title}</div>
//           <div className="blog-excerpt">{blog.excerpt}</div>
//           <div className="blog-meta">
//             <span className="blog-author">
//               <svg className="author-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//               {blog.author}
//             </span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default BlogList;


// app/blog/page.jsx (or pages/blog/index.jsx for Pages Router)
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';

const API_BASE_URL = "https://desire4travels-1.onrender.com/blogs";
const API_FEEDBACK_URL = "https://desire4travels-1.onrender.com/blog-feedback";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    feedback: '',
    yourStory: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${API_BASE_URL.replace('/blogs', '')}${url}`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        const data = response.data;

        const blogsWithAbsoluteUrls = data.map(blog => ({
          ...blog,
          image: ensureAbsoluteUrl(blog.image)
        }));

        setBlogs(blogsWithAbsoluteUrls);
        setFilteredBlogs(blogsWithAbsoluteUrls);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchBlogs();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = blogs;

    if (selectedCategory !== 'all') {
      result = result.filter(blog =>
        blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term)
      );
    }

    setFilteredBlogs(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, blogs]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const categories = ['all', ...new Set(blogs.map(blog => blog.category.toLowerCase()))];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(API_FEEDBACK_URL, formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Loading blogs...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-700 mb-4">Error: {error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-0 font-sans bg-gray-50 text-gray-800">
      <Head>
        <title>Desire4Travels Stories</title>
        <meta name="description" content="Discover inspiring travel stories, expert tips, and breathtaking destinations from around the globe." />
      </Head>

      {/* Hero Section */}
      <header
        className="w-full h-60 bg-cover bg-center flex items-center justify-center text-center text-white mb-8"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
        }}
      >
        <div className="max-w-4xl px-5">
          <h1 className="text-4xl font-semibold mb-4 text-shadow-md">Desire4Travels Stories</h1>
          <p className="text-xl mb-8 text-shadow-sm">
            Discover inspiring travel stories, expert tips, and breathtaking destinations from around the globe.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-full transition-all hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Share Your Story
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5">
        {/* Search and Filter */}
        <div className="flex justify-between flex-wrap gap-4 mb-8">
          <div className="relative flex-grow min-w-[280px] max-w-[500px]">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-full text-base bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-all"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-5 py-4 pr-10 border-2 border-gray-200 rounded-full text-base bg-white appearance-none shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="" disabled>Select a category</option>
              <option value="all">All Categories</option>
              <option value="Mountain">Mountain</option>
              <option value="Beach">Beach</option>
              <option value="Heritage">Heritage</option>
              <option value="Treks">Treks</option>
              <option value="Offbeat">Offbeat</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>
        </div>

        {/* Blog Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <img
                src="/images/no-results.svg"
                alt="No results"
                className="max-w-[200px] mx-auto mb-6 opacity-70"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching posts found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div> */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
  {currentBlogs.length > 0 ? (
    currentBlogs.map((blog, index) => (
      <BlogCard key={blog.id} blog={blog} index={index} />
    ))
  ) : (
    <div className="col-span-full text-center py-12">
      <img 
        src="/images/no-results.svg" 
        alt="No results" 
        className="max-w-[200px] mx-auto mb-6 opacity-70" 
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching posts found</h3>
      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
    </div>
  )}
</div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 my-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 border rounded-md transition-all ${currentPage === number
                    ? 'bg-red-400 border-red-400 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Sticky Contact Buttons */}
      <div className="fixed bottom-1/2 right-0 transform translate-y-1/2 flex flex-col gap-3 z-50">
        <a
          href="tel:+1234567890"
          className="bg-blue-600 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
        >
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/1234567890"
          className="bg-green-500 text-white px-4 py-2 rounded-l-lg shadow-lg flex items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-sm w-24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-xl w-full max-w-md relative animate-pop-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-2xl bg-transparent border-none cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-6 text-center">Share Your Story</h2>

            {submitted ? (
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto stroke-green-500" viewBox="0 0 52 52">
                  <circle className="stroke-2 stroke-dasharray-166 stroke-dashoffset-166 animate-stroke" cx="26" cy="26" r="25" fill="none" />
                  <path className="stroke-2 stroke-dasharray-48 stroke-dashoffset-48 animate-stroke-check" fill="none" d="M14 27l8 8 16-16" />
                </svg>
                <p className="text-green-600 text-lg mt-4">Thank you for your story!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <input
                  type="tel"
                  name="number"
                  placeholder="Phone Number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <input
                  type="text"
                  name="feedback"
                  placeholder="Short Feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <textarea
                  name="yourStory"
                  placeholder="Tell us your story..."
                  rows="5"
                  value={formData.yourStory}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                  Submit
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
function BlogCard({ blog, index }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:scale-[0.98] hover:shadow-lg transition-transform duration-300 flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link href={blog.url} className="flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full pt-[80%] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.alt || blog.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <span className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 text-xs font-bold uppercase rounded-full z-10">
            {blog.category}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow items-center text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{blog.excerpt}</p>
          
          {/* Author & Date */}
          <div className="flex justify-center items-center gap-6 text-xs text-gray-500 mt-2">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {blog.author}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
