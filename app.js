$(function () {
  // var chatroom = [];
  let numberOfUsers = 0;
  $('.add-new-btn').click(function (e) {
    // console.log('add-new-btn');
    e.preventDefault();
    let username = "user" + numberOfUsers;
    numberOfUsers++;

    let chatboxHTMLStr = `
      <div class="chatbox chatbox-${username}">
        <div class="chat">
        </div>
        <div class="input-container">
          <input type="text" class="chat-input" id="${username}"/>
          <button class="send">Send</button>
        </div>
      </div>`;

    $('.container').append(chatboxHTMLStr);
  })

  function sendMessage(user, msg) {
    // var msgObj = {};
    // msgObj[user] = msg;
    // chatroom.push(msgObj);
    for (let i = 0; i < numberOfUsers; i++) {
      // console.log(user, `user${i}`);
      if(user === `user${i}`) {
        $('.chatbox-user' + i).find(".chat").append(`<div class="sent msg">${msg}</div>`);
      } else {
        $('.chatbox-user' + i).find(".chat").append(`<div class="recieved msg">${user}: ${msg}</div>`);
      }
      // console.log('sendMessage');
    }

  }

  $("body").on("keyup", "input.chat-input", function(event){
    if(event.keyCode == 13){
      var user = this.getAttribute('id');
      var msg = this.value;
      this.value = '';
      sendMessage(user, msg)
    }
  });

  $("body").on("click", "button.send", function(event){
    var focusedInput = $(this).siblings('input');
    var msg = focusedInput.val();
    var user = focusedInput.attr('id');
    focusedInput.val('');
    // console.log(user, msg);
    sendMessage(user, msg)
  });
});
