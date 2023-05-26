import {memo} from "react";
import './style.css';

function Loading() {
  return (
    <div className="Loading"><p>Loading....</p></div>
  );
}

export default memo(Loading);
