import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Left from "./left";
import Right from "./right";
import Center from "./center";
function Pagination({currentPage, pageAmount}) {
  const cn = bem('Pagination');
  return (
    <div className={cn()}>
      <div className={cn('block')}>
        {currentPage > 2 && <Left currentPage={currentPage} />}
        <Center currentPage={currentPage} pageAmount={pageAmount} />
        {pageAmount > currentPage + 1 && <Right currentPage={currentPage} pageNumber={pageAmount}/>}
      </div>
    </div>
  );
}

export default memo(Pagination);
