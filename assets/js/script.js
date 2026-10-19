(() => {
    // =========================================================================
    // Thème Sombre / Clair (Sans scintillement / Anti-FOUC)
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    function getPreferredTheme() {
        return localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'ph ph-sun text-2xl' : 'ph ph-moon text-2xl';
            }
        }
    }

    // Initialisation immédiate de l'icône
    applyTheme(getPreferredTheme());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = htmlElement.getAttribute('data-theme') || 'dark';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // =========================================================================
    // Navbar Dynamique au Scroll (Ultra-léger, passif, 0 lag)
    // =========================================================================
    const navBar = document.querySelector('.clean-nav');
    if (navBar) {
        const handleScroll = () => {
            if (window.scrollY > 25) {
                navBar.classList.add('nav-scrolled');
            } else {
                navBar.classList.remove('nav-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // =========================================================================
    // Menu Mobile Accessible
    // =========================================================================
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    function toggleMobileMenu(forceClose = false) {
        if (!mobileMenu) return;
        const willOpen = forceClose ? false : !mobileMenu.classList.contains('nav-active');
        mobileMenu.classList.toggle('nav-active', willOpen);
        if (mobileOverlay) mobileOverlay.classList.toggle('active', willOpen);
        if (burgerBtn) {
            burgerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            const icon = burgerBtn.querySelector('i');
            if (icon) icon.className = willOpen ? 'ph ph-x text-2xl' : 'ph ph-list text-2xl';
        }
    }

    if (burgerBtn) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.addEventListener('click', () => toggleMobileMenu());
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => toggleMobileMenu(true));
    }
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(true));
    });

    // =========================================================================
    // Modale de Contact avec focus auto
    // =========================================================================
    const contactModal = document.getElementById('contact-modal');
    const openModalBtn = document.getElementById('open-contact-modal');
    const closeModalBtn = document.getElementById('close-contact-modal');

    function openModal() {
        if (!contactModal) return;
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const firstInput = contactModal.querySelector('input[name="name"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }

    function closeModal() {
        if (!contactModal) return;
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
        if (openModalBtn) openModalBtn.focus();
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
})();
