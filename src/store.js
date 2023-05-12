/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {list: []}) {
    this.state = initState;
    this.id = initState.list.length;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.id++;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.id, title: 'Новая запись', selected: false, selectedCount: 0}]
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        let selectedStatus = false;
        if (item.code === code) {
          selectedStatus = item.selected;
        }
        item.selected = false;
        if (item.code === code) {
          selectedStatus === false && item.selectedCount++;
          item.selected = !selectedStatus;
        }
        return item;
      })
    })
  }
}

export default Store;
