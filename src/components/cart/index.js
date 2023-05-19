import React from 'react';
import './style.css';
import Head from "../head";
import List from "../list";
import {calcSum, formatNumber} from "../../utils";
export function Cart({cart, onAction, onClose}) {
  return (
    <>
      <div className={'background'}/>
      <div className={'cart'}>
        <Head title='Корзина'>
          <button className={'button_pointer'} onClick={onClose}>Закрыть</button>
        </Head>
        {cart.length > 0 ?
          <div>
            <List onAction={onAction} list={cart}/>
            <div><span>Итого</span><span>{formatNumber(calcSum(cart))} &#8381;</span></div>
          </div>
           : <p>Корзина пуста</p>}
      </div>
    </>
  );
}