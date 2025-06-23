import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";  // <-- import Head
import Script from "next/script";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Popup from "./PopUp.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Tawk from "../components/Tawk.jsx";

import '../styles/globals.css';
import '../styles/index.css';
import '../styles/App.css';
import '../styles/Contact.css';
import '../styles/Destination.css';
import '../styles/Navbar.css';
import '../styles/Footer.css';
import '../styles/Package.css';
import '../styles/PackageCard.css';
import '../styles/DestinationCard.css';
import '../styles/Hero.css';
import '../styles/Aboutus.css';
import '../styles/CareerPage.css';
import '../styles/Review.css';
import '../styles/Faq.css';
import '../styles/TermsandConditions.css';
import '../styles/BlogList.css';
import '../styles/BlogPost.css';
import '../styles/TripTypePage.css';
import '../styles/DestinationDetails.css';
import '../styles/PackageDetails.css';
import '../styles/SuccessPopup.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const excludedPaths = ["/login", "/signup"];

  useEffect(() => {
    setIsPopupVisible(true);
  }, [router.pathname]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag && window.gtag('config', 'G-ZNNNDLWS6B', {
        page_path: url,
      });
    };// This will track page views with Google Analytics

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const blurClass = isPopupVisible ? "blurred" : "";

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZNNNDLWS6B"></Script>
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZNNNDLWS6B'); 
          `}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Desire4travels | Best Tours and Holiday Packages | Plan your trip with us</title>
        <meta name="description" content="Plan your perfect getaway with travel guides, tips, and stories from around the globe. Journey begins at Desire4Travels." />
        <meta name="keywords" content="Desire4travels, destination tips, adventure travel, solo travel, family travel, vacation planning, world travel, India travel, Travel packages, Trekking packages, travel agency, personalized travel planning, tailor-made itineraries, 24/7 travel support, D4t" />

      </Head>

      <div className="app-container">
        <ScrollToTop />
        {!excludedPaths.includes(router.pathname) && isPopupVisible && (
          <Popup onClose={() => setIsPopupVisible(false)} />
        )}
        <Navbar />
        <div className={`app-content ${blurClass}`}>
          <Component {...pageProps} />
        </div>
        {/* <Tawk /> */}
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
