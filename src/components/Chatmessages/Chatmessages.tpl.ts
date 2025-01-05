export default `<div class="chat-message">
  {{#if (checkIfEqual type 'date')}}
  <div class="chat-message__date">{{body}}</div>
  {{/if}}
  {{#if (checkIfNotEqual type 'date')}}
  <div class="chat-message__textbox author{{#if (checkIfEqual author 'self')}}-{{author}}{{/if}} type-{{type}}">
    <div class="chat-message__body">
    {{#if (checkIfEqual type 'media')}}
      <img src="{{body}}" alt="{{body}}">
    {{/if}}
    {{#if (checkIfEqual type 'text')}}{{{body}}}{{/if}}
    </div>
    <div class="chat-message__time">
      {{#if read}}<div class="chat-message__read-yes"></div>{{/if}}
      {{datetime}}
    </div>
  </div>
  {{/if}}
</div>`;