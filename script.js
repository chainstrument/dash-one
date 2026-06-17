const appTitle = document.querySelector('.logo');
const currentYear = new Date().getFullYear();

if (appTitle) {
  appTitle.setAttribute('title', `Personal Dashboard • ${currentYear}`);
}
