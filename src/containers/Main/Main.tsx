import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet, useOutlet} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {SidebarEntity} from "../../types";

interface Props {
  loading: boolean;
  sidebarData: SidebarEntity[];
}

const Main: React.FC<Props> = ({loading, sidebarData}) => {
  const outlet = useOutlet();
  let output: React.ReactNode;

  if (loading) output = <Spinner/>;
  else if (outlet) output = outlet;
  else if (sidebarData.length > 0) output = (
    <div className="alert alert-success mt-3 fs-4 text-center">
      <strong>{`${sidebarData.length}`}</strong> pages are available now!
    </div>
  );
  else output = (
      <div className="alert alert-warning text-center mt-3 fs-4">
        <strong>No available pages</strong>
      </div>
    );

  return (
    <>
      <Sidebar showPreloader={loading} sidebarData={sidebarData}/>
      <div className="container-fluid">
        {output}
      </div>
    </>
  );
};

export default Main;