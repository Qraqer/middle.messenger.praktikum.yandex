export default `<div class="found-users">
{{#each found}}
  <div class="found-users__item" data-id="{{id}}" data-login="{{login}}">{{display_name}} ({{first_name}} {{second_name}} / {{login}})</div>
{{/each}}
</div>`;