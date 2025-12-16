// ========================================
// EASY PRODUCT EDITING SECTION
// ========================================
// To add or edit products, simply modify the array below
// Each product needs: name, price, description, and image

const products = [
    {
        name: "Pesticides",
        price: "₹500 - ₹2000",  // Change price here
        description: "High-quality pest control solutions to protect your crops from insects, diseases, and weeds. Our range includes organic and chemical options for effective crop protection.",
        image: "https://images.unsplash.com/photo-1755931359594-852c73c6609c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",  // Change image URL here
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
               </svg>`
    },
    {
        name: "Fertilizers",
        price: "₹300 - ₹1500",  // Change price here
        description: "Nutrient-rich fertilizers designed to enhance soil fertility and boost crop productivity. We offer both organic and synthetic fertilizers tailored to different soil types and crops.",
        image: "https://images.unsplash.com/photo-1649043822514-651bb3083b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",  // Change image URL here
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M8 22s-4-4.5-4-10 4-10 4-10"/>
               </svg>`
    },
    {
        name: "Plant Growth Products",
        price: "₹400 - ₹1800",  // Change price here
        description: "Advanced plant growth regulators and bio-stimulants to maximize yield and improve crop quality. Enhance root development, flowering, and fruiting with our specialized products.",
        image: "https://images.unsplash.com/photo-1723110569384-800b1641c8a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",  // Change image URL here
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
               </svg>`
    }
    // To add more products, copy the structure above:
    // {
    //     name: "Product Name",
    //     price: "₹XXX - ₹XXX",
    //     description: "Product description here",
    //     image: "your-image-url-here.jpg",
    //     icon: `<svg>...</svg>`  // Optional, can use default icon
    // }
];

// ========================================
// CONTACT EMAIL CONFIGURATION
// ========================================
// Change this to your actual email address
const CONTACT_EMAIL = "info@unimaxagro.com";

// ========================================
// MAIN JAVASCRIPT CODE
// ========================================

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Load Products Dynamically
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-icon">
                    ${product.icon}
                </div>
                <div class="product-header">
                    <h3>${product.name}</h3>
                    <span class="product-price">${product.price}</span>
                </div>
                <p>${product.description}</p>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create email content
    const subject = encodeURIComponent(`Inquiry: ${formData.subject}`);
    const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
    );

    // Open default email client
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Reset form
    contactForm.reset();
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
