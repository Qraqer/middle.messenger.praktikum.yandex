export default `<div class="chat-messages__list">
  <div class="chat-messages__list-inner">
  {{#each message}}
  <div class="chat-message__textbox {{#if isAuthor}}self{{/if}}">
    <div class="chat-message__body">
      {{{ content }}}
    </div>
    <div class="chat-message__time">{{ datetime }}</div>
  </div>
  {{else}}
  <div class="chat-messages-list empty">Сообщений пока нет</div>
  {{/each}}
  </div>
</div>`;
