const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const emailInput = document.querySelector("input[name='email']");
        const passwordInput = document.querySelector("input[name='password']");
        const fullNameInput = document.querySelector("input[name='fullname']");
        const confirmInput = document.querySelector("input[name='confirm']");
        const message = document.querySelector(".message");

        message.textContent = "";
        message.className = "message";

        // LOGIN PAGE (no fullname field)
        if (!fullNameInput) {

            f
            const password = passwordInput.value;

            const validUser = users.find(user =>
                user.email === email && user.password === password
            );

            if (validUser) {
                localStorage.setItem("loggedInUser", JSON.stringify(validUser));
                window.location.href = "index.html";
            } else {
                message.textContent = "Invalid email or password";
                message.classList.add("error");
            }

        }

        // SIGNUP PAGE
        else {

            const fullName = fullNameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;

            const userExists = users.find(user => user.email === email);

            if (userExists) {
                message.textContent = "User already exists";
                message.classList.add("error");
                return;
            }

            if (!strongPassword.test(password)) {
                message.textContent = "Password must include uppercase, lowercase, number & special character";
                message.classList.add("error");
                return;
            }

            if (password !== confirmPassword) {
                message.textContent = "Passwords do not match";
                message.classList.add("error");
                return;
            }

            const user = { fullName, email, password };

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            window.location.href = "index.html";
        }

    });
}