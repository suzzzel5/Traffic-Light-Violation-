const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const links = document.querySelector(".links");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");
const ForgetLink = formPopup.querySelectorAll(".bottom-link a");
const closeBtn = document.querySelector(".close-btn"); // Added missing declaration

// Login form elements
const loginForm = document.querySelector("#login-form"); // Assuming you have a login form with this ID
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Password requirements: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message') || 
                        document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.display = 'block';
    
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorElement);
    }
    
    input.style.borderColor = 'red';
}

function clearError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    input.style.borderColor = '';
}

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);
    
    // Validate email
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!passwordInput.value) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number');
        isValid = false;
    }
    
    return isValid;
}

// Real-time validation
emailInput?.addEventListener('blur', () => {
    if (emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
    } else if (emailInput.value.trim()) {
        clearError(emailInput);
    }
});

passwordInput?.addEventListener('blur', () => {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        showError(passwordInput, 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number');
    } else if (passwordInput.value) {
        clearError(passwordInput);
    }
});

// Form submission
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Here you would typically send the data to your server
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Example: Simple mock authentication
        if (authenticateUser(email, password)) {
            alert('Login successful!');
            document.body.classList.remove("show-popup");
            // Redirect or perform post-login actions
        } else {
            showError(passwordInput, 'Invalid email or password');
        }
    }
});

// Mock authentication function (replace with actual authentication)
function authenticateUser(email, password) {
    // This is just a mock - replace with actual server authentication
    const validUsers = [
        { email: 'user@example.com', password: 'Password123' },
        { email: 'admin@example.com', password: 'Admin123!' }
    ];
    
    return validUsers.some(user => user.email === email && user.password === password);
}

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    links.classList.add("active");
    navbarMenu.classList.toggle("show-menu");
});

hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

closeBtn.addEventListener("click", () => {
    links.classList.remove("active");
});

ForgetLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'forget-link' ? 'add' : 'remove']("show-forget");
    });
});