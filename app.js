
const form = document.querySelector("#signup-form");
const formMessage = document.querySelector("#form-message");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const frequencyInput = document.querySelector("#frequency");

function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);

    if (field) {
        field.setAttribute("aria-invalid", "true");
    }

    if (error) {
        error.textContent = message;
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);

    if (field) {
        field.removeAttribute("aria-invalid");
    }

    if (error) {
        error.textContent = "";
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        formMessage.textContent = "";
        formMessage.classList.remove("success");

        let isValid = true;
        let firstError = null;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const frequency = frequencyInput.value.trim();

        clearError("name");
        clearError("email");
        clearError("frequency");

        if (name === "") {
            setError("name", "Enter your name.");
            isValid = false;
            firstError = nameInput;
        }

        if (email === "") {
            setError("email", "Enter your email address.");

            if (firstError === null) {
                firstError = emailInput;
            }

            isValid = false;
        } else if (!isValidEmail(email)) {
            setError("email", "Enter an email address like name@example.com.");

            if (firstError === null) {
                firstError = emailInput;
            }

            isValid = false;
        }

        if (frequency === "") {
            setError("frequency", "Choose how often we should email you.");

            if (firstError === null) {
                firstError = frequencyInput;
            }

            isValid = false;
        }

        if (!isValid) {
            firstError.focus();
            return;
        }

        formMessage.textContent = `Thank you, ${name}! You're on the mailing list.`;
        formMessage.classList.add("success");

        form.reset();
    });
}
