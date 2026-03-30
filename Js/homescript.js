// ===== INITIALIZE AOS (Animate On Scroll) =====
AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
    easing: 'ease-in-out'
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== SEARCH BAR TOGGLE =====
const searchBtn = document.getElementById('searchBtn');
const mobileSearch = document.getElementById('mobileSearch');
const searchBar = document.getElementById('searchBar');
const closeSearch = document.getElementById('closeSearch');

function toggleSearchBar() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchBar.querySelector('input').focus();
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', toggleSearchBar);
}

if (mobileSearch) {
    mobileSearch.addEventListener('click', toggleSearchBar);
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });
}

// Close search bar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBar.classList.contains('active')) {
        searchBar.classList.remove('active');
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavToggles = document.querySelectorAll('.mobile-nav-toggle');

function resetMobileSubmenus() {
    document.querySelectorAll('.mobile-nav-item.open').forEach(item => {
        item.classList.remove('open');
        const toggle = item.querySelector('.mobile-nav-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    if (!mobileMenu.classList.contains('active')) {
        resetMobileSubmenus();
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

if (closeMenu) {
    closeMenu.addEventListener('click', toggleMobileMenu);
}

mobileNavToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parent = toggle.closest('.mobile-nav-item');
        const isOpen = parent?.classList.contains('open');

        document.querySelectorAll('.mobile-nav-item.open').forEach(item => {
            if (item !== parent) {
                item.classList.remove('open');
                const itemToggle = item.querySelector('.mobile-nav-toggle');
                if (itemToggle) {
                    itemToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        parent?.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        toggleMobileMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===== BARCODE CAROUSEL =====
const carousel = document.getElementById('barcodeCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
let cardsToShow = 3;
let totalCards = 10;

// Update cards to show based on screen size
function updateCardsToShow() {
    if (window.innerWidth < 576) {
        cardsToShow = 1;
    } else if (window.innerWidth < 992) {
        cardsToShow = 1;
    } else {
        cardsToShow = 3;
    }
    updateCarousel();
    createDots();
}

// Create pagination dots
function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(totalCards / cardsToShow);

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.barcode-card');
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 32; // 2rem gap
    const scrollAmount = (cardWidth + gap) * currentIndex;

    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });

    updateDots();
}

// Update active dot
function updateDots() {
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');
    const activeDotIndex = Math.floor(currentIndex / cardsToShow);

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentIndex = index * cardsToShow;
    updateCarousel();
}

// Previous button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const maxIndex = totalCards - cardsToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
}

// Initialize carousel
updateCardsToShow();
window.addEventListener('resize', updateCardsToShow);

// ===== BARCODE OPTIONS SELECTION =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-btn')) {
        // Get all options in the same group
        const card = e.target.closest('.barcode-card');
        const options = card.querySelectorAll('.option-btn');

        // Remove active from all options in this group
        options.forEach(opt => opt.classList.remove('active'));

        // Add active to clicked option
        e.target.classList.add('active');
    }
});

// ===== STUDIO VIDEO HOVER =====
const studioCards = document.querySelectorAll('.studio-card');

studioCards.forEach(card => {
    const video = card.querySelector('.studio-video');
    const media = card.querySelector('.studio-media');

    if (media && video) {
        media.addEventListener('mouseenter', () => {
            video.play().catch(err => console.log('Video play error:', err));
        });

        media.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// ===== NEWSLETTER BUTTON =====
const newsletterBtn = document.getElementById('newsletterBtn');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
        const email = prompt('Enter your email address:');
        if (email && validateEmail(email)) {
            alert('Thank you for subscribing! Check your email for your 10% discount code.');
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PRODUCT INTERACTIONS =====
// Add to Cart
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') ||
        e.target.closest('.add-to-cart')) {
        e.preventDefault();

        const button = e.target.classList.contains('add-to-cart') ?
            e.target : e.target.closest('.add-to-cart');

        // Add animation
        button.innerHTML = '<i class="bi bi-check-lg"></i> Added';
        button.style.background = 'var(--primary-color)';
        button.style.color = 'var(--white-color)';

        // Update cart count
        updateCartCount();

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
});

// Buy Now
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy-now') ||
        e.target.closest('.buy-now')) {
        e.preventDefault();
        alert('Proceeding to checkout...');
    }
});

// Update cart count
function updateCartCount() {
    const badges = document.querySelectorAll('.badge-count');
    badges.forEach(badge => {
        const currentCount = parseInt(badge.textContent);
        badge.textContent = currentCount + 1;

        // Add pulse animation
        badge.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            badge.style.animation = '';
        }, 500);
    });
}

// ===== SMOOTH SCROLL SECTIONS =====
// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== SCROLL SNAP BEHAVIOR =====
let isScrolling = false;
let scrollTimeout;

// Disable scroll snap on mobile
if (window.innerWidth > 768) {
    window.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            isScrolling = true;

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: true });
}

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');

    if (hero && scrolled < window.innerHeight) {
        const perfumes = document.querySelectorAll('.hero-perfume');
        perfumes.forEach((perfume, index) => {
            const speed = (index + 1) * 0.5;
            perfume.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===== DROPDOWN HOVER FOR DESKTOP =====
if (window.innerWidth > 991) {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function () {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.add('show');
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.remove('show');
            }
        });
    });
}

// ===== PRODUCT CARD HOVER EFFECTS =====
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== WISHLIST TOGGLE =====
document.addEventListener('click', (e) => {
    if (e.target.closest('.wishlist-btn') || e.target.closest('[id*="Wishlist"]')) {
        e.preventDefault();
        const icon = e.target.querySelector('i') || e.target;

        if (icon.classList.contains('bi-heart')) {
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
            icon.style.color = 'var(--primary-color)';
        } else if (icon.classList.contains('bi-heart-fill')) {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
            icon.style.color = '';
        }
    }
});

// ===== MOOD CARD CLICK =====
const moodCards = document.querySelectorAll('.mood-card');

moodCards.forEach(card => {
    card.addEventListener('click', function () {
        const moodName = this.querySelector('h5').textContent;
        console.log(`Navigating to ${moodName} fragrances...`);
        // Add your navigation logic here
    });
});

// ===== COLLECTION CARD CLICK =====
const collectionCards = document.querySelectorAll('.collection-card');

collectionCards.forEach(card => {
    card.addEventListener('click', function () {
        const collectionName = this.querySelector('h5').textContent;
        console.log(`Navigating to ${collectionName} collection...`);
        // Add your navigation logic here
    });
});

// ===== BRAND CARD CLICK =====
const brandCards = document.querySelectorAll('.brand-card');

brandCards.forEach(card => {
    card.addEventListener('click', function () {
        const brandName = this.querySelector('h5').textContent;
        console.log(`Navigating to ${brandName} products...`);
        // Add your navigation logic here
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 100));

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    updateCardsToShow();
}, 250));

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Refresh AOS
    AOS.refresh();
});

// ===== CART AND WISHLIST PERSISTENCE =====
// Save to localStorage
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Load from localStorage
function loadFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('American Fragrances website loaded successfully!');

    // Load saved cart count
    const savedCartCount = loadFromLocalStorage('cartCount');
    if (savedCartCount) {
        const badges = document.querySelectorAll('.badge-count');
        badges.forEach(badge => {
            if (badge.closest('[id*="Cart"]')) {
                badge.textContent = savedCartCount;
            }
        });
    }

    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(112, 180, 189, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(112, 180, 189, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(112, 180, 189, 0.3)';
});

// ===== PRELOADER (OPTIONAL) =====
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = '<div class="loader"></div>';
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white-color);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    transition: opacity 0.5s ease;
`;

const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    .loader {
        width: 50px;
        height: 50px;
        border: 5px solid var(--secondary-color);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);

// Remove preloader when page is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.body.contains(preloader)) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    }, 500);
});

console.log('🎨 American Fragrances - All scripts initialized successfully!');
