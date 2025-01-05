// Monitor for the send button click
function initializeEmailChecker() {
  const observer = new MutationObserver((mutations) => {
    const sendButton = document.querySelector(
      'div[role="button"][data-tooltip*="Send"][class*="T-I J-J5-Ji aoO"]'
    );
    if (sendButton) {
      if (!sendButton.hasListener) {
        sendButton.hasListener = true;
        sendButton.addEventListener("click", checkEmailContent, true);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Function to check email content
function checkEmailContent(event) {
  const emailContent = document.querySelector(
    'div[role="textbox"][aria-label*="Message Body"], div[aria-label*="Message Body"]'
  );
  if (!emailContent) return;

  const content = emailContent.innerText.toLowerCase();

  if (content.includes("best retards")) {
    // Don't prevent default immediately
    event.stopImmediatePropagation();

    if (
      confirm(
        'WARNING: Your email contains "Best retards". Did you mean "Best regards"?\n\nClick OK to send anyway or Cancel to edit the email.'
      )
    ) {
      // Remove our listener temporarily
      const sendButton = event.currentTarget;
      sendButton.removeEventListener("click", checkEmailContent, true);
      sendButton.hasListener = false;

      // Trigger the click and restore the listener
      setTimeout(() => {
        sendButton.click();
        sendButton.addEventListener("click", checkEmailContent, true);
        sendButton.hasListener = true;
      }, 0);
    } else {
      event.preventDefault();
    }
  }
}

// Initialize when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeEmailChecker);
} else {
  initializeEmailChecker();
}
