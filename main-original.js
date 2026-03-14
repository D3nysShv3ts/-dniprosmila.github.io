document.addEventListener("DOMContentLoaded", function () {
    initActiveNav();
    initScrollHeader();
    initSmoothScroll();
    initContactForm();
    initScrollTopButton();
});

function initActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar .nav-link");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function initScrollHeader() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 30) {
            navbar.classList.add("shadow");
        } else {
            navbar.classList.remove("shadow");
        }
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

function initContactForm() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");
        let isValid = true;

        inputs.forEach(input => {
            input.classList.remove("is-invalid");

            if (input.hasAttribute("required") && input.value.trim() === "") {
                input.classList.add("is-invalid");
                isValid = false;
            }

            if (input.type === "email" && input.value.trim() !== "") {
                if (!isValidEmail(input.value.trim())) {
                    input.classList.add("is-invalid");
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            showAlert("Будь ласка, правильно заповніть форму.", "danger");
            return;
        }

        showAlert("Повідомлення успішно надіслано.", "success");
        form.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type) {
    const oldAlert = document.querySelector(".custom-alert");
    if (oldAlert) {
        oldAlert.remove();
    }

    const alert = document.createElement("div");
    alert.className = `alert alert-${type} custom-alert mt-3`;
    alert.textContent = message;

    const form = document.querySelector("form");
    if (form) {
        form.parentNode.insertBefore(alert, form);
    } else {
        document.body.prepend(alert);
    }

    setTimeout(() => {
        alert.remove();
    }, 4000);
}

function initScrollTopButton() {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "btn btn-primary position-fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.display = "none";
    button.style.zIndex = "9999";
    button.style.borderRadius = "50%";
    button.style.width = "50px";
    button.style.height = "50px";

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const cards = document.querySelectorAll(".reveal-card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
observer.unobserve(entry.target);
}

});

}, {threshold:0.2});

cards.forEach(card => observer.observe(card));