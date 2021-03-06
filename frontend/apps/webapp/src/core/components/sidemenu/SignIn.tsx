import { Icon } from '@savantly/sprout-ui';
import React from 'react';
import { getForcedLoginUrl } from './utils';

export const SignIn = () => {
  const url = '/login';
  const forcedLoginUrl = getForcedLoginUrl(url);

  return (
    <div className="sidemenu-item">
      <a href={forcedLoginUrl} className="sidemenu-link" target="_self">
        <span className="icon-circle sidemenu-icon">
          <Icon name="sign-in-alt" size="xl" />
        </span>
      </a>
      <a href={forcedLoginUrl} target="_self">
        <ul className="dropdown-menu dropdown-menu--sidemenu" role="menu">
          <li className="side-menu-header">
            <span className="sidemenu-item-text">Sign In</span>
          </li>
        </ul>
      </a>
    </div>
  );
};
