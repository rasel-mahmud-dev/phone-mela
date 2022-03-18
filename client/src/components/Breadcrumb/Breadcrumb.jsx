import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { getColorClass } from '../utils';
import("./Breadcrumb.scss")
import BreadcrumbItem from "./BreadcrumbItem/BreadcrumbItem";

const Breadcrumb = props => {
  const { className, color, light, uppercase, bold, ...attributes } = props;
  
  const classes = classNames(
    'breadcrumb',
    uppercase && 'text-uppercase',
    bold && 'font-up-bold',
    light && 'white-text',
    // color && getColorClass(color),
    className
  );
  
  let children;
  
  if (bold) {
    children = React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        bold: true
      });
    });
  } else {
    children = props.children;
  }
  
  return (
    <nav data-test='breadcrumb'>
      <ol {...attributes} className={classes}>
        <svg className="home-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        {children}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  light: PropTypes.bool,
  uppercase: PropTypes.bool
};

export default Breadcrumb;
Breadcrumb.Item = BreadcrumbItem

