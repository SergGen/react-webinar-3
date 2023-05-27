import {memo, useCallback, useEffect} from "react";
import Head from "../head";
import BasketTool from "../basket-tool";
import List from "../list";
import useSelector from "../../store/use-selector";
import Item from "../item";
import useStore from "../../store/use-store";
import {redirect, useParams} from "react-router-dom";
import Pagination from "../pagination";

function PageList() {
  const currentPage = Number(useParams().currentPage) || 1;
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageAmount: state.catalog.pageAmount,
    perPage: state.catalog.perPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    head: state.translation.items.head[state.translation.current],
    item: state.translation.items.item[state.translation.current],
    basketTool: state.translation.items.basketTool[state.translation.current],
    current: state.translation.current
  }));

  useEffect(() => {
    store.actions.catalog.load(currentPage, select.perPage).catch(() => { redirect('/page404'); });
  }, [currentPage, select.perPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
    changeTranslation: useCallback((lang) => store.actions.translation.setTranslation(lang), [store.actions.translation])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item translation={select.item} item={item} onAdd={callbacks.addToBasket}/>
    }, [select.item, callbacks.addToBasket]),
  };
  return (
    <>
      <Head translation={select.head} current={select.current} onChangeLang={callbacks.changeTranslation}/>
      <BasketTool translation={select.basketTool} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      {select.pageAmount > 1 && <Pagination currentPage={currentPage} pageAmount={select.pageAmount} />}
    </>
  );
}

export default memo(PageList)
