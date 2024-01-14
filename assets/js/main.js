(function () {
    'use strict';

    // ======= Sticky
    window.onscroll = function () {
        const ud_header = document.querySelector('.ud-header');
        const sticky = ud_header.offsetTop;
        const logo = document.querySelectorAll('.header-logo');

        if (window.pageYOffset > sticky) {
            ud_header.classList.add('sticky');
        } else {
            ud_header.classList.remove('sticky');
        }

        if (logo.length) {
            document.querySelector('.header-logo').src = ud_header.classList.contains('sticky')
                ? 'assets/images/logo/logo.svg'
                : 'assets/images/logo/logo-white.svg';
        }

        if (
            document.documentElement.classList.contains('dark') &&
            logo.length &&
            ud_header.classList.contains('sticky')
        ) {
            document.querySelector('.header-logo').src = 'assets/images/logo/logo-white.svg';
        }

        // show or hide the back-top-top button
        const backToTop = document.querySelector('.back-to-top');
        backToTop.style.display =
            document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ? 'flex' : 'none';
    };

    // ===== responsive navbar
    let navbarToggler = document.querySelector('#navbarToggler');
    const navbarCollapse = document.querySelector('#navbarCollapse');

    navbarToggler?.addEventListener('click', () => {
        navbarToggler.classList.toggle('navbarTogglerActive');
        navbarCollapse.classList.toggle('hidden');
    });

    //===== close navbar-collapse when a  clicked
    document.querySelectorAll('#navbarCollapse ul li:not(.submenu-item) a').forEach((e) =>
        e.addEventListener('click', () => {
            navbarToggler.classList.remove('navbarTogglerActive');
            navbarCollapse.classList.add('hidden');
        })
    );

    // ===== Sub-menu
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach((el) => {
        el.querySelector('a').addEventListener('click', () => {
            el.querySelector('.submenu').classList.toggle('hidden');
        });
    });

    // ===== Faq accordion
    const faqs = document.querySelectorAll('.single-faq');
    faqs.forEach((el) => {
        el.querySelector('.faq-btn').addEventListener('click', () => {
            el.querySelector('.icon').classList.toggle('rotate-180');
            el.querySelector('.faq-content').classList.toggle('hidden');
        });
    });

    // ====== scroll top js
    function scrollTo(element, to = 0, duration = 500) {
        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    document.querySelector('.back-to-top').onclick = () => {
        scrollTo(document.documentElement);
    };

    /* ========  themeSwitcher start ========= */
    const themeSwitcher = document.getElementById('themeSwitcher');
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeCheck = () => {
        if (userTheme === 'dark' || (!userTheme && systemTheme)) {
            document.documentElement.classList.add('dark');
            return;
        }
    };

    // Manual Theme Switch
    const themeSwitch = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            return;
        }

        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    };

    // call theme switch on clicking buttons
    themeSwitcher?.addEventListener('click', () => themeSwitch());
    themeCheck();

    /* ========  themeSwitcher End ========= */

    // ==== for menu scroll
    const pageLink = document.querySelectorAll('.ud-menu-scroll');

    pageLink.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // section menu active
    function onScroll(event) {
        const sections = document.querySelectorAll('.ud-menu-scroll');
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        for (let i = 0; i < sections.length; i++) {
            const currLink = sections[i];
            const val = currLink.getAttribute('href');
            const refElement = document.querySelector(val);
            const scrollTopMinus = scrollPos + 73;
            if (
                refElement.offsetTop <= scrollTopMinus &&
                refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
            ) {
                document.querySelector('.ud-menu-scroll').classList.remove('active');
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        }
    }

    window.document.addEventListener('scroll', onScroll);
})();
