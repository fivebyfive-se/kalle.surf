(() => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.site-header__button');
    const toggleMenu = (force=undefined) => header.classList.toggle('site-header--show-menu', force);

    document.querySelectorAll('a.nav__item, a.scroll-link').forEach((navItem) => {
        navItem.addEventListener('click', (ev) => {
            const href = ev.target.href || ev.target.parentNode.href;
            if (href && href.indexOf('#') >= 0) {
                ev.preventDefault();
                const targetSelector = href.replace(/^.*#(\w+)$/, '$1')
                const target = document.getElementById(targetSelector);
                target.scrollIntoView({ behavior: 'smooth' });
                toggleMenu(false);
            }
        });
    });

    menuButton.addEventListener('click', () => toggleMenu());
})();

(() => {
    const initFade = () => {
        const downButton = document.querySelector('.down-button--hidden');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const { target } = entry;
                    if (target.classList.contains('fade-in')) {
                        target.classList.add('fade-in--visible');
                        if (target.classList.contains('sprd-header')) {
                            downButton.classList.add('down-button--hidden');
                        }
                    } else if (target.classList.contains('about') || target.classList.contains('site-footer')) {
                        document.querySelectorAll('.sprd-header').forEach((s) => s.classList.remove('fade-in--visible'));
                        if (target.classList.contains('about')) {
                            downButton.classList.remove('down-button--hidden');
                        }
                    }
                }
            });
        }, { threshold: [ .75 ] });
        

        document.querySelectorAll('section.about, .fade-in, .site-footer').forEach((el) => observer.observe(el));    
        downButton.classList.remove('down-button--hidden');
    };

    const waitForSpreadshirt = () => {
        const sprd = document.getElementById('sprd-content') && document.querySelector('.sprd-listpage');
        if (!sprd) {
            setTimeout(waitForSpreadshirt, 250);
        } else {
            document.querySelectorAll('.sprd__headline, .sprd-header, #sprd-main svg, .sprd-info-footer, .sprd-service-footer, .sprd-info-footer__open-shop')
                .forEach((sp) => {
                    sp.classList.add('fade-in');
                });
            document.getElementById('spreadshop').classList.remove('fade-in');
            initFade();
        }
    }; 

    setTimeout(waitForSpreadshirt, 250);
})();