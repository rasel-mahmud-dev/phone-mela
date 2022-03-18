import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BreadcrumbItem = props => {
  const {
    active,
    appendIcon,
    children,
    className,
    bold,
    icon,
    iconBrand,
    iconClassName,
    iconLight,
    iconRegular,
    iconSize,
    href,
    ...attributes
  } = props;

  const classes = classNames(active ? 'active' : false, icon && 'bc-icons', 'breadcrumb-item', className);
  const WithBold = ({ children }) => (bold ? <strong>{children}</strong> : children);
  
  return (
     <li data-test='breadcrumb-item' {...attributes} className={classes}>
       <WithBold>
         { active ? children : <a href={href}>{children}</a> }
       </WithBold>
    </li>
  );
};

BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  // appendIcon: PropTypes.bool,
  bold: PropTypes.bool,
  children: PropTypes.node,
  // className: PropTypes.string,
  // icon: PropTypes.string,
  // iconBrand: PropTypes.bool,
  // iconClassName: PropTypes.string,
  // iconLight: PropTypes.bool,
  // iconRegular: PropTypes.bool,
  // iconSize: PropTypes.string,
  href: PropTypes.string
};

// BreadcrumbItem.defaultProps = {
//   active: false,
//   appendIcon: false,
//   className: '',
//   bold: false,
//   icon: '',
//   iconBrand: false,
//   iconClassName: '',
//   iconLight: false,
//   iconRegular: false,
//   iconSize: ''
// };

export default BreadcrumbItem;
