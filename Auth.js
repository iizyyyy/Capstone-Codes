document.addEventListener('DOMContentLoaded', function() {
    // Common form validation functions
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    function showAlert(message) {
      alert(message);
    }
    
    // Identify which page we're on
    const isSignupPage = document.getElementById('signupForm') !== null;
    const isLoginPage = document.getElementById('loginForm') !== null;
    
    // Handle navigation between pages
    const signupBtn = document.querySelector('.signup-btn');
    const loginBtn = document.querySelector('.login-btn');
    
    if (signupBtn) {
      signupBtn.addEventListener('click', function() {
        window.location.href = 'UserSignup.html'; // Go to signup page
      });
    }
    
    if (loginBtn) {
      loginBtn.addEventListener('click', function() {
        window.location.href = 'UserLogin.html'; // Go to login page
      });
    }
    
    // SIGNUP PAGE FUNCTIONALITY
    if (isSignupPage) {
      const signupForm = document.getElementById('signupForm');
      const monthSelect = document.getElementById('month');
      const daySelect = document.getElementById('day');
      const yearSelect = document.getElementById('year');
      const password = document.getElementById('password');
      const confirmPassword = document.getElementById('confirmPassword');
      
      // Populate years dropdown (100 years back from current year)
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 100; i++) {
        const year = currentYear - i;
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year.toString();
        yearSelect.appendChild(option);
      }
      
      // Function to update days based on month and year
      function updateDays() {
        // Clear current options
        daySelect.innerHTML = '<option value="" disabled selected>Day</option>';
        
        // Get the number of days in the selected month
        const month = parseInt(monthSelect.value, 10) || 0;
        const year = parseInt(yearSelect.value, 10) || currentYear;
        
        let daysInMonth = 31; // Default
        
        if (month === 2) { // February
          // Check for leap year
          if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth = 29; // Leap year
          } else {
            daysInMonth = 28; // Non-leap year
          }
        } else if ([4, 6, 9, 11].includes(month)) {
          daysInMonth = 30; // April, June, September, November
        }
        
        // Add the appropriate number of days
        for (let i = 1; i <= daysInMonth; i++) {
          const option = document.createElement('option');
          option.value = i < 10 ? '0' + i : i.toString();
          option.textContent = i.toString();
          daySelect.appendChild(option);
        }
      }
      
      // Initial population of days
      updateDays();
      
      // Update days when month or year changes
      monthSelect.addEventListener('change', updateDays);
      yearSelect.addEventListener('change', updateDays);
      
      // Form submission
      signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if passwords match
        if (password.value !== confirmPassword.value) {
          showAlert('Passwords do not match!');
          return;
        }
        
        // Collect form data
        const formData = {
          firstName: document.getElementById('firstName').value,
          middleName: document.getElementById('middleName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          password: password.value,
          birthday: {
            month: monthSelect.value,
            day: daySelect.value,
            year: yearSelect.value
          },
          gender: document.querySelector('input[name="gender"]:checked')?.value
        };
        
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || 
            !formData.birthday.month || !formData.birthday.day || !formData.birthday.year || !formData.gender) {
          showAlert('Please fill in all required fields');
          return;
        }
        
        // Validate email format
        if (!validateEmail(formData.email)) {
          showAlert('Please enter a valid email address');
          return;
        }
        
        console.log('Signup form submitted:', formData);
        
        // Here you would typically send the data to a server
        showAlert('Sign up successful!');
        window.location.href = 'UserLogin.html';
        signupForm.reset();
      });
    }
    
    // LOGIN PAGE FUNCTIONALITY
    if (isLoginPage) {
      const loginForm = document.getElementById('loginForm');
      
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Basic validation
        if (!email || !password) {
          showAlert('Please fill in all required fields');
          return;
        }
        
        // Email format validation
        if (!validateEmail(email)) {
          showAlert('Please enter a valid email address');
          return;
        }
        
        // Collect form data
        const formData = {
          email: email,
          password: password,
          rememberMe: rememberMe
        };
        
        console.log('Login attempt:', formData);
        
        // Here you would typically send the data to a server for authentication
        showAlert('Login successful!');
        
        // If you want to redirect after login:
        window.location.href = 'UserDashboard.html';
      });
    }
  });