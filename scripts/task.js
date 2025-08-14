document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", () => {
      console.log("Start");
  
      fetch('scripts/userdata.json')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('userData', JSON.stringify(data));
          console.log('Data stored in localStorage:', data);
        })
        .catch(error => console.error('Error loading JSON:', error));
  
      console.log("End");
    });
  });
  