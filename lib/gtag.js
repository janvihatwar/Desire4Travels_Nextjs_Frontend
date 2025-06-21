// For google analytics tracking

export const GA_TRACKING_ID = 'G-ZNNNDLWS6B';

// Track a page view (used during route changes)
export const pageview = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Track custom events
export const event = ({ action, params }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, params);
    }
};
