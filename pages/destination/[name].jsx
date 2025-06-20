import React, { useState } from 'react';
import PackageCard from '../../components/PackageCard';

function normalizeDestination(dest) {
  if (!dest) return '';
  const parts = dest.split('-').map(p => p.trim());
  while (
    parts.length > 1 &&
    parts[parts.length - 1].toLowerCase() === parts[parts.length - 2].toLowerCase()
  ) {
    parts.pop();
  }
  return parts.join(' - ');
}

function stripState(dest) {
  if (!dest) return '';
  return dest.split('-')[0].trim();
}

function isLongDescription(desc) {
  return desc && desc.length > 250;
}

export async function getServerSideProps(context) {
  const { name } = context.params;

  try {
    const destRes = await fetch('https://desire4travels-1.onrender.com/api/admin/destinations');
    if (!destRes.ok) {
      throw new Error('Failed to fetch destination details');
    }
    const allDestinations = await destRes.json();

    const normalizedName = normalizeDestination(name).toLowerCase();

    const destinationInfo = allDestinations.find(dest => {
      if (!dest.name) return false;
      return normalizeDestination(dest.name).toLowerCase() === normalizedName;
    }) || null;

    const pkgRes = await fetch('https://desire4travels-1.onrender.com/api/packages');
    if (!pkgRes.ok) {
      throw new Error('Failed to fetch packages');
    }
    const allPackages = await pkgRes.json();

    const packages = allPackages.filter(pkg => {
      if (!Array.isArray(pkg.destinations)) return false;

      return pkg.destinations.some(dest => {
        const normalizedDest = normalizeDestination(dest).toLowerCase();
        return normalizedDest.includes(normalizedName) || normalizedName.includes(normalizedDest);
      });
    });

    if (!destinationInfo) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        destinationInfo,
        packages,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

const DestinationDetail = ({ destinationInfo, packages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const destinationName = stripState(normalizeDestination(destinationInfo.name));

  return (
    <div className="destination-detail-page">
      <div className="destination-info">
        <img
          src={destinationInfo.image}
          alt={destinationInfo.name}
          className="destination-image destination-image-desktop"
          style={{ height: '360px', marginBottom: '0' }}
        />
        <div className="destination-description">
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px', marginTop: '-15px' }}>{destinationInfo.name}</h1>
          <div
            className={`destination-description-text ${isExpanded ? 'expanded' : 'collapsed'}`}
            dangerouslySetInnerHTML={{
              __html: destinationInfo.description || 'No description available.',
            }}
          />
          {isLongDescription(destinationInfo.description) && (
            <button className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>

      <h2 className="packages-heading">Packages for {destinationName}</h2>

      <div className="package-grid">
        {packages.length > 0 ? (
          packages.map(pkg => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              imgSrc={pkg.photo}
              packageName={pkg.packageName}
              destinations={pkg.destinations.map(stripState)}
              price={pkg.price}
              duration={pkg.duration}
            />
          ))
        ) : (
          <p>No packages found for this destination.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;
