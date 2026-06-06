(function () {
    'use strict';

    var COOKIE_CONSENT_KEY = 'cookieConsentStatus';
    var GOOGLE_ANALYTICS_ID = 'G-K8P4HJ9KY3';
    var CLARITY_ID = 'scsvrz0zyk';
    var analyticsLoaded = false;

    function hasAnalyticsConsent() {
        try {
            return window.localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
        } catch (error) {
            return false;
        }
    }

    function appendScript(src) {
        var script = document.createElement('script');
        script.async = true;
        script.src = src;
        document.head.appendChild(script);
        return script;
    }

    function loadGoogleAnalytics() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        appendScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GOOGLE_ANALYTICS_ID));
        window.gtag('js', new Date());
        window.gtag('config', GOOGLE_ANALYTICS_ID);
    }

    function loadClarity() {
        window.clarity = window.clarity || function () {
            (window.clarity.q = window.clarity.q || []).push(arguments);
        };

        appendScript('https://www.clarity.ms/tag/' + encodeURIComponent(CLARITY_ID));
    }

    function loadAnalyticsIfConsented() {
        if (analyticsLoaded || !hasAnalyticsConsent()) {
            return;
        }

        analyticsLoaded = true;
        loadGoogleAnalytics();
        loadClarity();
    }

    document.addEventListener('DOMContentLoaded', loadAnalyticsIfConsented);
    window.addEventListener('aot:cookie-consent-updated', loadAnalyticsIfConsented);
}());
