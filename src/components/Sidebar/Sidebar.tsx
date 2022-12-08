import React from 'react';
import {NavLink} from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import {SidebarEntity} from "../../types";

interface Props {
  sidebarData: SidebarEntity[];
  showPreloader: boolean;
}

const Sidebar: React.FC<Props> = ({sidebarData, showPreloader}) => {
  let output = <Spinner/>
  if (!showPreloader)
    output = (
      <ul className="nav nav-pills flex-column mb-auto">
        {sidebarData.map((entity) => (
          <li key={entity.route}>
            <NavLink
              to={`pages/${entity.route}`}
              className="nav-link text-white"
            >
              {entity.title}
            </NavLink>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sticky-top" style={{width: '280px'}}>
      <hr/>
      <span
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        Available Pages
      </span>
      <hr/>
      {output}
    </div>
  );
};

export default Sidebar;