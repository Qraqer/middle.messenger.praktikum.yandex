export default `<button
  id="{{id}}"
  class="{{class}}"
  {{#if link}}data-link="{{link}}"{{/if}}
  {{#if type}}type="{{type}}"{{/if}}
>{{text}}</button>`