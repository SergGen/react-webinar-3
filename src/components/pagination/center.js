import {memo} from "react";

function Center({currentPage}) {
  return (
    <div>
      {currentPage}
    </div>
  );
}

export default memo(Center);
