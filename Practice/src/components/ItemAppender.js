import Component from "../core/Component.js";

export default class ItemAppender extends Component {

  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />
    <button class="appenderBtn">추가</button>
    `;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
    this.addEvent('click', '.appenderBtn', ({ target }) => {
        const input = document.querySelector('.appender');
        return addItem(input.value);
      });
  }
}