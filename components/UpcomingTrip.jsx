import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/UpcomingTrip.module.css";

const UpcomingTrip = () => {
  const [trips, setTrips] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, packageRes] = await Promise.all([
          fetch("https://desire4travels-1.onrender.com/api/upcoming-trips"),
          fetch("https://desire4travels-1.onrender.com/api/packages/"),
        ]);

        const tripData = await tripRes.json();
        const packageData = await packageRes.json();

        const enrichedTrips = tripData.map((trip) => {
          const matchedPackage = packageData.find(
            (pkg) => decodeHtml(pkg.packageName) === decodeHtml(trip.tripName)
          );
          return {
            ...trip,
            packageDetails: matchedPackage || null,
          };
        });

        setTrips(enrichedTrips);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

    // Helper to create slug from package name
  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }


  return (
    <div className={styles["trip-container"]}>
      <h2 className={styles["trip-title"]}>🌍 Upcoming Trips</h2>

      {trips.length > 0 ? (
        <div
          className={styles["trip-grid"]}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            justifyItems: "center",
          }}
        >
                {trips.map((trip, idx) => {
            const packageName = trip.packageDetails?.packageName || trip.tripName;
            const slug = createSlug(packageName);

            return (
              <div
                className={styles["trip-card"]}
                key={idx}
                style={{ cursor: trip.packageDetails ? "pointer" : "default" }}
                onClick={() => {
                  if (trip.packageDetails) {
                    router.push(`/package/${slug}`);
                  }
                }}
              >
                {trip.packageDetails?.photo && (
                  <img
                    src={trip.packageDetails.photo}
                    alt={trip.tripName}
                    className={styles["trip-image"]}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <div className={styles["trip-content"]}>
                  <h3 className={styles["trip-name"]}>
                    {decodeHtml(trip.tripName)}
                  </h3>
                  {trip.travelDate && (
                    <p className={styles["trip-date"]}>
                      <strong>
                        {new Date(trip.travelDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </strong>
                    </p>
                  )}
                  {trip.packageDetails?.price && (
                    <p className={styles["trip-price"]}>
                      ₹{trip.packageDetails.price}
                    </p>
                  )}
                  {trip.packageDetails?.duration && (
                    <p className={styles["trip-duration"]}>
                      {trip.packageDetails.duration}
                    </p>
                  )}
                </div>
                {!trip.packageDetails && (
                  <div className={styles["trip-date"]}>
                    Package details not available
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles["no-trips-message"]}>
          No upcoming trips available.
        </p>
      )}
    </div>
  );
};

export default UpcomingTrip;
