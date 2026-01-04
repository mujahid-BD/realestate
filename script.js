document.addEventListener('DOMContentLoaded', () => {
    const properties = [
        { 
            id: 1, 
            title: 'Grove Streat', 
            type: 'luxury', 
            img: 'image/Screenshot_735.png', 
            totalUnits: 20,
            unitTypes: ['Trevor Trailer']
        },
      // You Can Add More In Same Formate
        
    ];

    const team = [
        { name: 'Jonathan James', role: 'Owner', img: 'image/addictive-mobile-games_orig.jpg', phone: '444-5555' },
      // You Can Add More In Same Formate
    ];

    // Elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.querySelector('.search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyGrid = document.getElementById('property-grid');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const teamGrid = document.getElementById('team-grid');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body');

    // Dark/Light Mode
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Hamburger Menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Render Properties - শুধু নাম + টোটাল ইউনিট
function renderProperties(filteredProperties) {
    propertyGrid.innerHTML = '';
    filteredProperties.forEach(prop => {
        const card = document.createElement('div');
        card.classList.add('property-card');
        card.innerHTML = `
            <div class="property-img" style="background: url('${prop.img}') no-repeat center/cover;"></div>
            <div class="property-info">
                <h3>${prop.title}</h3>
                <p class="total-units">Total Units: <strong>${prop.totalUnits}</strong></p>
            </div>
        `;
        card.addEventListener('click', () => showModal(prop));
        propertyGrid.appendChild(card);
    });
}

    // Team render
    function renderTeam() {
        teamGrid.innerHTML = '';
        team.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('team-card');
            card.innerHTML = `
                <div class="team-img" style="background: url('${member.img}') no-repeat center/cover;"></div>
                <div class="team-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <p><i class="fas fa-phone"></i> ${member.phone}</p>
                </div>
            `;
            teamGrid.appendChild(card);
        });
    }

    // Modal - শুধু নাম + unit types
function showModal(prop) {
    modalBody.innerHTML = `
        <h3>${prop.title}</h3>
        <p><strong>Available Unit Types:</strong></p>
        <ul class="unit-types-list">
            ${prop.unitTypes.map(type => `<li>${type}</li>`).join('')}
        </ul>
    `;
    modal.style.display = 'flex';
}

// Close modal - দুইভাবেই কাজ করবে
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Modal outside click close (যদি modal এর বাইরে ক্লিক করা হয়)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

    // Filtering
    let currentFilter = 'all';
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProperties();
        });
    });

    // Search and Filter Logic
    function filterProperties() {
        const searchTerm = searchInput.value.toLowerCase();
        let filtered = properties.filter(prop => {
            if (currentFilter !== 'all' && !prop.type.includes(currentFilter) && !prop.status.includes(currentFilter)) return false;
            return prop.title.toLowerCase().includes(searchTerm) || prop.location.toLowerCase().includes(searchTerm);
        });
        renderProperties(filtered);
    }

    searchBtn.addEventListener('click', filterProperties);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProperties();
    });

    // Initial Render
    loading.style.display = 'block';
    setTimeout(() => { // Simulate loading
        loading.style.display = 'none';
        renderProperties(properties);
        renderTeam();
    }, 1000);

    // Error Handling Example (uncomment to test)
    // error.style.display = 'block';
});
