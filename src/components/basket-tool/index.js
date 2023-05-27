import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({translation, sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={'/'}>{translation.homeLink}</Link>
      <div>
        <span className={cn('label')}>{translation.inBasket}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translation.plural, translation.pluralKey)} / ${numberFormat(sum,translation.pluralKey)} ₽`
          : translation.empty
        }
      </span>
        <button onClick={onOpen}>{translation.basketButton}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
