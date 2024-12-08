export default `<div class="chat-body">
  <div class="chat-body__titlebox">
    <div class="chat-body__namebox">
      <div class="chat-body__avatar"></div>
      <div class="chat-body__name">{{chat.title}}</div>
    </div>
    <div class="chat-body__menu js-menu-parent">
      <button class="chat-body__menu-btn js-show-menu" id="chatmenu">
        <span class="ico-submenu">
          <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1.5" cy="2" r="1.5" fill="currentColor"/>
            <circle cx="1.5" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="1.5" cy="14" r="1.5" fill="currentColor"/>
          </svg>
        </span>
      </button>
      <div class="chat-body__menu-popup popup_rounded">
        <div class="chat-body__menu-inner">
          <div class="chat-body__menu-link">
            <span class="chat-body__menu-icon add"></span>
            <span class="chat-body__menu-title">Добавить пользователя</span>
          </div>
          <div class="chat-body__menu-link">
            <span class="chat-body__menu-icon delete"></span>
            <span class="chat-body__menu-title">Удалить пользователя</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="chat-body__mainbox">
    {{#each chat.messages}}
      {{> ChatMessage author=author datetime=datetime type=type body=body read=read}}
    {{/each}}
  </div>
  <div class="chat-body__newbox">{{> NewMessage }}</div>
</div>`;