export default `<div class="input__box js-input" data-id="{{id}}">
  <label class="input__label">{{label}}</label>
  <span class="input__wrapper">
    <input
      id="{{id}}"
      name="{{name}}"
      type="{{type}}"
      {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
      value="{{value}}"
      class="input__text"
      {{#if rule}}data-rule="{{rule}}"{{/if}}
    >
  </span>
  {{#if error}}
  <span class="input__error">{{error}}</span>
  {{/if}}
</div>`;
