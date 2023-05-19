/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {list: [], cart: []}) {
    this.state = initState;
    if (!Object.hasOwn(initState, 'cart')) {
      this.state.cart = [];
    }
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
  #setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  removeItemFromCart(code) {
    this.#setState({
      ...this.state,
      cart: [...this.state.cart.filter((item) => item.code !== code)]
    });
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addToCart(code) {
    const newItem = this.state.list.find(item => item.code === code);
    const foundItem = this.state.cart.find((item) => item.code === newItem.code);
    if(foundItem) {
      this.#setState({
        ...this.state,
        cart: [
          ...this.state.cart.filter((item) => item.code !== newItem.code),
          {...foundItem, quantity: foundItem.quantity + 1}
        ]
      });
    } else {
      this.#setState({...this.state, cart: [...this.state.cart, {...newItem, quantity: 1}]});
    }
  };
}

export default Store;
