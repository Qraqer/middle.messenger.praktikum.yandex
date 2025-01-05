export default `<div class="profile">
  <div class="profile__backlink">
    {{{ backlink }}}
  </div>
  <div class="profile__container">
    <div class="profile__inner">
      <div class="profile__avatar">
        <div class="profile__avatar-img">
          <div class="profile__avatar-no"></div>
          <div class="profile__avatar-change">Поменять аватар</div>
          <div class="hidden">
            <form action=""><input type="file" name="avatar"></form>
          </div>
        </div>
        {{#if (checkIfEqual profileState 'profile')}}
        <div class="profile__name-title">Иван</div>
        {{/if}}
      </div>
      {{#if (checkIfNotEqual profileState 'profile')}}
      <form action="" id="form-{{profileState}}">
      {{/if}}
      <div class="profile__body">
      {{#if (checkIfEqual profileState 'profile')}}
        {{{ profilerow }}}
      {{/if}}
      {{#if (checkIfEqual profileState 'profile-edit')}}
        {{{ profilerowedit }}}
      {{/if}}
      {{#if (checkIfEqual profileState 'profile-pasword')}}
        {{{ profilerowedit }}}
      {{/if}}
      </div>
      {{#if (checkIfEqual profileState 'profile')}}
      <div class="profile__buttons">
        {{{ links }}}
      </div>
      {{/if}}
      {{#if (checkIfNotEqual profileState 'profile')}}
      <div class="profile__single-button">
        {{{ button }}}
      </div>
      </form>
      {{/if}}
    </div>
  </div>
</div>
`;
