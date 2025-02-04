export default `<div class="profile">
  <div class="profile__backlink">
    {{{ backlink }}}
  </div>
  <div class="profile__container">
    <div class="profile__inner">
      <div class="profile__avatar">
        <div class="profile__avatar-img">
          <div class="profile__avatar-no"></div>
          {{{ avatar }}}
        </div>
        <div class="profile__name-title">{{display_name}}</div>
      </div>
      <form action="" id="form-profile">
      <div class="profile__body">
        <dl class="profile__row">
          <dt class="profile__row-label">Старый пароль</dt>
          <dl class="profile__row-value">{{{ oldpsw }}}</dl>
        </dl>
        <dl class="profile__row">
          <dt class="profile__row-label">Новый пароль</dt>
          <dl class="profile__row-value">{{{ newpsw }}}</dl>
        </dl>
        <dl class="profile__row">
          <dt class="profile__row-label">Повторение нового пароля</dt>
          <dl class="profile__row-value">{{{ newpswrepeat }}}</dl>
        </dl>
      </div>
      <div class="profile__single-button">
        {{{ button }}}
      </div>
      </form>
    </div>
  </div>
</div>
`;
