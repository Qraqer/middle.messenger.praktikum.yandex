export default `<dl class="profile__row">
  <dt class="profile__row-label">{{label}}</dt>
  <dl class="profile__row-value">
    <input
      type="{{#if type}}{{type}}{{else}}text{{/if}}"
      value="{{value}}"
      id="{{id}}"
      name="{{name}}"
      {{#if rule}}data-rule="{{rule}}"{{/if}}
    >
  </dl>
</dl>`;
