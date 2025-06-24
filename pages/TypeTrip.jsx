import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './TypeTrip.module.css';
import Mountain from '../public/assets/Mountain.webp';
import Beach from '../public/assets/Beach.webp';
import Religious from '../public/assets/Religious.webp';
import Treks from '../public/assets/Treks.webp';
import Offbeat from '../public/assets/Offbeat.webp';
import Other from '../public/assets/Other.webp';
import Desert from '../public/assets/Desert.jpg';
import Cityscape from '../public/assets/Cityscape.jpg';

const types = [
  { name: 'Mountain', image: Mountain },
  { name: 'Beach', image: Beach },
  { name: 'Religious', image: Religious },
  { name: 'Treks', image: Treks },
  { name: 'Offbeat', image: Offbeat },
  { name: 'Desert', image: Desert },
  { name: 'Cityscape ', image: Cityscape },
  { name: 'Other', image: Other }
];

const TypeTrip = () => {
  return (
    <div className={styles.typetrip}>
      {/* <Head>
        <title>Trip Types | Desire4Travels</title>
        <meta name="description" content="Explore various types of trips like mountain, beach, religious, and more to plan your next adventure." />
        <meta name="keywords" content="trip types, mountain, beach, religious, treks, offbeat, other travel" />
        <meta name="author" content="Desire4Travels" />
        <meta property="og:title" content="Explore Different Types of Trips" />
        <meta property="og:description" content="Browse through a wide range of trip types to find your perfect getaway." />
      </Head> */}

      <Head>
        {/* ✅ Safe for sections inside pages */}

        {/* Semantic/Custom meta for analytics or structured context */}
        <meta name="d4t:component" content="TypeTrip" />
        <meta name="d4t:triptypes" content="mountain, beach, religious, treks, offbeat, other" />

        {/* Author (optional, safe) */}
        <meta name="author" content="Desire4Travels" />

        {/* Open Graph (non-conflicting if no title/desc) */}
        <meta property="og:section" content="Trip Types" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/Mountain.webp" />
        <meta property="og:site_name" content="Desire4Travels" />
      </Head>


      <h2 className={styles.h1}>Type of Trips</h2>
      <div className={styles.typetripBox}>
        {types.map((type) => (
          <Link key={type.name} href={`/triptype/${type.name.toLowerCase()}`} legacyBehavior>
            <a className={styles.typetripcard}>
              <img src={type.image.src} alt={type.name} className={styles.logo} />
              <h3><b>{type.name.toUpperCase()}</b></h3>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TypeTrip;
