(function(e){
 e.closest = e.closest || function(css){
   var node = this;

   while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
   }
   return null;
 }

  var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
  !matches ? (e.matches = e.matchesSelector = function matches(selector) {
    var matches = document.querySelectorAll(selector);
    var th = this;
    return Array.prototype.some.call(matches, function(e) {
      return e === th;
    });
  }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

(function () {
  'use strict';

  let searchButton = document.querySelector(".search-button");
  if (searchButton) {
    searchButton.addEventListener("click", function (event) {
      showModalElement(event, "search-panel");
    });
  }

  let entranceButton = document.querySelector(".entrance-button");
  if (entranceButton) {
    entranceButton.addEventListener("click", function (event) {
      showModalElement(event, "login-panel");
    });
  }

  let cartButton = document.querySelector(".cart-button");
  if (cartButton) {
    cartButton.addEventListener("click", function (event) {
      showModalElement(event, "cart-panel");
    });
  }

  let feedbackButton = document.querySelector(".feedback-button");
  if (feedbackButton) {
    feedbackButton.addEventListener("click", function (event) {
      closeActiveModalElement(event);
      document.querySelector(".feedback-panel__wrapper").classList.remove("temporary-hidden");
      document.querySelector(".feedback-panel").classList.remove("temporary-hidden");
      event.preventDefault();
      event.stopPropagation()
    });
  }

  let feedbackButtonCloseButton = document.querySelector(".feedback-panel-close-button");
  if(feedbackButtonCloseButton){
    feedbackButtonCloseButton.addEventListener("click", function (event) {
      document.querySelector(".feedback-panel__wrapper").classList.add("temporary-hidden");
      document.querySelector(".feedback-panel").classList.add("temporary-hidden");
      event.preventDefault();
      event.stopPropagation()
    });
  }


  document.body.addEventListener("click", function (event) {
    closeActiveModalElement(event);
  });

  function closeActiveModalElement(event) {
    let modal = document.querySelector(".modal");
    if (modal && event.target.closest(".modal") == null) {
      modal.classList.remove("modal");
    }
  }

  function showModalElement(event, className) {
    closeActiveModalElement(event);
    let element = document.querySelector("."+className);
    if (element) {
      element.classList.add("modal");
    }
    event.preventDefault();
    event.stopPropagation()
  }
}());
