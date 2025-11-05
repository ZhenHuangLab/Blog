// Show or hide nav on click of menu burger
function toggleNav() {
  let mainMenu = document.getElementById('js-menu');
  let navBarToggle = document.getElementById('js-navbar-toggle');

  navBarToggle.addEventListener('click', () => {
    mainMenu.classList.toggle('menu--active');
    removeSubMenus();
  });
}

// Show or hide menu items on mobile
function toggleMobileMenu() {
  let menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(function(item) {
    // 只在移动端添加click事件来切换子菜单
    // 桌面端完全依赖CSS的hover效果
    item.addEventListener('click', (e) => {
      // 检查是否是移动端(通过检测屏幕宽度或菜单是否为列布局)
      const isMobile = window.innerWidth < 1024; // 根据实际断点调整

      if (isMobile) {
        let subMenu = item.querySelector('.sub-menu');
        if (subMenu) {
          if (subMenu.classList.contains('sub-menu--active')) {
            subMenu.classList.remove('sub-menu--active');
          } else {
            removeSubMenus();
            subMenu.classList.add('sub-menu--active');
          }
        }
      }
    });

    // 移除mouseover/mouseout事件,避免与CSS hover冲突
    // 桌面端的hover效果完全由CSS控制
    // 移动端不需要这些事件
  });
}

// Collapse submenus
function removeSubMenus() {
  let subMenus = document.querySelectorAll('.sub-menu');
  subMenus.forEach(function(sub) {
    if (sub.classList.contains('sub-menu--active')) {
      sub.classList.remove('sub-menu--active');
    }
  });
}

const header = (() => {
  toggleNav();
  toggleMobileMenu();
})();

export { header };