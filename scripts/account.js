document.addEventListener("DOMContentLoaded",()=>{
  const save = localStorage.getItem("User")
  let userobj = JSON.parse(save)
  console.log(userobj.email)
  document.getElementById('name-value').textContent = userobj.username;
  document.getElementById('email-value').textContent = userobj.email;
  document.getElementById('age-value').textContent = userobj.age;
  document.getElementById('phone-value').textContent = userobj.phone;

})
 
let isEditing = false;


// Load saved profile from localStorage
const savedProfile = localStorage.getItem('User');

if (savedProfile) {
  tempProfile = JSON.parse(savedProfile);
  updateProfileDisplay(tempProfile);
}

function updateProfileDisplay(profile) {
  document.getElementById('profile-image').src = profile.avatar;
  document.getElementById('name-value').textContent = profile.name;
  document.getElementById('email-value').textContent = profile.email;
  document.getElementById('age-value').textContent = profile.age;
  document.getElementById('phone-value').textContent = profile.phone;
  
  document.getElementById('name-input').value = profile.name;
  document.getElementById('email-input').value = profile.email;
  document.getElementById('age-input').value = profile.age;
  document.getElementById('phone-input').value = profile.phone;
}

function toggleAvatarSelector(event) {
  event.stopPropagation();
  const selector = document.getElementById('avatar-selector');
  const overlay = document.getElementById('overlay');
  selector.classList.toggle('show');
  overlay.classList.toggle('show');
  startEditing();
}

function hideAvatarSelector() {
  document.getElementById('avatar-selector').classList.remove('show');
  document.getElementById('overlay').classList.remove('show');
}

function switchTab(tab, tabName) {
  // Update tab styles
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  // Show/hide content
  document.getElementById('illustrations-tab').classList.toggle('hidden', tabName !== 'illustrations');
  document.getElementById('upload-tab').classList.toggle('hidden', tabName !== 'upload');
}

function startEditing() {
  isEditing = true;
  document.getElementById('edit-buttons').classList.add('show');
  document.getElementById('normal-buttons').classList.add('hide');
  
  document.querySelectorAll('.profile-input').forEach(input => {
    input.classList.add('editing');
  });
  
  document.querySelectorAll('.profile-value').forEach(value => {
    value.classList.add('editing');
  });
}

function cancelEditing() {
  isEditing = false;
  hideAvatarSelector();
  document.getElementById('edit-buttons').classList.remove('show');
  document.getElementById('normal-buttons').classList.remove('hide');
  
  document.querySelectorAll('.profile-input').forEach(input => {
    input.classList.remove('editing');
  });
  
  document.querySelectorAll('.profile-value').forEach(value => {
    value.classList.remove('editing');
  });
  
  updateProfileDisplay(tempProfile);
}

function saveChanges() {
  tempProfile = {
    username: document.getElementById('name-input').value,
    email: document.getElementById('email-input').value,
    age: document.getElementById('age-input').value,
    phone: document.getElementById('phone-input').value,
    avatar: document.getElementById('profile-image').src
  };
  
  localStorage.setItem('User', JSON.stringify(tempProfile));
  updateProfileDisplay(tempProfile);
  cancelEditing();
}

function selectAvatar(url) {
  document.getElementById('profile-image').src = url;
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      document.getElementById('profile-image').src = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
