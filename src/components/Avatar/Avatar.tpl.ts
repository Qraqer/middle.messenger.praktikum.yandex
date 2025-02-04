export default `<div class="avatar">
{{#if avatar}}
  <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}">
{{/if}}
{{{ avatarButton }}}
{{{ avatarModal }}}
</div>`;