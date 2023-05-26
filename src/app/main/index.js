import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import {Outlet, useParams} from "react-router-dom";

function Main() {
  return (
    <PageLayout>
      <Outlet/>
    </PageLayout>
  );
}

export default memo(Main);
