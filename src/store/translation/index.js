import StoreModule from "../module";

class Translation extends StoreModule {
  initState() {
    return {
      current: 'ru',
      items: {
        head: {
          ru: {
            title: 'Магазин'
          },
          en: {
            title: 'Store'
          }
        },
        basketTool: {
          ru: {
            homeLink: 'Главная',
            basketButton: 'Перейти',
            inBasket: 'В корзине',
            empty: 'пусто',
            pluralKey: 'ru-RU',
            plural: {one: 'товар', few: 'товара', many: 'товаров'}
          },
          en: {
            homeLink: 'Main',
            basketButton: 'Go to basket',
            inBasket: 'Basket',
            empty: 'empty',
            pluralKey: 'en-EN',
            plural: {one: 'good', two: 'goods', few: 'goods', many: 'goods', other: 'goods'}
          }
        },
        item: {
          ru: {
            add: 'Добавить',
            madeIn: 'Страна производитель',
            category: 'Категория',
            releaseAt: 'Год выпуска',
            price: 'Цена',
            pluralKey: 'ru-RU',
          },
          en: {
            add: 'Add',
            madeIn: 'Manufacturer country',
            category: 'Category',
            releaseAt: 'Year of release',
            price: 'Price',
            pluralKey: 'en-EN',
          }
        },
        basket: {
          ru: {
            title: 'Корзина',
            close: 'Закрыть',
            delete: 'Удалить',
            total: 'Итого',
            pieces: 'шт',
            pluralKey: 'ru-RU',
          },
          en: {
            title: 'Basket',
            close: 'Close',
            delete: 'Delete',
            total: 'Total',
            pieces: 'pcs',
            pluralKey: 'en-EN',
          }
        }
      }
    }
  }

  setTranslation(lang) {
    this.setState({
      ...this.getState(),
      current: lang
    }, `Смена языка интерфейса на ${lang}`);
  }

}

export default Translation;
