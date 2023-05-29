import {memo, useCallback, useState} from 'react';
import PageLayout from "../../components/page-layout";
import {Route, Routes} from "react-router-dom";
import PageError from "../../components/page-error";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import PageList from "../page-list";
import PageItem from "../page-item";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Main() {
  const store = useStore();
  const [headTitle, setHeadTitle] = useState('');
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    head: state.translation.items.head[state.translation.current],
    item: state.translation.items.item[state.translation.current],
    basketTool: state.translation.items.basketTool[state.translation.current],
    pagination: state.translation.items.pagination[state.translation.current],
    current: state.translation.current
  }));
  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store.actions.modals]),
    changeTranslation: useCallback((lang) => store.actions.translation.setTranslation(lang), [store.actions.translation]),
    changeHeadTitle: useCallback((title) => { setHeadTitle(title); }, [headTitle])
  }
  return (
    <PageLayout>
      <Head translation={headTitle} current={select.current} onChangeLang={callbacks.changeTranslation}/>
      <BasketTool translation={select.basketTool} onOpen={callbacks.openModalBasket}
                  amount={select.amount} sum={select.sum}/>
      <Routes>
        <Route path="/" element={<PageList onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/:currentPage" element={<PageList onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/item/:currentItemId" element={<PageItem onChangeHeadTitle={callbacks.changeHeadTitle}/>}/>
        <Route path="/*" element={<PageError/>}/>
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
