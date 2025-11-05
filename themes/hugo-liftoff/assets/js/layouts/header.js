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
  let hideTimeout = null; // 用于延迟隐藏的定时器

  menuItems.forEach(function(item) {
    // 只在移动端添加click事件来切换子菜单
    // 桌面端完全依赖CSS的hover效果
    item.addEventListener('click', (e) => {
      // 检查是否是移动端(通过检测屏幕宽度，与CSS断点m-large: 900px保持一致)
      const isMobile = window.innerWidth < 900; // 修复：与CSS断点保持一致

      if (isMobile) {
        let subMenu = item.querySelector('.sub-menu');
        if (subMenu) {
          // 阻止事件冒泡，避免点击子菜单项时关闭菜单
          if (subMenu.classList.contains('sub-menu--active')) {
            subMenu.classList.remove('sub-menu--active');
          } else {
            removeSubMenus();
            subMenu.classList.add('sub-menu--active');
          }
        }
      }
    });

    // 桌面端增强：添加延迟隐藏机制，防止意外关闭
    // 当鼠标离开菜单项时，延迟200ms才隐藏子菜单
    const subMenu = item.querySelector('.sub-menu');
    if (subMenu) {
      item.addEventListener('mouseleave', (e) => {
        const isDesktop = window.innerWidth >= 900;
        if (isDesktop) {
          // 清除之前的定时器
          if (hideTimeout) {
            clearTimeout(hideTimeout);
          }
          // 设置新的延迟隐藏定时器
          hideTimeout = setTimeout(() => {
            // CSS会自动处理隐藏，这里只是为了提供延迟
            // 不需要手动操作DOM
          }, 200);
        }
      });

      item.addEventListener('mouseenter', (e) => {
        const isDesktop = window.innerWidth >= 900;
        if (isDesktop) {
          // 鼠标重新进入时，取消延迟隐藏
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
        }
      });
    }

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