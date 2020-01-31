$(function() {

  var buildHTML = function(message) {
    if ( message.body && message.image ) {
      var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__info">
          <p class="message__info__talker">
            ${message.user_name}
          </p>
          <p class="message__info__timestamp">
            ${message.created_at}
          </p>
        </div>
        <p class="message__text">
          <p class="message__text__body">
            ${message.body}
          </p>
          <img src=${message.image}, class="message__text__image >
        </p>
      </div>`
    } else if (message.body) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__info">
            <p class="message__info__talker">
              ${message.user_name}
            </p>
            <p class="message__info__timestamp">
              ${message.created_at}
            </p>
          </div>
          <p class="message__text">
            <p class="message__text__body">
              ${message.body}
            </p>
          </p>
        </div>`
    } else if (message.image) {
      var html =
        `<div class="message" data-message-id="${message.id}>
          <div class="message__info">
            <p class="message__info__talker">
              ${message.user_name}
            </p>
            <p class="message__info__timestamp">
              ${message.created_at}
            </p>
          </div>
          <p class="message__text">
            <img src=${message.image} ,class="message__text__image >
          </p>
        </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this)
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html).animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight });
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/main-chat__message-list/)) {
    setInterval(reloadMessages, 7000);
  }
  
});