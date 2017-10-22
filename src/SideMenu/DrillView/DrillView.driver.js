import sideMenuDriverFactory from '../core/SideMenu.driver';
import styles from './DrillView.scss';

const drillViewDriverFactory = ({element}) => {
  const createMenuDriver = menuElement => sideMenuDriverFactory({element: menuElement});
  const getMenu = () => element.querySelector('.' + styles.drillViewContainer);

  return {
    getMenuDriver: () => createMenuDriver(getMenu()),
    getStickyFooter: () => element.querySelector('[data-hook=menu-footer]')
  };
};

export default drillViewDriverFactory;
