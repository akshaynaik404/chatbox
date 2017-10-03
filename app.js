window.onload = function () {
  // console.log('Window is loaded');
  let numberOfUsers = 0;
  let $addNewBtn = document.querySelector('.add-new-btn');
  // console.log($addNewBtn);
  $addNewBtn.addEventListener('click', function (e) {
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
        let $chatBox = document.querySelector(`.chatbox-user${i} > .chat`);
        let $sentMsgEle = document.createElement(`div`);
        $sentMsgEle.innerHTML = msg;
        $sentMsgEle.classList.add('sent');
        $sentMsgEle.classList.add('msg');
        $chatBox.appendChild($sentMsgEle);
      } else {
        let $chatBox = document.querySelector(`.chatbox-user${i} > .chat`);
        let $sentMsgEle = document.createElement(`div`);
        $sentMsgEle.innerHTML = `${user}: ${msg}`;
        $sentMsgEle.classList.add('recieved');
        $sentMsgEle.classList.add('msg');
        $chatBox.appendChild($sentMsgEle);
        // $('.chatbox-user' + i).find(".chat").append(`<div class="recieved msg">${user}: ${msg}</div>`);
      }
      // console.log('sendMessage');
    }

  }
  // Event delegation is better with jQuery - Change to Vanilla JS at a later point
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
}
