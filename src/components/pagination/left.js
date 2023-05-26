import {memo} from "react";

function Left({pageNumber}) {
  return (
    <div>
      {pageNumber}
    </div>
  )
}

export default memo(Left);