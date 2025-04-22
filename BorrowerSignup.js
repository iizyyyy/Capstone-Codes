document.addEventListener("DOMContentLoaded", function () {
  // course dropdown functionality
  const courseDropdown = document.getElementById("courseDropdown");
  const courseOptions = document.getElementById("courseOptions");
  const courseSelected = document.getElementById("courseSelected");
  const courseInput = document.getElementById("courseInput");

  // role dropdown functionality
  const roleDropdown = document.getElementById("roleDropdown");
  const roleOptions = document.getElementById("roleOptions");
  const roleSelected = document.getElementById("roleSelected");
  const roleInput = document.getElementById("roleInput");

  // toggle course dropdown
  courseDropdown.addEventListener("click", function () {
    courseOptions.style.display =
      courseOptions.style.display === "block" ? "none" : "block";
    roleOptions.style.display = "none";
  });

  // toggle role dropdown
  roleDropdown.addEventListener("click", function () {
    roleOptions.style.display =
      roleOptions.style.display === "block" ? "none" : "block";
    courseOptions.style.display = "none";
  });

  // handle course selection
  const courseOptionElements =
    courseOptions.querySelectorAll(".dropdown-option");
  courseOptionElements.forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      const text = this.textContent;
      courseSelected.textContent = text;
      courseInput.value = value;
      courseOptions.style.display = "none";
    });
  });

  // handle role selection
  const roleOptionElements = roleOptions.querySelectorAll(".dropdown-option");
  roleOptionElements.forEach((option) => {
    option.addEventListener("click", function () {
      const value = this.getAttribute("data-value");
      const text = this.textContent;
      roleSelected.textContent = text;
      roleInput.value = value;
      roleOptions.style.display = "none";
    });
  });

  // close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !courseDropdown.contains(event.target) &&
      !courseOptions.contains(event.target)
    ) {
      courseOptions.style.display = "none";
    }

    if (
      !roleDropdown.contains(event.target) &&
      !roleOptions.contains(event.target)
    ) {
      roleOptions.style.display = "none";
    }
  });

  // form submission
  const form = document.getElementById("signupForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // basic validation
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!courseInput.value) {
      alert("Please select a course");
      return;
    }

    if (!roleInput.value) {
      alert("Please select a role");
      return;
    }

    // form data
    const formData = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      studentId: document.getElementById("studentId").value,
      password: password,
      course: courseInput.value,
      role: roleInput.value,
    };
  });
});
