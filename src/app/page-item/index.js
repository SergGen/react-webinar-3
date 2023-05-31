import {memo, useCallback, useEffect, useState} from "react";
import {useParams, redirect} from "react-router-dom";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from "../../components/item-detail";
import Loading from "../../components/Loading";

function PageItem() {
  const { currentItemId} = useParams();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    store.actions.item.load(currentItemId)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        redirect('/page404');
      });
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
    <>
      {isLoading ? <Loading/> : <ItemDetail translation={select.itemTranslation} item={select.item} onAdd={callbacks.addToBasket}/>}
    </>
  );
}

export default memo(PageItem);

