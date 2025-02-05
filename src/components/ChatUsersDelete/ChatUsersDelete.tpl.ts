export default `<div class="modal-inner__checkboxes">
{{#each chatuser}}
<span class="chat-users__item">
  <input class="hidden__checkbox" id="chatuser_{{id}}" type="checkbox" name="chatuser[{{id}}]" value="{{id}}">
  <label class="hidden__label" for="chatuser_{{id}}">{{login}} - {{display_name}} ({{first_name}} {{second_name}})</label>
</span>
{{/each}}
</div>`;
