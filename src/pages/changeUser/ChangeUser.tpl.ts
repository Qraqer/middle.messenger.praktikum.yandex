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
      {{{ editrows }}}
      </div>
      <div class="profile__single-button">
        {{{ button }}}
      </div>
      </form>
    </div>
  </div>
</div>
`;
