import {memo} from "react";

function Right({pageNumber}) {
  return (
    <div>
      {pageNumber}
    </div>
  );
}

export default memo(Right);
