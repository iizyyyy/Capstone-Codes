document.addEventListener('DOMContentLoaded', function() {
    // Sample data for furnishing items
    const furnishingData = [
      {
        id: 'CHAIR001',
        image: 'chair-blue.jpg',
        quantity: 1,
        status: 'available'
      },
      {
        id: 'TABLE001',
        image: 'table-wood.jpg',
        quantity: 1,
        status: 'maintenance'
      },
      {
        id: 'TABLE002',
        image: 'table-wood.jpg',
        quantity: 6,
        status: 'available'
      },
      {
        id: 'CHAIR002',
        image: 'chair-blue.jpg',
        quantity: 10,
        status: 'available'
      },
      {
        id: 'CHAIR003',
        image: 'chair-blue.jpg',
        quantity: 1,
        status: 'reserved'
      },
      {
        id: 'CHAIR004',
        image: 'chair-blue.jpg',
        quantity: 7,
        status: 'maintenance'
      },
      {
        id: 'CHAIR005',
        image: 'chair-blue.jpg',
        quantity: 3,
        status: 'reserved'
      }
    ];
    
    // Function to populate furnishing table
    function populateFurnishingTable() {
      const tableBody = document.getElementById('furnishing-table-body');
      
      // Clear existing table content
      if (tableBody) {
        tableBody.innerHTML = '';
        
        // Add each furnishing item to the table
        furnishingData.forEach(item => {
          const row = document.createElement('tr');
          
          // QR Code cell
          const qrCell = document.createElement('td');
          qrCell.innerHTML = `
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${item.id}" 
                 alt="QR Code" class="qr-code">
          `;
          
          // Item image cell
          const imageCell = document.createElement('td');
          // Use placeholder images based on the item type
          let imageSrc = '';
          if (item.image.includes('chair')) {
            imageSrc = 'https://via.placeholder.com/60x60/4682B4/FFFFFF?text=Chair';
          } else if (item.image.includes('table')) {
            imageSrc = 'https://via.placeholder.com/60x60/CD853F/FFFFFF?text=Table';
          } else {
            imageSrc = 'https://via.placeholder.com/60x60/808080/FFFFFF?text=Item';
          }
          imageCell.innerHTML = `<img src="${imageSrc}" alt="Furniture Item" class="item-image">`;
          
          // Quantity cell
          const quantityCell = document.createElement('td');
          quantityCell.textContent = item.quantity;
          
          // Status cell
          const statusCell = document.createElement('td');
          let statusText = '';
          let statusClass = '';
          
          switch(item.status) {
            case 'available':
              statusText = 'Available';
              statusClass = 'status-available';
              break;
            case 'maintenance':
              statusText = 'Under Maintenance';
              statusClass = 'status-maintenance';
              break;
            case 'reserved':
              statusText = 'Reserved';
              statusClass = 'status-reserved';
              break;
            default:
              statusText = item.status;
          }
          
          statusCell.innerHTML = `<span class="status-badge ${statusClass}">${statusText}</span>`;
          
          // Append cells to row
          row.appendChild(qrCell);
          row.appendChild(imageCell);
          row.appendChild(quantityCell);
          row.appendChild(statusCell);
          
          // Append row to table body
          tableBody.appendChild(row);
        });
      }
    }
    
    // Initialize the furnishing table
    populateFurnishingTable();
    
    // Handle search functionality
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
      searchInput.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('#furnishing-table-body tr');
        
        tableRows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }
    
    // Handle search button click
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
          // Trigger the search
          const event = new Event('keyup');
          searchInput.dispatchEvent(event);
        }
      });
    }
    
    // Handle sidebar navigation
    const sidebarLinks = document.querySelectorAll('.dashboard-sidebar nav ul li a');
    
    sidebarLinks.forEach(link => {
      // Add click event listener to each sidebar link
      link.addEventListener('click', function(e) {
        // If it's the logout link
        if (this.textContent.includes('Log out')) {
          e.preventDefault();
          if (confirm('Are you sure you want to log out?')) {
            // Redirect to login page
            window.location.href = 'login.html';
          }
        } else if (this.textContent.includes('Dashboard')) {
          // Allow navigation to dashboard
          return;
        } else {
          // For other links, just prevent default for now
          e.preventDefault();
          
          // Remove active class from all links
          sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
          
          // Add active class to clicked link
          this.parentElement.classList.add('active');
        }
      });
    });
    
    // Function to add a new furnishing item (for demonstration)
    window.addNewFurnishing = function(id, image, quantity, status) {
      // Create a new furnishing object
      const newItem = {
        id: id || `ITEM${Math.floor(1000 + Math.random() * 9000)}`,
        image: image || (Math.random() > 0.5 ? 'chair-blue.jpg' : 'table-wood.jpg'),
        quantity: quantity || Math.floor(1 + Math.random() * 10),
        status: status || ['available', 'maintenance', 'reserved'][Math.floor(Math.random() * 3)]
      };
      
      // Add to the furnishing data array
      furnishingData.unshift(newItem);
      
      // Refresh the table
      populateFurnishingTable();
      
      return newItem;
    };
    
    // Example of how to use the addNewFurnishing function:
    // Uncomment this to test adding a new furnishing item
    // setTimeout(() => {
    //   window.addNewFurnishing('DESK001', 'desk-black.jpg', 2, 'available');
    // }, 3000);
  });