// This is the scss entry file
import "../styles/index.scss";

// open/close mobile navbar
import "../js/script.js";

// We can import other JS file as we like
import Jumbotron from "../components/jumbotron";

window.document.addEventListener("DOMContentLoaded", function () {
  window.console.log("dom ready");

  // Find elements and initialize
  for (const elem of document.querySelectorAll(Jumbotron.selector())) {
    new Jumbotron(elem);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registration succeeded:', registration);
      navigator.serviceWorker.ready
        .then(function (registration) {
          console.log('SW is active:', registration.active);


        });
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
