export default `<div id="{{ id }}" class="modal" style="display:none;">
  <div class="modal__bg"></div>
  <div class="modal__box">
    <div class="modal__panel">
      <h3 class="modal__title">
        {{ title }}
      </h3>
      <form class="modal__form">
        <div class="modal__content">
          {{{ content }}}
        </div>
        <div class="modal__btns">
          {{{ cancel }}}
          {{{ submit }}}
        </div>
      </form>
    </div>
  </div>
</div>`;
