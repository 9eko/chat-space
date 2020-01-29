$(function() {
  function buildHTML(message) {
    if ( message.image ) {
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
        <img src=${message.image} >
      </div>`
      return html;
    } else {
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
      return html;
    };
  }

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

});