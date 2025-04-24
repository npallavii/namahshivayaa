// DOM Elements
const viewProfile = document.getElementById('viewProfile');
const editProfile = document.getElementById('editProfile');
const editButton = document.getElementById('editButton');
const cancelButton = document.getElementById('cancelEdit');
const profileForm = document.getElementById('profileForm');
const profileInfo = document.getElementById('profileInfo');

// Profile fields
const fields = [
    { id: 'Name', icon: 'user', label: 'Full Name' },
    { id: 'Age', icon: 'calendar-alt', label: 'Age' },
    { id: 'Gender', icon: 'venus-mars', label: 'Gender' },
    { id: 'Phone', icon: 'phone', label: 'Phone Number' },
    { id: 'Email', icon: 'envelope', label: 'Email' },
    { id: 'Address', icon: 'location-dot', label: 'Address' },
    { id: 'EmergencyContact', icon: 'phone-volume', label: 'Emergency Contact' },
    { id: 'BloodGroup', icon: 'droplet', label: 'Blood Group' },
    { id: 'Allergies', icon: 'exclamation-circle', label: 'Allergies' }
];

// Load profile data from localStorage
function loadProfile() {
    const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
    
    // Update view mode
    document.getElementById('profileName').textContent = profileData.Name || 'Your Name';
    document.getElementById('profileTagline').textContent = profileData.Tagline || 'Your Health Journey';

    // Update profile info section
    profileInfo.innerHTML = fields.map(field => {
        const value = profileData[field.id] || 'Not set';
        return `
            <div class="info-item">
                <i class="fas fa-${field.icon}"></i>
                <div class="info-content">
                    <label>${field.label}</label>
                    <span>${value}</span>
                </div>
            </div>
        `;
    }).join('');

    // Fill edit form
    fields.forEach(field => {
        const input = document.getElementById('input' + field.id);
        if (input) {
            input.value = profileData[field.id] || '';
        }
    });
}

// Save profile data
function saveProfile(formData) {
    const profileData = {};
    fields.forEach(field => {
        profileData[field.id] = formData.get('input' + field.id) || '';
    });
    profileData.Tagline = formData.get('inputTagline') || 'Your Health Journey';
    
    localStorage.setItem('profileData', JSON.stringify(profileData));
    loadProfile();
}

// Event Listeners
editButton.addEventListener('click', () => {
    viewProfile.style.display = 'none';
    editProfile.style.display = 'block';
});

cancelButton.addEventListener('click', () => {
    viewProfile.style.display = 'block';
    editProfile.style.display = 'none';
    loadProfile(); // Reset form to saved values
});

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(profileForm);
    saveProfile(formData);
    viewProfile.style.display = 'block';
    editProfile.style.display = 'none';
});

// Initialize profile on page load
document.addEventListener('DOMContentLoaded', loadProfile);
