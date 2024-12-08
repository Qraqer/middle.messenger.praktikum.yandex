export default `<dl class="profile__row">
  <dt class="profile__row-label">{{label}}</dt>
  {{#if (checkIfEqual edit 'Y')}}
  <dl class="profile__row-value">{{value}}</dl>
  {{else}}
  <dl class="profile__row-value">
    <input type="{{#if type}}{{type}}{{else}}text{{/if}}" value="{{value}}" name="{{name}}">
  </dl>
  {{/if}}
</dl>`;