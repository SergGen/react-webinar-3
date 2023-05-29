import {memo, useCallback, useEffect} from "react";
import List from "../../components/list";
import useSelector from "../../store/use-selector";
import Item from "../../components/item";
import useStore from "../../store/use-store";
import {redirect, useParams} from "react-router-dom";
import Pagination from "../../components/pagination";

function PageList() {
  const currentPage = Number(useParams().currentPage) || 1;
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    pageAmount: state.catalog.pageAmount,
    perPage: state.catalog.perPage,
    item: state.translation.items.item[state.translation.current],
    pagination: state.translation.items.pagination[state.translation.current],
  }));

  useEffect(() => {
    store.actions.catalog.load(currentPage, select.perPage).catch(() => {
      redirect('/page404');
    });
  }, [currentPage, select.perPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
    // Открытие модалки корзины
    changePerPage: useCallback((newPerPage) => store.actions.catalog.setPerPage(newPerPage), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item translation={select.item} item={item} onAdd={callbacks.addToBasket}/>
    }, [select.item, callbacks.addToBasket]),
  };
  return (
    <>
      <List list={select.list} renderItem={renders.item}/>
      {select.pageAmount > 1 &&
        <Pagination onChangePerPage={callbacks.changePerPage} translation={select.pagination} perPage={select.perPage}
                    currentPage={currentPage} pageAmount={select.pageAmount}/>}
    </>
  );
}

export default memo(PageList)
