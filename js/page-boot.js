(function () {
    'use strict';

    document.documentElement.classList.add('js-loading');
    window.addEventListener('load', function () {
        document.documentElement.classList.remove('js-loading');
    });
}());
