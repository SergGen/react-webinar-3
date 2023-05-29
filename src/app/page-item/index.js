import {memo, useCallback, useEffect} from "react";
import {useParams, redirect} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from "../../components/item-detail";

function PageItem() {
  const { currentItemId} = useParams();
  const store = useStore();
  useEffect(() => {
    store.actions.item.load(currentItemId).catch(() => { redirect('/page404'); });
  }, [currentItemId]);
  const select = useSelector(state => ({
    item: state.item.info,
    basketTool: state.translation.items.basketTool[state.translation.current],
    itemTranslation: state.translation.items.item[state.translation.current],
    current: state.translation.current
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store.actions.basket]),
  }

  return (
      <ItemDetail translation={select.itemTranslation} item={select.item} onAdd={callbacks.addToBasket}/>
  );
}

export default memo(PageItem);

