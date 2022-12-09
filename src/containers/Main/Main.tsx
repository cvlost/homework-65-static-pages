import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet, useOutlet} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {PageBrief} from "../../types";
import './Main.css';

interface Props {
  loading: boolean;
  pagesBrief: PageBrief[];
}

const Main: React.FC<Props> = ({loading, pagesBrief}) => {
  const outlet = useOutlet();
  let output: React.ReactNode;

  if (loading) output = <Spinner/>;
  else if (outlet) output = outlet;
  else if (pagesBrief.length > 0) output = (
    <div className="alert alert-success mt-3 fs-4 text-center">
      <strong>{`${pagesBrief.length}`}</strong> pages are available now!
    </div>
  );
  else output = (
      <div className="alert alert-warning text-center mt-3 fs-4">
        <strong>No available pages</strong>
      </div>
    );

  return (
    <>
      <Sidebar showPreloader={loading} sidebarData={pagesBrief}/>
      <div className="custom-container">
        {output}
      </div>
    </>
  );
};

export default Main;