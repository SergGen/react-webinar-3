import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    categoryList: state.catalog.categoryList,
    category: state.catalog.params.category,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    onFilterByCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    // category: useMemo(() => ([
    //   {value: '', title: 'Все'},
    //   {value: '6477698510d1060c910cbb59', title: 'Электроника'},
    //   {value: '6477698510d1060c910cbb5a', title: '- Телефоны'},
    //   {value: '6477698510d1060c910cbb61', title: '- - Смартфоны'},
    //   {value: '6477698510d1060c910cbb62', title: '- - Аксесуары'},
    //   {value: '6477698510d1060c910cbb5b', title: '- Ноутбуки'},
    //   {value: '6477698510d1060c910cbb5c', title: '- Телевизоры'},
    //   {value: '6477698510d1060c910cbb5d', title: 'Книги'},
    //   {value: '6477698510d1060c910cbb5e', title: '- Учебники'},
    //   {value: '6477698510d1060c910cbb5f', title: '- Художественная'},
    //   {value: '6477698510d1060c910cbb60', title: '- Комиксы'},
    // ]), []),
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={select.categoryList} value={select.category} onChange={callbacks.onFilterByCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
