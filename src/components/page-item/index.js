import {memo, useCallback, useEffect, useState} from "react";
import {useParams, redirect} from "react-router-dom";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {Api} from "../../api";
import ItemDetail from "../item-detail";

function PageItem() {
  const { currentItemId} = useParams();
  const [item, setItem] = useState({});
  const store = useStore();
  useEffect(() => {
    const loadItemData = async () => {
      return await Api.getItem(currentItemId);
    }
    loadItemData().then((data) => {
      setItem(data.result);
      return data.result;
    }).catch(() => {
      redirect('/page404');
    });
  }, []);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <>
      <Head title={item.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDetail item={item} onAdd={callbacks.addToBasket}/>
    </>
  );
}

export default memo(PageItem);

