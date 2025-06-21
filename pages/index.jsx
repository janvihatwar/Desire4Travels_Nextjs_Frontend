import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import TopDestination from './TopDestination';
import TypeTrip from './TypeTrip';
import Review from './reviews';
import PlanTrip from './PlanTrip';
import WhyChooseUs from '../components/WhyChooseUs';

import { pageview, event as gtagEvent } from '../lib/gtag'; //google analytics tracking

export default function Home({ heroData }) {
  const [heroCount, setHeroCount] = useState(0);
  const planTripRef = useRef(null);

  useEffect(() => {
    if (!heroData || heroData.length === 0) return;

    //GA pageview
    if (typeof window !== 'undefined') {
      pageview(window.location.pathname);
    }

    const interval = setInterval(() => {
      setHeroCount((prevCount) => {
        const nextCount = prevCount === heroData.length - 1 ? 0 : prevCount + 1;

        //Fire GA custom event
        gtagEvent({
          action: 'hero_slide_viewed',
          params: {
            destination: heroData[nextCount].text1,
          },
        });

        return nextCount;
      });
    }, 10000);


    return () => clearInterval(interval);
  }, [heroData]);

  return (
    <>
      <Head>
        {/* <title>Travel Management</title> */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Desire4travels | Best Tours and Holiday Packages | Plan your trip with us</title>
        <meta name="description" content="Plan your perfect getaway with travel guides, tips, and stories from around the globe. Journey begins at Desire4Travels." />
        <meta name="keywords" content="Desire4travels, destination tips, adventure travel, solo travel, family travel, vacation planning, world travel, India travel, Travel packages, Trekking packages, travel agency, personalized travel planning, tailor-made itineraries, 24/7 travel support, D4t" />

      </Head>

      {heroData && heroData.length > 0 && (
        <Hero
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          planTripRef={planTripRef}
        />
      )}
      <TopDestination />
      <TypeTrip />
      <Review />
      <div ref={planTripRef}>
        <PlanTrip />
      </div>
      <WhyChooseUs />
    </>
  );
}

export async function getServerSideProps() {
  const heroData = [
    {
      text1: 'Manali, Himachal Pradesh',
      text2:
        'Manali offers snow, adventure, scenic beauty, skiing, trekking, paragliding, mountain views, local cuisine, and serene valleys and beautiful landscapes.',
    },
    {
      text1: 'Munnar, Kerala',
      text2:
        'Munnar, a picturesque hill station in Kerala, offers tea plantations, misty mountains, wildlife, and serene landscapes for a peaceful escape.',
    },
    {
      text1: 'Rishikesh, Uttarakhand',
      text2:
        'Rishikesh, the Yoga Capital of the World, offers serene ashrams, yoga retreats, and adventure sports like rafting, set along the Ganges River.',
    },
  ];

  return {
    props: {
      heroData,
    },
  };
}
