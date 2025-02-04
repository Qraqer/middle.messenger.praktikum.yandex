export default `{{#if (checkIfEqual id '')}}<div class="chat-card__empty">Чаты отсутствуют</div>
{{else}}
<div class="chat-card js-open-chat{{#if selected}} is--active{{/if}}" data-id="{{id}}">
  <div class="chat-card__avatar">
  {{#if (checkIfNotEqual avatar '')}}
  <img src="{{avatar}}">
  {{/if}}
  </div>
  <div class="chat-card__textbox">
    <div class="chat-card__title">{{title}}</div>
    <div class="chat-card__message">{{{last_message.content}}}</div>
  </div>
  <div class="chat-card__infobox">
    <div class="chat-card__datetime">{{last_message.time}}</div>
    <div class="chat-card__counter">{{#if (checkIfNotEqual unread_count 0)}}
      <div class="chat-card__counter-circle">{{unread_count}}</div>
    {{/if}}</div>
  </div>
</div>
{{/if}}`;
