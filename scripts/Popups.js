// Define the HTML template string outside the function
var htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <title>PopUp</title>
    <style>
      .main {
        position: fixed;
        top: 0%;
        left: 50%;
        transform: translate(-50%, 0%);
        background-color: #ffffff;
        height: 150px;
        width: 430px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border-radius: 10px;
        box-shadow: 1px 10px 19px -2px rgba(0, 0, 0, 0.48);
        -webkit-box-shadow: 1px 10px 19px -2px rgba(0, 0, 0, 0.48);
        -moz-box-shadow: 1px 10px 19px -2px rgba(0, 0, 0, 0.48);
      }

      .background {
        width: auto;
        height: 100px;
      }

      .mainButton {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .message {
        padding-left: 50px;
        font-size: medium;
      }

      .headerMessage {
        margin-top: 40px;
        margin-bottom: 10px;
        padding-left: 40px;
        color: #030a0c;
        font-size: large;
        font-weight: bold;
      }
      .button1,
      .button2 {
        all: unset;
        border-radius: 5px;
        margin: 16px 8px;
        padding: 6px 40px;
        transition: background-color 0.3s ease;
      }
      .button1 {
        background-color: #ffffff;
        border: 1px solid #030a0c;
      }
      .button2 {
        color: #ffffff;
        background-color: #ee5417;
        border: 1px solid #ffffff;
        box-shadow: 0 0 0 2px #ee5417;
      }

      .button1:hover {
        background-color: #e4e4e4;
        border: 1px solid #030a0c;
      }
      .button2:hover {
        color: #ffffff;
        background-color: #c64614;
        border: 1px solid #ffffff;
        box-shadow: 0 0 0 2px #c64614;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="background">
        <p class="headerMessage">{headerMessage}</p>
        <p class="message">{message}</p>
      </div>
      <div class="mainButton">
        <button class="button1" onClick="hidePopup()">No</button>
        <button class="button2" onClick="hidePopup()">Yes</button>
      </div>
    </div>
  </body>
</html>`;

// Function to generate HTML with provided headerMessage and message
function generateHTML(headerMessage, message) {
    return htmlTemplate.replace('{headerMessage}', headerMessage).replace('{message}', message);
}

// Function to show the popup
function confirmation(headerMessage, message) {
    var popup = document.createElement('div');
    popup.className = 'popup-container';
    popup.innerHTML = generateHTML(headerMessage, message); // Generate HTML with provided headerMessage and message
    document.body.appendChild(popup);
}

// Function to hide the popup
function hidePopup() {
    var popup = document.querySelector('.popup-container');
    if (popup) {
        popup.parentNode.removeChild(popup);
    }
}
