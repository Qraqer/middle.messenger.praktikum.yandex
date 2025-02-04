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
      <div class="profile__body">
      {{#each profile}}
        <dl class="profile__row">
          <dt class="profile__row-label">{{label}}</dt>
          <dl class="profile__row-value">{{value}}</dl>
        </dl>
      {{/each}}
      </div>
      <div class="profile__buttons">
        {{{ links }}}
      </div>
    </div>
  </div>
</div>
`;
