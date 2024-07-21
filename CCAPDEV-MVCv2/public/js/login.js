console.log("login.js");

async function login(credentials) {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log(response);
    if (response.ok) {
      const userData = await response.json()
      console.log("User logged in successfully");
      window.location.href = `/home/home-dashboard?userID=${userData.userID}`;
    } else {
      const errorData = await response.json();
      console.error("Error logging in:", errorData.message);
      alert("Login failed: " + errorData.message);
    }
  } catch (err) {
    console.error("Error logging in:", err);
    alert("An error occurred. Please try again later.");
  }
}

async function loginlabtech(credentials) {
  try {
    const response = await fetch("/auth/loginlabtech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log(response);
    if (response.ok) {
      const userData = await response.json()
      console.log("User logged in successfully");
      window.location.href = `/home/home-dashboard?userID=${userData.userID}`;
    } else {
      const errorData = await response.json();
      console.error("Error logging in:", errorData.message);
      alert("Login failed: " + errorData.message);
    }
  } catch (err) {
    console.error("Error logging in:", err);
    alert("An error occurred. Please try again later.");
  }
}


document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const roleInput = document.getElementById("role");

    const roleValue = roleInput.value

    const userDetails = {
      email: emailInput.value,
      password: passwordInput.value,
      role: roleInput.value,
    };
    if(roleValue === "Student"){
      await login(userDetails);
    }
    else if(roleValue === "Labtech"){
      await loginlabtech(userDetails)
    }
    
  });
