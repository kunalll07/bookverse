document.addEventListener("DOMContentLoaded", function () {

    console.log("BookVerse JavaScript started");


    // =====================================================
    // HOME PAGE PE SEARCH WALA LOGIC
    // =====================================================

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const noResults = document.getElementById("noResults");

    const homeBooks = document.querySelectorAll(".book-card");


    if (searchInput && searchButton) {

        console.log("Home search found:", homeBooks.length);


        function performSearch() {
            const searchText = searchInput.value.trim().toLowerCase();
            let visibleBooks = 0;

            homeBooks.forEach(function (book) {
                const titleElement = book.querySelector("h3");
                if (!titleElement) return;

                const title = titleElement.textContent.trim().toLowerCase();

                if (searchText === "" || title.includes(searchText)) {
                    book.style.display = "";
                    visibleBooks++;
                } else {
                    book.style.display = "none";
                }
            });

            if (visibleBooks === 0) {
                if (noResults) noResults.style.display = "block";
            } else {
                if (noResults) noResults.style.display = "none";
            }

            if (searchText !== "" && clearButton) {
                clearButton.style.display = "inline-block";
            } else if (clearButton) {
                clearButton.style.display = "none";
            }
        }

        searchButton.addEventListener("click", performSearch);

        searchInput.addEventListener("input", performSearch);

        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                performSearch();
            }
        });

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                searchInput.value = "";
                performSearch();
            });
        }

    }


    // =====================================================
    // BOOKS PAGE PE CATEGORY FILTER
    // =====================================================

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const libraryCards =
        document.querySelectorAll(".library-card");


    console.log(
        "Category buttons:",
        categoryButtons.length
    );

    console.log(
        "Library cards:",
        libraryCards.length
    );


    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory =
                button.getAttribute("data-category");


            console.log(
                "Selected category:",
                selectedCategory
            );


            // jo button click hua usko active class do

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            // yahan pe books ko filter kar rahe hain category ke hisaab se

            libraryCards.forEach(function (card) {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    // =====================================================
    // BOOK KI DETAILS DIKHANE WALA MODAL POPUP
    // =====================================================

    const bookModal =
        document.getElementById("bookModal");

    const closeModal =
        document.getElementById("closeModal");

    const viewDetailsButtons =
        document.querySelectorAll(".view-details");

    const modalBookImage =
        document.getElementById("modalBookImage");

    const modalBookTitle =
        document.getElementById("modalBookTitle");

    const modalBookDescription =
        document.getElementById("modalBookDescription");

    const modalBookRating =
        document.getElementById("modalBookRating");

    const modalBookCategory =
        document.getElementById("modalBookCategory");


    console.log(
        "View Details buttons:",
        viewDetailsButtons.length
    );


    if (
        bookModal &&
        closeModal &&
        modalBookImage &&
        modalBookTitle &&
        modalBookDescription &&
        modalBookRating &&
        modalBookCategory
    ) {


        // JAB MODAL OPEN KARNA HO

        viewDetailsButtons.forEach(function (button) {

            button.addEventListener("click", function (event) {

                event.preventDefault();


                const card =
                    button.closest(".library-card");


                if (!card) {
                    return;
                }


                const image =
                    card.querySelector("img");


                const title =
                    card.getAttribute("data-title");


                const description =
                    card.getAttribute("data-description");


                const rating =
                    card.getAttribute("data-rating");


                const category =
                    card.getAttribute("data-category");


                if (image) {
                    modalBookImage.src = image.src;
                }


                modalBookTitle.textContent =
                    title || "Book";


                modalBookDescription.textContent =
                    description || "";


                modalBookRating.textContent =
                    "⭐ " + (rating || "");


                modalBookCategory.textContent =
                    "Category: " + (category || "");


                bookModal.classList.add("active");

            });

        });


        // CLOSE BUTTON DABANE PAR KYA HOGA

        closeModal.addEventListener("click", function () {

            bookModal.classList.remove("active");

        });


        // AGAR MODAL KE BAHAR CLICK KIYA TO BAND HO JAYEGA

        bookModal.addEventListener("click", function (event) {

            if (event.target === bookModal) {

                bookModal.classList.remove("active");

            }

        });


        // ESCAPE KEY SE BHI MODAL BAND KAR SAKTE HAIN

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                bookModal.classList.contains("active")
            ) {

                bookModal.classList.remove("active");

            }

        });

    }


    // =====================================================
    // MOBILE WALA HAMBURGER MENU KA CODE
    // =====================================================

    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // =====================================================
    // DARK MODE KA BUTTON (Color Change Karne Ke Liye)
    // =====================================================

    const darkModeToggle = document.getElementById("darkModeToggle");

    if (darkModeToggle) {
        // Check kar rahe hain ki user ne pehle se dark mode on rakha tha kya local storage mein
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeToggle.textContent = "☀️";
        }

        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
                darkModeToggle.textContent = "☀️";
            } else {
                localStorage.setItem("darkMode", "disabled");
                darkModeToggle.textContent = "🌙";
            }
        });
    }

    // =====================================================
    // TIME KE HISAAB SE GREETING DIKHANE WALA TOAST
    // =====================================================

    const greetingToast = document.getElementById("greetingToast");
    const greetingMessage = document.getElementById("greetingMessage");

    if (greetingToast && greetingMessage) {
        const hour = new Date().getHours();
        let greeting = "Welcome to BookVerse!";

        if (hour < 12) {
            greeting = "Good Morning! Welcome to BookVerse!";
        } else if (hour < 18) {
            greeting = "Good Afternoon! Welcome to BookVerse!";
        } else {
            greeting = "Good Evening! Welcome to BookVerse!";
        }

        greetingMessage.textContent = greeting;

        // toast ko dikhao thode delay ke baad taaki smooth lage
        setTimeout(() => {
            greetingToast.classList.add("show");

            // aur 4 second ke baad automatically chhupa do
            setTimeout(() => {
                greetingToast.classList.remove("show");
            }, 4000);
        }, 500);
    }



    console.log("BookVerse JavaScript loaded successfully");

});

// =========================
// CONTACT FORM WALA LOGIC
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        formMessage.textContent =
            "Thank you! Your message has been received.";

        formMessage.style.color = "#2563eb";

        contactForm.reset();

    });

}