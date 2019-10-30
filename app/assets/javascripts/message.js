$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}">` : ``
    var html = `<div class="message">
                  <div class= "upper-message">
                    <div class= "upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class= "upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('input').prop('disabled',false);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
      $('input').prop('disabled',false);
    })
  })
  
  $('document').ready(function(){
    $(".main").animate({scrollTop:$('.footer__framwork')}, 500, 'swing');
  })
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({ 
        url: "api/messages", 
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id} 
      })
      .done(function (messages) { 
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          $('.messages').append(insertHTML);
        })
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
