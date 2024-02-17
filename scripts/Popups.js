


function confirmation(headerMessage,message) {
    var popup = document.createElement('div');
    popup.className = 'popup-container';
    popup.innerHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>PopUp</title>
    <style>

.main {
    position: fixed; 
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: #d8d8d8;
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
        .message{
          display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size:medium;
        }

        .headerMessage{
          margin-top: 40px;
          margin-bottom: 10px;
          display: flex; 
            align-items: center; 
            justify-content: center; 
            color:#030a0c;
            font-size: large;
            font-weight: bold;
            
        }
        .button1,.button2 {
            all: unset;
            border-radius: 5px;
            margin: 16px 8px;
            padding: 6px 40px; 
           
transition: background-color 0.3s ease;
        }
        .button1{
          background-color:#ffffff;
          border: 0.5px solid #030a0c; 
        }
        .button2{
          color:#ffffff;
          background-color: #030a0c;


        }
        .button1:hover,.button2:hover {
          background-color: #ee5417;;
          border: 0px;

        }
    
    .closeButton {
    position: absolute;
    top: 5px;
    right: 10px; 
    background-color: transparent;
    border: none;
    color: #000;
    font-size: 15px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
}

.closeButton:hover {
    color: #ff0000;
}

    </style>
</head>
<body>
    <div class="main">
      <button class="closeButton" onClick="hidePopup()">x</button> 
        <div class="background">
          <p class="headerMessage">${headerMessage}</p>
          <p class="message">${message}</p>
        </div>
        <div class="mainButton">
            <button class="button1" onClick="hidePopup()" >No</button>
            <button class="button2" onClick="hidePopup() ">Yes</button>
        </div>
    </div>
</body>
</html>
    `;
    document.body.appendChild(popup);
}




function alert(headerMessage,message) {
    var popup = document.createElement('div');
    popup.className = 'popup-container';
    popup.innerHTML = `
      

      
<!DOCTYPE html>
<html>
<head>
    <title>PopUp</title>
    <style>

.main {
    position: fixed; 
    top: 0%;
    left: 50%; 
    transform: translate(-50%, 0%);
    background-color: #d8d8d8;
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
        .message{
          display: flex; 
            align-items: center; 
            justify-content: center; 
            color:#030a0c;
            font-size:medium;
        }

        .headerMessage{
            margin-top: 40px;
            margin-bottom: 10px;
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color:#030a0c;
            font-size: large;
            font-weight: bold;
            
        }
        .button1 {
            all: unset;
            border-radius: 5px;
            margin: 16px 8px; 
            padding: 6px 40px;
            transition: background-color 0.3s ease;
            background-color:#ffffff;
            border: 0.5px solid #030a0c; 
        }
  
        .button1:hover,.button2:hover {
          background-color: #ee5417;;
          border: 0px;

        }
    
    .closeButton {
    position: absolute;
    top: 5px; 
    right: 10px; 
    background-color: transparent;
    border: none;
    color: #000;
    font-size: 15px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
}

.closeButton:hover {
    color: #ff0000;
}

    </style>
</head>
<body>
    <div class="main">
      <button class="closeButton" onClick="hidePopup()">x</button> 
        <div class="background">
          <p class="headerMessage">${headerMessage}</p>
          <p class="message">${message}</p>
        </div>
        <div class="mainButton">
            <button class="button1" onClick="hidePopup()" >Ok</button>
        </div>
    </div>
</body>
</html>
    `;
    document.body.appendChild(popup);
}

function hidePopup() {
    var popup = document.querySelector('.popup-container');
    if (popup) {
        popup.parentNode.removeChild(popup);
    }
}

