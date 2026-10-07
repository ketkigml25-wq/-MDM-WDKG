```javascript
const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const mobileInput = document.getElementById("mobile");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const mobileError = document.getElementById("mobileError");

const successMessage = document.getElementById("successMessage");


form.addEventListener("submit", function(event) {

    // Stop default form submission
    event.preventDefault();

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    mobileError.textContent = "";

    successMessage.textContent = "";

    nameInput.classList.remove("error");
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");
    mobileInput.classList.remove("error");


    // Get input values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const mobile = mobileInput.value.trim();

    let isValid = true;


    // Name validation
    if (name === "") {

        nameError.textContent = "Full name is required.";
        nameInput.classList.add("error");

        isValid = false;
    }


    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent = "Email address is required.";
        emailInput.classList.add("error");

        isValid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent = "Enter a valid email address.";
        emailInput.classList.add("error");

        isValid = false;
    }


    // Password validation
    if (password === "") {

        passwordError.textContent = "Password is required.";
        passwordInput.classList.add("error");

        isValid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        passwordInput.classList.add("error");

        isValid = false;
    }


    // Mobile validation
    const mobilePattern = /^[0-9]{10}$/;

    if (mobile === "") {

        mobileError.textContent = "Mobile number is required.";
        mobileInput.classList.add("error");

        isValid = false;

    } else if (!mobilePattern.test(mobile)) {

        mobileError.textContent =
            "Enter a valid 10-digit mobile number.";

        mobileInput.classList.add("error");

        isValid = false;
    }


    // Successful registration
    if (isValid) {

        successMessage.textContent =
            "✓ Registration Successful!";

        form.reset();
    }

});
```
