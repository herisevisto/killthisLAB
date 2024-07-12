console.log("signup.js");

async function signup(credentials) {
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      console.log("User created successfully");
      // Redirect to accountcreated.htm
      window.location.href = "/overlay/accountcreated";
    } else {
      const errorData = await response.json();
      console.error("Error creating user:", errorData.message);
    }
  } catch (err) {
    console.error(err);
  }
}

document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value;
    const passwordInput = document.getElementById("password");
    const firstNameInput = document.getElementById("first-name");
    const middleNameInput = document.getElementById("middle-name");
    const lastNameInput = document.getElementById("last-name");
    const roleInput = document.getElementById("role");

    if (!emailValue.endsWith("@dlsu.edu.ph")) {
      emailInput.value = "";
      emailInput.placeholder = "Email organization invalid.";
      emailInput.style.borderColor = "red"; // Optional: to highlight the textbox with a red border
    } else {
      emailInput.placeholder = "Email Address"; // Reset placeholder
      emailInput.style.borderColor = ""; // Reset border color

      const userDetails = {
        firstName: firstNameInput.value,
        middleName: middleNameInput.value,
        lastName: lastNameInput.value,
        email: emailValue,
        password: passwordInput.value,
        role: roleInput.value,
      };

      await signup(userDetails);
    }
  });
