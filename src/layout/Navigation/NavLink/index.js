import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './styles.module.css';

export const NavLink = ({ className, ...props }) => {
  return (
    <RouterNavLink
      className={({ isActive }) => {
        const classes = [styles.navlink];
        if (isActive) classes.push(styles.active);
        return classes.join(' ');
      }}
      {...props}
    />
  );
};
