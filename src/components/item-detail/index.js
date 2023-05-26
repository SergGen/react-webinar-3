import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
function ItemDetail({item, onAdd}) {
  const cn = bem('ItemDetail');

  const callbacks = {
    onAdd: (e) => onAdd(item._id)
  }

  return (
    <div className={cn()}>
      <p>{item.description}</p>
      <p>Страна производитель: <span className={cn('bold')}>{item.madeIn?.title} ({item.madeIn?.code})</span></p>
      <p>Категория: <span className={cn('bold')}>{item.category?.title}</span></p>
      <p>Год выпуска: <span className={cn('bold')}>{item.edition}</span></p>
      <p className={cn('price')}>Цена: {numberFormat(item.price)} ₽</p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

export default ItemDetail

