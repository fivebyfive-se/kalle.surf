(() => {
    document.querySelectorAll('a.nav__item').forEach((navItem) => {
        navItem.addEventListener('click', (ev) => {
            const href = ev.target.href || ev.target.parentNode.href;
            if (href && href.indexOf('#') >= 0) {
                ev.preventDefault();
                const targetSelector = href.replace(/^.*#(\w+)$/, '$1')
                const target = document.getElementById(targetSelector);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    })
})();