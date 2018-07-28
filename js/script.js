(function () {
  "use strict";
  let blckoutElement = document.querySelector(".modal-blackout");

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
      showModalElement(event, "feedback-panel", true);
    });
  }

  let feedbackButtonCloseButton = document.querySelector(".feedback-panel-close-button");
  if (feedbackButtonCloseButton) {
    feedbackButtonCloseButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeActiveModalElement();
    });
  }

  let forms = document.querySelectorAll("form");
  if (forms) {
    for (let i = 0; i < forms.length; i++) {
      addFormValidation(forms[i]);
    }
  }


  document.body.addEventListener("click", function (event) {
    closeActiveModalElement(event);
  });

  function addFormValidation(form) {
    let formInputs = form.querySelectorAll("input[type='text'],input[type='email'],input[type='search'],input[type='password']");
    if (formInputs) {
      for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("keydown", function (event) {
          if (event.keyCode === 27) {
            validateForm(form);
          }
        })
      }
    }
    let submitButtons = form.querySelectorAll("button[type='submit']");
    if (submitButtons) {
      for (let i = 0; i < submitButtons.length; i++) {
        submitButtons[i].addEventListener("click", function (event) {
          validateForm(form);
        })
      }
    }
  }

  function validateForm(form) {
    if (!form.checkValidity()) {
      let panel = form.parentElement;
      panel.classList.add("error-form");
      setTimeout(function () {
        panel.classList.remove("error-form");
      }, 1000);
    }
  }

  function closeActiveModalElement(event) {
    let modal = document.querySelector(".modal");
    if (!modal) {
      return;
    }
    if (event) {
      if (!clickedOutside(event)) {
        return;
      }
    }
    if (blckoutElement && !blckoutElement.classList.contains("temporary-hidden")) {
      blckoutElement.classList.add("temporary-hidden");
    }
    modal.classList.add("slide-out");
    setTimeout(function () {
      modal.classList.remove("modal");
      modal.classList.remove("slide-out");
    }, 600);

  }

  function clearInputs(modalElement) {
    if (!modalElement) {
      return;
    }
    let inputs = modalElement.querySelectorAll("input,textarea");
    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
  }

  function clickedOutside(event) {
    return getParentWithClass(event.target, "modal") == null;
  }

  function getParentWithClass(node, className) {
    while (node) {
      if (node.classList.contains(className)) return node;
      else node = node.parentElement;
    }
    return null;
  }

  function showModalElement(event, className, showBlackout) {
    event.preventDefault();
    event.stopPropagation();
    closeActiveModalElement();
    let element = document.querySelector("." + className);
    if (element) {
      clearInputs(element);
      element.classList.add("modal");
      element.classList.add("slide-in");
      let firstInput = element.querySelector("input,textarea");
      firstInput.focus();
      if (showBlackout && blckoutElement) {
        blckoutElement.classList.remove("temporary-hidden");
      }
      setTimeout(function () {
        element.classList.remove("slide-in");
      }, 1000);
    }
  }
}());
