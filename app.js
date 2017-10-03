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
      <div class="chat">
      </div>
      <div class="input-container">
        <input type="text" class="chat-input" id="${username}"/>
        <button class="send">Send</button>
      </div>`;
    // <div class="chatbox chatbox-${username}">
    // </div>
    let $chatbox = document.createElement('div');
    $chatbox.classList.add('chatbox', `chatbox-${username}`);
    $chatbox.innerHTML = chatboxHTMLStr;
    document.querySelector('.container').appendChild($chatbox);
    // $('.container').append($chatbox);
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
        $sentMsgEle.classList.add('sent', 'msg');
        $chatBox.appendChild($sentMsgEle);
      } else {
        let $chatBox = document.querySelector(`.chatbox-user${i} > .chat`);
        let $sentMsgEle = document.createElement(`div`);
        $sentMsgEle.innerHTML = `${user}: ${msg}`;
        $sentMsgEle.classList.add('recieved', 'msg');
        $chatBox.appendChild($sentMsgEle);
        // $('.chatbox-user' + i).find(".chat").append(`<div class="recieved msg">${user}: ${msg}</div>`);
      }
      // console.log('sendMessage');
    }

  }

  // Checks whether an event has occurred inside input.chat-input
  function isEvtInsideInput(evt) {
    return (
      evt.target
      && evt.target.nodeName === 'INPUT'
      && evt.target.classList.contains('chat-input')
    );
  }

  // Add event listener for enter keypress inside input.chat-input
  let $body = document.querySelector('body');
  $body.addEventListener('keyup', function (evt) {
    if(isEvtInsideInput(evt) && evt.keyCode === 13) {
      var user = evt.target.getAttribute('id');
      var msg = evt.target.value;
      evt.target.value = '';
      sendMessage(user, msg)
    }
  });

  $body.addEventListener('click', function (evt) {
    if(evt.target && evt.target.nodeName === 'BUTTON'
      && evt.target.classList.contains('send')) {
      console.log('send button clicked');

      // Vanilla JS implementation of $.siblings() taken from youmightnotneedjquery.com
      let $el = evt.target;
      let siblings = Array.prototype.filter.call($el.parentNode.children, function(child){
        return child !== $el;
      });
      let focusedInput = siblings[0];
      let msg = focusedInput.value;
      let user = focusedInput.getAttribute('id');
      focusedInput.value = '';
      sendMessage(user, msg)
    }
  })
}
