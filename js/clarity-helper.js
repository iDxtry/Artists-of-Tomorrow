/**
 * Artists of Tomorrow - Clarity/Font Helper
 * Narrows Clarity font-blocking to known Clarity-injected Microsoft font URLs.
 */
(function () {
    'use strict';

    const CLARITY_HOST_PATTERN = /(^|\.)clarity\.ms$/i;
    const BLOCKED_FONT_PATTERNS = ['fabric-icons', 'segoeui', 'leelawadeeui'];

    const style = document.createElement('style');
    style.textContent = `
        @font-face { font-family: 'Segoe UI'; src: local('Segoe UI'); font-weight: normal; font-style: normal; }
        @font-face { font-family: 'Segoe UI'; src: local('Segoe UI Bold'); font-weight: bold; font-style: normal; }
        @font-face { font-family: 'Segoe UI'; src: local('Segoe UI Light'); font-weight: 300; font-style: normal; }
        @font-face { font-family: 'Segoe UI'; src: local('Segoe UI Semibold'); font-weight: 600; font-style: normal; }
        @font-face { font-family: 'Leelawadee UI'; src: local('Leelawadee UI'); font-weight: normal; font-style: normal; }
        @font-face { font-family: 'Leelawadee UI'; src: local('Leelawadee UI Bold'); font-weight: bold; font-style: normal; }
        @font-face { font-family: 'FabricMDL2Icons'; src: local('FabricMDL2Icons'); font-weight: normal; font-style: normal; }
    `;
    document.head.appendChild(style);

    function shouldBlockFontLink(link) {
        if (!link || !link.href) {
            return false;
        }

        try {
            const url = new URL(link.href, window.location.href);
            const path = url.pathname.toLowerCase();
            const hostIsClarity = CLARITY_HOST_PATTERN.test(url.hostname);
            return hostIsClarity && BLOCKED_FONT_PATTERNS.some(pattern => path.includes(pattern));
        } catch (error) {
            return false;
        }
    }

    function blockFontLink(link) {
        if (!shouldBlockFontLink(link)) {
            return;
        }

        if (link.parentNode) {
            link.parentNode.removeChild(link);
        } else {
            link.href = '';
        }
    }

    document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]').forEach(blockFontLink);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'LINK') {
                    blockFontLink(node);
                }
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.setTimeout(() => observer.disconnect(), 10000);
}());
