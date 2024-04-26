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
  const menuButton = document.querySelector('.menu-button');
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

