// const toggleToc = (() => {
//   let tocToggle = document.getElementById('js-toc-toggle');
//   let tocContents = document.getElementById('js-toc-contents');

//   if (tocToggle) {
//     tocToggle.addEventListener('click', () => {
//       tocContents.classList.toggle('toc-contents--active');
//     });
//   }
// })();

// export { toggleToc };

// -----

document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.querySelector('.back-to-top');
  const menuButton = document.createElement('div');
  menuButton.className = 'menu-button';
  menuButton.innerHTML = '<svg class="menu-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="2290" width="200" height="200"><path d="M332.3904 813.4656h545.1776c17.8176 0 31.3344-13.312 31.3344-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 13.312 13.5168 31.3344 31.3344 31.3344z m0-268.288h545.1776c22.3232 0 35.84-13.312 35.84-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176-4.5056-31.3344 9.0112-31.3344 31.3344 0 18.0224 13.5168 31.3344 31.3344 31.3344z m0-263.5776h545.1776c22.3232 0 35.84-17.8176 35.84-35.84 0-17.8176-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 17.8176 13.5168 35.84 31.3344 35.84zM158.1056 826.7776c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m49.152-312.9344c0-26.8288-22.3232-49.152-49.152-49.152-26.8288-4.5056-49.152 17.8176-49.152 49.152 0 26.8288 22.3232 49.152 49.152 49.152s49.152-22.3232 49.152-49.152zM158.1056 294.912c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m0 0" p-id="2291"></path></svg>';
  document.body.appendChild(menuButton);

  const toc = document.querySelector('.toc');
  const singleContainerPost = document.querySelector('.single-container-post');
  let isTocVisible = false;
  
  menuButton.addEventListener('click', function () {
    isTocVisible = !isTocVisible;
    toc.style.display = isTocVisible ? 'block' : 'none';
    if (isTocVisible) {
      singleContainerPost.classList.add('grid-layout');
    } else {
      singleContainerPost.classList.remove('grid-layout');
    }
  });

  window.addEventListener('scroll', () => {
      const contentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;

      if (backToTop) {
          backToTop.style.opacity = scrollPercent > 5 ? 1 : 0;
          menuButton.style.display = 'flex';
          menuButton.style.opacity = scrollPercent > 5 ? 1 : 0;
      }
  });

  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const headings = document.querySelectorAll('.single-post-contents h2, .single-post-contents h3');
  const navLinks = document.querySelectorAll('.toc a');
  const commentsSection = document.querySelector('h2 + .section');
  const offset = 30;

  function findNavLink(hash) {
      return Array.from(navLinks).find(link => link.getAttribute('href') === `#${hash}`);
  }

  function clearActiveStates() {
      navLinks.forEach(link => {
          link.classList.remove('active', 'active-current');
          let parent = link.parentNode;
          while (parent && parent !== document.querySelector('.toc')) {
              if (parent.matches('li')) {
                  parent.classList.remove('active');
                  const subMenu = parent.querySelector('ul');
                  if (subMenu) {
                      subMenu.style.display = 'none';
                  }
              }
              parent = parent.parentNode;
          }
      });
  }

  function activateNavByScroll() {
      let currentActiveIndex = -1;

      headings.forEach((heading, index) => {
          const sectionTop = heading.getBoundingClientRect().top;
          const buffer = offset;

          if (sectionTop <= buffer) {
              currentActiveIndex = index;
          }
      });

      const commentsVisible = commentsSection.getBoundingClientRect().top < window.innerHeight;

      if (commentsVisible) {
          clearActiveStates();
      } else if (currentActiveIndex !== -1) {
          const activeHeading = headings[currentActiveIndex];
          const activeNavLink = findNavLink(activeHeading.id);
          if (!activeNavLink.classList.contains('active-current')) {
              clearActiveStates();
              activeNavLink.classList.add('active', 'active-current');
              let parent = activeNavLink.parentNode;
              while (parent && parent !== document.querySelector('.toc')) {
                  if (parent.matches('li')) {
                      parent.classList.add('active');
                      const subMenu = parent.querySelector('ul');
                      if (subMenu) {
                          subMenu.style.display = 'block';
                      }
                  }
                  parent = parent.parentNode;
              }
          }
      } else {
          clearActiveStates();
      }
  }

  window.addEventListener('scroll', activateNavByScroll);
});

