// Add custom JS

document.addEventListener('DOMContentLoaded', (event) => {

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); display: none; align-items: center; justify-content: center; z-index: 1000; transition: opacity 0.5s;';
    overlay.style.cursor = 'zoom-out';
    document.body.appendChild(overlay);

    const overlayImg = document.createElement('img');
    overlayImg.style.cssText = 'max-width: 90%; max-height: 90%; transition: transform 0.3s;';
    overlay.appendChild(overlayImg);

    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') { 
            e.target.style.cursor = 'zoom-in';
            overlayImg.src = e.target.src;
            overlayImg.style.transform = 'scale(0)';
            overlay.style.display = 'flex';
            overlayImg.style.cursor = 'zoom-out';
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlayImg.style.transform = 'scale(1)';
            }, 0);
        }
    });

    const closeOverlay = () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlayImg.style.transform = 'scale(0)';
        }, 50);
        setTimeout(() => { overlay.style.display = 'none'; }, 500);
    };

    overlay.addEventListener('click', function () {
        closeOverlay();
    });
});

// 运行时间统计

setInterval(() => {
    let create_time = Math.round(new Date('2022/07/04 13:04:00').getTime() / 1000);
    let timestamp = Math.round((new Date().getTime()) / 1000);
    let second = timestamp - create_time;
    let time = new Array(0, 0, 0, 0, 0);

    var nol = function(h) {
        return h > 9 ? h : '0' + h;
    }
    // if (second >= 365 * 24 * 3600) {
    //     time[0] = parseInt(second / (365 * 24 * 3600));
    //     second %= 365 * 24 * 3600;
    // }
    // if (second >= 24 * 3600) {
    //     time[1] = parseInt(second / (24 * 3600));
    //     second %= 24 * 3600;
    // }
    // if (second >= 3600) {
    //     time[2] = nol(parseInt(second / 3600));
    //     second %= 3600;
    // }
    // if (second >= 60) {
    //     time[3] = nol(parseInt(second / 60));
    //     second %= 60;
    // }
    // if (second >= 0) {
    //     time[4] = nol(second);
    // }
    // let currentTimeHtml = ""
    // if (time[0] != 0) {
    //     currentTimeHtml += time[0] + ' YEAR '
    // }
    let days = parseInt(second / (24 * 3600));
    second %= 24 * 3600;
    let hours = nol(parseInt(second / 3600));
    second %= 3600;
    let minutes = nol(parseInt(second / 60));
    let secs = nol(second % 60);

    // 组装时间字符串
    let currentTimeHtml = days + 'd ' + hours + 'h' + minutes + 'm' + secs + 's';
    // currentTimeHtml += time[1] + ' DAYS ' + time[2] + ' : ' + time[3] + ' : ' + time[4];
    document.getElementById("runtime").innerHTML = currentTimeHtml;
}, 1000);

  
// document.addEventListener('DOMContentLoaded', function () {
//     var announcementBar = document.getElementById('announcement-bar');
//     var closeButton = document.getElementById('close-announcement');
  
//     // 检查本地存储，看是否已经关闭公告栏
//     if (localStorage.getItem('announcementClosed') === 'true') {
//       announcementBar.style.display = 'none';
//     }
  
//     // 监听关闭按钮点击事件
//     closeButton.addEventListener('click', function() {
//       announcementBar.style.display = 'none';
//       localStorage.setItem('announcementClosed', 'true');
//     });
//   });
  

// document.addEventListener('DOMContentLoaded', function () {
//     var announcementBarHeight = document.getElementById('announcement-bar').offsetHeight;
//     // var navbarHeight = document.querySelector('nav').offsetHeight;
//     var content = document.querySelector('body');

//     // 设置主体内容的顶部边距，确保不被遮挡
//     if (content) {
//     //   content.style.paddingTop = (announcementBarHeight + navbarHeight) + 'px';
//     content.style.paddingTop = (announcementBarHeight) + 'px';
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    var announcementBar = document.getElementById('announcement-bar');
    var closeButton = document.getElementById('close-announcement');
    var mainContent = document.querySelector('head'); // 假设页面内容在 <main> 标签内
    var navbar = document.querySelector('nav');
  
    // 动态调整页面布局的函数
    function adjustPageLayout() {
      if (localStorage.getItem('announcementClosed') === 'true' || !announcementBar) {
        // 如果公告栏已关闭或不存在
        announcementBar.style.display = 'none';
        if (navbar) navbar.style.top = "0px"; // 将导航栏回复到顶部
      } else {
        // 公告栏显示
        if (navbar) navbar.style.top = announcementBar.offsetHeight + 'px';
      }
  
      // 调整页面主内容的顶部边距
      if (mainContent && navbar) {
        mainContent.style.paddingTop = navbar.offsetHeight + 'px';
      }
    }
  
    // 公告栏关闭按钮的点击事件
    closeButton.addEventListener('click', function() {
      localStorage.setItem('announcementClosed', 'true');
      adjustPageLayout(); // 关闭公告栏后立即调整布局
    });
  
    // 窗口大小变化时重新调整布局
    window.addEventListener('resize', adjustPageLayout);
  
    // 页面加载时根据公告栏的显示状态调整布局
    adjustPageLayout();
  });

//   document.addEventListener('DOMContentLoaded', function () {
//     const backToTop = document.querySelector('.back-to-top');

//     window.addEventListener('scroll', () => {
//         const contentHeight = document.body.scrollHeight - window.innerHeight;
//         const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;

//         if (backToTop) {
//             backToTop.classList.toggle('back-to-top-on', Math.round(scrollPercent) >= 5);
//             backToTop.querySelector('span').innerText = Math.round(scrollPercent) + '%';
//         }
//     });

//     backToTop && backToTop.addEventListener('click', () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.querySelector('.back-to-top');
  const circle = document.querySelector('.circle');

  window.addEventListener('scroll', () => {
      const contentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;

      if (backToTop) {
          backToTop.style.opacity = scrollPercent > 5 ? 1 : 0;
          const circumference = Math.PI * (15.9155 * 2);
          const strokeLength = (circumference * scrollPercent) / 100;
          circle.style.strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
      }
  });

  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});