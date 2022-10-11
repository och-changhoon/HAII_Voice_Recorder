import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const Nav = () => {
  return (
    <Fragment>
      <div>Nav</div>
      <Outlet />
    </Fragment>
  );
};
