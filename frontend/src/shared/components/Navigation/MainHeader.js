import classes from './MainHeader.module.css';

// ==============================================

const MainHeader = (props) => {
  return <header classes={'main-header'}>{props.children}</header>;
};

// ==============================================

export default MainHeader;
