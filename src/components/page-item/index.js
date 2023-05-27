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
    sum: state.basket.sum,
    basketTool: state.translation.items.basketTool[state.translation.current],
    item: state.translation.items.item[state.translation.current],
    current: state.translation.current
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
    changeTranslation: useCallback((lang) => store.actions.translation.setTranslation(lang), [store.actions.translation])
  }

  return (
    <>
      <Head translation={item} current={select.current} onChangeLang={callbacks.changeTranslation}/>
      <BasketTool translation={select.basketTool} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDetail translation={select.item} item={item} onAdd={callbacks.addToBasket}/>
    </>
  );
}

export default memo(PageItem);

