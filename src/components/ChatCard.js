export default `<div class="chat-card js-open-chat" data-id="{{id}}">
  <div class="chat-card__avatar"></div>
  <div class="chat-card__textbox">
    <div class="chat-card__title">{{title}}</div>
    <div class="chat-card__message">{{{text}}}</div>
  </div>
  <div class="chat-card__infobox">
    <div class="chat-card__datetime">{{date}}</div>
    <div class="chat-card__counter">{{#if notRead}}
      <div class="chat-card__counter-circle">{{notRead}}</div>
    {{/if}}</div>
  </div>
</div>`;