import {memo} from "react";
import {Link} from "react-router-dom";
import './style.css';
import useSelector from "../../store/use-selector";

function PageError() {
  const select = useSelector(state => ({
    notFound: state.translation.items.notFound[state.translation.current],
  }));
  console.log()
  return (
    <div className="PageError">
      <h3>{select.notFound.message}</h3>
      <Link to="/">{select.notFound.link}</Link>
    </div>
  );
}

export default memo(PageError);
