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
  useEffect(() => {
    store.actions.catalog.load(currentPage).catch(() => { redirect('/page404'); });
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageAmount: state.catalog.pageAmount,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };
  return (
    <>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      {select.pageAmount > 1 && <Pagination currentPage={currentPage} pageAmount={select.pageAmount} />}
    </>
  );
}

export default memo(PageList)
