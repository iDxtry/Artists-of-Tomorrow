(function () {
    'use strict';

    const COOKIE_CONSENT_KEY = 'cookieConsentStatus';
    const LEGACY_CONSENT_KEY = 'privacyAccepted';

    const createElement = (tagName, options = {}) => {
        const element = document.createElement(tagName);
        const { className, text, attributes } = options;

        if (className) {
            element.className = className;
        }

        if (text) {
            element.textContent = text;
        }

        if (attributes) {
            Object.entries(attributes).forEach(([name, value]) => {
                element.setAttribute(name, value);
            });
        }

        return element;
    };

    document.addEventListener('DOMContentLoaded', () => {
        try {
            const legacyValue = localStorage.getItem(LEGACY_CONSENT_KEY);
            const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

            if (legacyValue && !storedConsent) {
                localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
            }

            if (legacyValue) {
                localStorage.removeItem(LEGACY_CONSENT_KEY);
            }

            if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
                return;
            }
        } catch (error) {
            return;
        }

        const banner = createElement('div', {
            className: 'cookie-consent',
            attributes: {
                role: 'dialog',
                'aria-live': 'polite',
                'aria-label': 'Cookie consent notice'
            }
        });

        const container = createElement('div', { className: 'cookie-consent__container' });
        const icon = createElement('div', {
            className: 'cookie-consent__icon',
            text: '🍪',
            attributes: { 'aria-hidden': 'true' }
        });
        const content = createElement('div', { className: 'cookie-consent__content' });
        const title = createElement('h2', {
            className: 'cookie-consent__title',
            text: 'Your privacy matters'
        });
        const description = createElement('p', { className: 'cookie-consent__description' });
        const policyLink = createElement('a', {
            text: 'privacy policy',
            attributes: { href: 'privacy.html' }
        });
        const actions = createElement('div', { className: 'cookie-consent__actions' });
        const declineButton = createElement('button', {
            className: 'cookie-consent__button cookie-consent__button--secondary',
            text: 'Decline',
            attributes: {
                type: 'button',
                'data-consent': 'decline'
            }
        });
        const acceptButton = createElement('button', {
            className: 'cookie-consent__button cookie-consent__button--primary',
            text: 'Accept all',
            attributes: {
                type: 'button',
                'data-consent': 'accept'
            }
        });

        description.append(
            'We use cookies and similar technologies to understand how our site is used and to improve your experience. Learn more in our ',
            policyLink,
            '.'
        );
        content.append(title, description);
        actions.append(declineButton, acceptButton);
        container.append(icon, content, actions);
        banner.append(container);

        document.body.appendChild(banner);
        requestAnimationFrame(() => {
            banner.classList.add('cookie-consent--visible');
        });

        const removeBanner = () => {
            if (banner.isConnected) {
                banner.remove();
            }
        };

        const handleChoice = (status) => {
            try {
                localStorage.setItem(COOKIE_CONSENT_KEY, status);
            } catch (error) {
                return;
            }

            window.dispatchEvent(new CustomEvent('aot:cookie-consent-updated', {
                detail: { status }
            }));

            banner.classList.remove('cookie-consent--visible');
            banner.classList.add('cookie-consent--hidden');

            banner.addEventListener('transitionend', removeBanner, { once: true });

            setTimeout(() => {
                if (banner.isConnected) {
                    removeBanner();
                }
            }, 600);
        };

        acceptButton.addEventListener('click', () => handleChoice('accepted'));
        declineButton.addEventListener('click', () => handleChoice('declined'));

        banner.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                handleChoice('declined');
            }
        });

        setTimeout(() => {
            try {
                acceptButton.focus({ preventScroll: true });
            } catch (error) {
                acceptButton.focus();
            }
        }, 120);
    });
}());
