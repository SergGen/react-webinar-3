import {memo, useCallback, useEffect} from "react";
import {useParams, redirect} from "react-router-dom";
import Head from "../head";
import BasketTool from "../basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from "../item-detail";

function PageItem() {
  const { currentItemId} = useParams();
  const store = useStore();
  useEffect(() => {
    store.actions.item.load(currentItemId).catch(() => { redirect('/page404'); });
  }, [currentItemId]);
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item.info,
    basketTool: state.translation.items.basketTool[state.translation.current],
    itemTranslation: state.translation.items.item[state.translation.current],
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
      <Head translation={select.item} current={select.current} onChangeLang={callbacks.changeTranslation}/>
      <BasketTool translation={select.basketTool} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemDetail translation={select.itemTranslation} item={select.item} onAdd={callbacks.addToBasket}/>
    </>
  );
}

export default memo(PageItem);

