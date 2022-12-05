export function showToastMessage(message) {
    const adminNotification = document.querySelector(".admin-notification")
    adminNotification.textContent = message;
    adminNotification.classList.toggle("active");
  
    setTimeout(() => {
      adminNotification.classList.toggle("active");
    }, 2000);
  }