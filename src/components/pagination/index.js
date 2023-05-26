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
      <div>
        <Left pageNumber={1} />
        <Center currentPage={currentPage} />
        <Right pageNumber={100}/>
      </div>
    </div>
  );
}

export default memo(Pagination);
