export default `<div class="chat-box">
{{#if currentChat}}
  <div class="chat-body__titlebox">
    <div class="chat-body__namebox">
      <div class="chat-body__avatar">
      {{{ avatar }}}
      </div>
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
        {{{ addUser }}}
        {{{ deleteUser }}}
        {{{ deleteChat }}}
        </div>
      </div>
    </div>
  </div>
  {{{ chatMessages }}}
   <div class="chat-body__newbox">
    <form action="" id="newmessage">
      <div class="newmessage">
        <div class="newmessage__attach js-menu-parent">
          <button class="newmessage__attach-btn js-show-menu" type="button" id="attach">
            <span class="ico-attach">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936
                  14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304
                  14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863
                  22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <div class="newmessage__attach-popup popup_rounded">
            <div class="newmessage__attach-inner">
              <div class="chat-body__menu-link">
                <span class="chat-body__menu-icon media"></span>
                <span class="chat-body__menu-title">Фото или Видео</span>
              </div>
              <div class="chat-body__menu-link">
                <span class="chat-body__menu-icon file"></span>
                <span class="chat-body__menu-title">Файл</span>
              </div>
              <div class="chat-body__menu-link">
                <span class="chat-body__menu-icon location"></span>
                <span class="chat-body__menu-title">Локация</span>
              </div>
            </div>
          </div>
        </div>
        <div class="newmessage__input">
          <input type="text" name="message" id="message" class="input__message" placeholder="Сообщение" data-rule="notempty">
        </div>
        <div class="newmessage__send">
          {{{ sendMessage }}}
        </div>
      </div>
    </form>
  </div>
{{else}}
 <div class="chat-box empty">Выберите чат для просмотра сообщений</div>
{{/if}}
{{{ addUserModal }}}
{{{ delUserModal }}}
{{{ delChatModal }}}
</div>`;
