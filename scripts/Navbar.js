
function openOverlay() {
      var html = '<div id="overlay">' +
                      '<div id="notificationContainer" class="notification">' +
                          '<div class="notificationHeader">Notification</div>' +
                          '<div class="notes">' +
                              '<b>Re: Support Case (#123i219021)</b> <span onclick="markAllRead()">-</span>' + 
                              '<p>Lorem ipsum dolor sit amet consectetur. Ornare massa nunc nibh tristique. Non ligula tristique ut ut libero</p>' +
                          '</div>' +
                          '<div class="notificationFooter">' +
                              '<button><img src="../Images/Setting.png" width="20" height="20"/></button>&nbsp;&nbsp;' +
                              '<button onclick="markAllRead()"><img src="../Images/double-tick.png" width="20" height="20"/><span>&nbsp;Mark all read</span></button>' +
                          '</div>' +
                      '</div>' +
                  '</div>';

      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      document.body.appendChild(tempDiv.firstChild);
      document.getElementById('overlay').style.display = 'block';

      document.getElementById('overlay').addEventListener('click', function(event) {
          if (event.target === this) {
              this.style.display = 'none';
          }
      });
  }

  function markAllRead() {
    var notificationContainer = document.getElementById('notificationContainer');

    notificationContainer.innerHTML = `
        <div class="notificationHeader">Notification</div>
        <div class="notificationBodyEmpty">
            <img src="../Images/EmptyNotification.png" width="258" height="235.5"/>
            <h3>No Notifications Yet </h3>
            <h5 class="CBL">Come Back Later</h5>
        </div>
    `;

    document.getElementById('overlay').style.display = 'block';
}
