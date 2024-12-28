(() => {
  // ns-hugo:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/switchTheme.js
  function switchTheme() {
    let themeSwitch = document.getElementById("themeSwitch");
    if (themeSwitch) {
      let initTheme = function() {
        let lsItem = localStorage.getItem("themeSwitch");
        let darkThemeSelected = false;
        if (lsItem !== null) {
          darkThemeSelected = lsItem === "dark";
        } else {
          darkThemeSelected = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        themeSwitch.checked = darkThemeSelected;
        resetTheme();
      }, resetTheme = function() {
        if (themeSwitch.checked) {
          document.body.setAttribute("data-theme", "dark");
          localStorage.setItem("themeSwitch", "dark");
        } else {
          document.body.removeAttribute("data-theme");
          localStorage.setItem("themeSwitch", "light");
        }
        let giscusScript = document.querySelector('script[src="https://giscus.app/client.js"]');
        if (giscusScript) {
          giscusScript.setAttribute("data-theme", themeSwitch.checked ? "dark" : "light");
          if (window.giscus) {
            window.giscus.render();
          }
        }
        if (typeof DISQUS !== "undefined") {
          DISQUS.reset({ reload: true });
        }
      };
      initTheme();
      themeSwitch.addEventListener("change", () => {
        resetTheme();
      });
    }
  }
  var switcher = (() => {
    switchTheme();
  })();

  // ns-hugo:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/clipboard.js
  var addCopyButtons = (clipboard2) => {
    document.querySelectorAll(".highlight > pre > code").forEach((codeBlock) => {
      const button = document.createElement("button");
      const svgCopy = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCopy" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCopy">Copy the code snippet contents</title><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
      const svgCheck = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCheckmark" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCheckmark">Code snippet contents copied</title><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.addEventListener("click", () => {
        let textToCopy = "";
        let codeBlockChildren = Array.from(codeBlock.children);
        codeBlockChildren.forEach(function(span) {
          textToCopy += span.lastChild.innerText;
        });
        clipboard2.writeText(textToCopy).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => button.innerHTML = svgCopy, 2e3);
          },
          (error) => button.innerHTML = "Error"
        );
      });
      const pre = codeBlock.parentNode;
      pre.parentNode.insertBefore(button, pre);
    });
  };
  var clipboard = (() => {
    if (navigator && navigator.clipboard) {
      addCopyButtons(navigator.clipboard);
    }
  })();

  // ns-hugo:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/toc.js
  document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.querySelector(".back-to-top");
    const menuButton = document.querySelector(".menu-button");
    const toc = document.querySelector(".toc");
    const singleContainerPost = document.querySelector(".single-container-post");
    let isTocVisible = false;
    if (menuButton) {
      menuButton.addEventListener("click", function() {
        isTocVisible = !isTocVisible;
        toc.style.display = isTocVisible ? "block" : "none";
        if (isTocVisible) {
          singleContainerPost.classList.add("grid-layout");
        } else {
          singleContainerPost.classList.remove("grid-layout");
        }
      });
    }
    window.addEventListener("scroll", () => {
      const contentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;
      if (backToTop) {
        backToTop.style.opacity = scrollPercent > 3 ? 1 : 0;
      }
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll(".single-post-contents h2, .single-post-contents h3");
    const navLinks = document.querySelectorAll(".toc a");
    const commentsSection = document.querySelector("h2 + .section");
    const offset = 30;
    function findNavLink(hash) {
      return Array.from(navLinks).find((link) => link.getAttribute("href") === `#${hash}`);
    }
    function clearActiveStates() {
      navLinks.forEach((link) => {
        link.classList.remove("active", "active-current");
        let parent = link.parentNode;
        while (parent && parent !== document.querySelector(".toc")) {
          if (parent.matches("li")) {
            parent.classList.remove("active");
            const subMenu = parent.querySelector("ul");
            if (subMenu) {
              subMenu.style.display = "none";
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
        if (!activeNavLink.classList.contains("active-current")) {
          clearActiveStates();
          activeNavLink.classList.add("active", "active-current");
          let parent = activeNavLink.parentNode;
          while (parent && parent !== document.querySelector(".toc")) {
            if (parent.matches("li")) {
              parent.classList.add("active");
              const subMenu = parent.querySelector("ul");
              if (subMenu) {
                subMenu.style.display = "block";
              }
            }
            parent = parent.parentNode;
          }
        }
      } else {
        clearActiveStates();
      }
    }
    window.addEventListener("scroll", activateNavByScroll);
  });

  // ns-hugo:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/layouts/header.js
  function toggleNav() {
    let mainMenu = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");
    navBarToggle.addEventListener("click", () => {
      mainMenu.classList.toggle("menu--active");
      removeSubMenus();
    });
  }
  function toggleMobileMenu() {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(function(item) {
      item.addEventListener("click", () => {
        let subMenu = item.querySelector(".sub-menu");
        if (subMenu.classList.contains("sub-menu--active")) {
          subMenu.classList.remove("sub-menu--active");
        } else {
          removeSubMenus();
          subMenu.classList.add("sub-menu--active");
        }
      });
      item.addEventListener("mouseover", () => {
        item.style.opacity = "1";
      });
      item.addEventListener("mouseout", () => {
        item.style.opacity = "0.5";
      });
    });
  }
  function removeSubMenus() {
    let subMenus = document.querySelectorAll(".sub-menu");
    subMenus.forEach(function(sub) {
      if (sub.classList.contains("sub-menu--active")) {
        sub.classList.remove("sub-menu--active");
      }
    });
  }
  var header = (() => {
    toggleNav();
    toggleMobileMenu();
  })();

  // ns-hugo:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/pages/home.js
  function filterPosts() {
    let selectPosts = document.getElementById("select-posts");
    let entries = document.querySelectorAll(".post-entry-filter");
    if (selectPosts) {
      selectPosts.addEventListener("change", () => {
        entries.forEach(function(entry) {
          if (entry.classList.contains(`entry--${selectPosts.value}`) | selectPosts.value === "all-posts") {
            entry.style.display = "block";
          } else {
            entry.style.display = "none";
          }
        });
      });
    }
  }
  var home = (() => {
    filterPosts();
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvc3dpdGNoVGhlbWUuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2xpcGJvYXJkLmpzIiwgIm5zLWh1Z286L1VzZXJzL3poZW5odWFuZy9Eb2N1bWVudHMvQmxvZy90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3RvYy5qcyIsICJucy1odWdvOi9Vc2Vycy96aGVuaHVhbmcvRG9jdW1lbnRzL0Jsb2cvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvbGF5b3V0cy9oZWFkZXIuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vQ29keUhvdXNlL2RhcmstbGlnaHQtbW9kZS1zd2l0Y2hcblxuZnVuY3Rpb24gc3dpdGNoVGhlbWUoKSB7XG4gIGxldCB0aGVtZVN3aXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZVN3aXRjaCcpO1xuICBpZiAodGhlbWVTd2l0Y2gpIHtcbiAgICBpbml0VGhlbWUoKTtcblxuICAgIHRoZW1lU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGluaXRUaGVtZSgpIHtcbiAgICAgIGxldCBsc0l0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWVTd2l0Y2gnKTtcbiAgICAgIGxldCBkYXJrVGhlbWVTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKGxzSXRlbSAhPT0gbnVsbCkge1xuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IGxzSXRlbSA9PT0gJ2RhcmsnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGFya1RoZW1lU2VsZWN0ZWQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICB9XG5cbiAgICAgIHRoZW1lU3dpdGNoLmNoZWNrZWQgPSBkYXJrVGhlbWVTZWxlY3RlZDtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFRoZW1lKCkge1xuICAgICAgaWYgKHRoZW1lU3dpdGNoLmNoZWNrZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWVTd2l0Y2gnLCAnZGFyaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lU3dpdGNoJywgJ2xpZ2h0Jyk7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgdGhlIGdpc2N1cyB0aGVtZSBhbmQgcmUtcmVuZGVyIGl0XG4gICAgICBsZXQgZ2lzY3VzU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vZ2lzY3VzLmFwcC9jbGllbnQuanNcIl0nKTtcbiAgICAgIGlmIChnaXNjdXNTY3JpcHQpIHtcbiAgICAgICAgZ2lzY3VzU2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRoZW1lU3dpdGNoLmNoZWNrZWQgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICAgICAgaWYgKHdpbmRvdy5naXNjdXMpIHtcbiAgICAgICAgICB3aW5kb3cuZ2lzY3VzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IERpc3F1cyB0byBtYXRjaCBuZXcgY29sb3Igc2NoZW1lXG4gICAgICBpZiAodHlwZW9mIERJU1FVUyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIERJU1FVUy5yZXNldCh7IHJlbG9hZDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3dpdGNoZXIgPSAoKCkgPT4ge1xuICBzd2l0Y2hUaGVtZSgpO1xufSkoKTtcblxuZXhwb3J0IHsgc3dpdGNoZXIgfTsiLCAiLy8gQWRhcHRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgdHV0b3JpYWxzOlxuLy8gaHR0cHM6Ly93d3cuZGFubnlndW8uY29tL2Jsb2cvaG93LXRvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b25zLXRvLWNvZGUtYmxvY2tzLWluLWh1Z28vXG4vLyBodHRwczovL2Fhcm9ubHVuYS5kZXYvYmxvZy9hZGQtY29weS1idXR0b24tdG8tY29kZS1ibG9ja3MtaHVnby1jaHJvbWEvXG4vLyBodHRwczovL2xvZ2ZldGNoLmNvbS9odWdvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b24vXG5cbmNvbnN0IGFkZENvcHlCdXR0b25zID0gKGNsaXBib2FyZCkgPT4ge1xuICAvLyAxLiBMb29rIGZvciBwcmUgPiBjb2RlIGVsZW1lbnRzIGluIHRoZSBET01cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpZ2hsaWdodCA+IHByZSA+IGNvZGUnKS5mb3JFYWNoKChjb2RlQmxvY2spID0+IHtcbiAgICAvLyAyLiBDcmVhdGUgYSBidXR0b24gdGhhdCB3aWxsIHRyaWdnZXIgYSBjb3B5IG9wZXJhdGlvblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHN2Z0NvcHkgPSAnPHN2ZyByb2xlPVwiaW1nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY2xpcGJvYXJkQ29weVwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDb3B5XCI+Q29weSB0aGUgY29kZSBzbmlwcGV0IGNvbnRlbnRzPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0wIDYuNzVDMCA1Ljc4NC43ODQgNSAxLjc1IDVoMS41YS43NS43NSAwIDAxMCAxLjVoLTEuNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtMS41YS43NS43NSAwIDAxMS41IDB2MS41QTEuNzUgMS43NSAwIDAxOS4yNSAxNmgtNy41QTEuNzUgMS43NSAwIDAxMCAxNC4yNXYtNy41elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDEuNzVDNSAuNzg0IDUuNzg0IDAgNi43NSAwaDcuNUMxNS4yMTYgMCAxNiAuNzg0IDE2IDEuNzV2Ny41QTEuNzUgMS43NSAwIDAxMTQuMjUgMTFoLTcuNUExLjc1IDEuNzUgMCAwMTUgOS4yNXYtNy41em0xLjc1LS4yNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtNy41YS4yNS4yNSAwIDAwLS4yNS0uMjVoLTcuNXpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBjb25zdCBzdmdDaGVjayA9ICc8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjbGlwYm9hcmRDaGVja21hcmtcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB2ZXJzaW9uPVwiMS4xXCIgd2lkdGg9XCIxNlwiIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCI+PHRpdGxlIGlkPVwiY2xpcGJvYXJkQ2hlY2ttYXJrXCI+Q29kZSBzbmlwcGV0IGNvbnRlbnRzIGNvcGllZDwvdGl0bGU+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoNjMsIDE4NSwgODApXCIgZD1cIk0xMy43OCA0LjIyYS43NS43NSAwIDAxMCAxLjA2bC03LjI1IDcuMjVhLjc1Ljc1IDAgMDEtMS4wNiAwTDIuMjIgOS4yOGEuNzUuNzUgMCAwMTEuMDYtMS4wNkw2IDEwLjk0bDYuNzItNi43MmEuNzUuNzUgMCAwMTEuMDYgMHpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBidXR0b24uY2xhc3NOYW1lID0gJ2NsaXBib2FyZC1idXR0b24nO1xuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHRleHRUb0NvcHkgPSAnJztcbiAgICAgIGxldCBjb2RlQmxvY2tDaGlsZHJlbiA9IEFycmF5LmZyb20oY29kZUJsb2NrLmNoaWxkcmVuKVxuICAgICAgY29kZUJsb2NrQ2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihzcGFuKSB7XG4gICAgICAgIC8vIGxhc3RDaGlsZCBpcyByZXF1aXJlZCB0byBhdm9pZCBjb3B5aW5nIGxpbmUgbnVtYmVyc1xuICAgICAgICB0ZXh0VG9Db3B5ICs9IHNwYW4ubGFzdENoaWxkLmlubmVyVGV4dDtcbiAgICAgIH0pO1xuICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0VG9Db3B5KS50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmJsdXIoKTtcbiAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ2hlY2s7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHkpLCAyMDAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9ICdFcnJvcicpXG4gICAgICApO1xuICAgIH0pO1xuICAgIC8vIDMuIEFwcGVuZCB0aGUgYnV0dG9uIGRpcmVjdGx5IGJlZm9yZSB0aGUgcHJlIHRhZ1xuICAgIGNvbnN0IHByZSA9IGNvZGVCbG9jay5wYXJlbnROb2RlO1xuICAgIHByZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShidXR0b24sIHByZSk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xpcGJvYXJkID0gKCgpID0+IHtcbiAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XG4gICAgYWRkQ29weUJ1dHRvbnMobmF2aWdhdG9yLmNsaXBib2FyZCk7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCB7IGNsaXBib2FyZCB9OyIsICIvLyBjb25zdCB0b2dnbGVUb2MgPSAoKCkgPT4ge1xuLy8gICBsZXQgdG9jVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy10b2dnbGUnKTtcbi8vICAgbGV0IHRvY0NvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy1jb250ZW50cycpO1xuXG4vLyAgIGlmICh0b2NUb2dnbGUpIHtcbi8vICAgICB0b2NUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICB0b2NDb250ZW50cy5jbGFzc0xpc3QudG9nZ2xlKCd0b2MtY29udGVudHMtLWFjdGl2ZScpO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9KSgpO1xuXG4vLyBleHBvcnQgeyB0b2dnbGVUb2MgfTtcblxuLy8gLS0tLS1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYmFja1RvVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stdG8tdG9wJyk7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idXR0b24nKTtcbiAgY29uc3QgdG9jID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpO1xuICBjb25zdCBzaW5nbGVDb250YWluZXJQb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZS1jb250YWluZXItcG9zdCcpO1xuICBsZXQgaXNUb2NWaXNpYmxlID0gZmFsc2U7XG4gIFxuICBpZiAobWVudUJ1dHRvbikge1xuICAgIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpc1RvY1Zpc2libGUgPSAhaXNUb2NWaXNpYmxlO1xuICAgICAgdG9jLnN0eWxlLmRpc3BsYXkgPSBpc1RvY1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgaWYgKGlzVG9jVmlzaWJsZSkge1xuICAgICAgICBzaW5nbGVDb250YWluZXJQb3N0LmNsYXNzTGlzdC5hZGQoJ2dyaWQtbGF5b3V0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaW5nbGVDb250YWluZXJQb3N0LmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtbGF5b3V0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBzY3JvbGxQZXJjZW50ID0gY29udGVudEhlaWdodCA+IDAgPyBNYXRoLm1pbigxMDAgKiB3aW5kb3cuc2Nyb2xsWSAvIGNvbnRlbnRIZWlnaHQsIDEwMCkgOiAwO1xuXG4gICAgaWYgKGJhY2tUb1RvcCkge1xuICAgICAgYmFja1RvVG9wLnN0eWxlLm9wYWNpdHkgPSBzY3JvbGxQZXJjZW50ID4gMyA/IDEgOiAwO1xuICAgIH1cbiAgfSk7XG5cbiAgYmFja1RvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcbiAgfSk7XG59KTtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaW5nbGUtcG9zdC1jb250ZW50cyBoMiwgLnNpbmdsZS1wb3N0LWNvbnRlbnRzIGgzJyk7XG4gIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvYyBhJyk7XG4gIGNvbnN0IGNvbW1lbnRzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyICsgLnNlY3Rpb24nKTtcbiAgY29uc3Qgb2Zmc2V0ID0gMzA7XG5cbiAgZnVuY3Rpb24gZmluZE5hdkxpbmsoaGFzaCkge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20obmF2TGlua3MpLmZpbmQobGluayA9PiBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpID09PSBgIyR7aGFzaH1gKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyQWN0aXZlU3RhdGVzKCkge1xuICAgICAgbmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdhY3RpdmUtY3VycmVudCcpO1xuICAgICAgICAgIGxldCBwYXJlbnQgPSBsaW5rLnBhcmVudE5vZGU7XG4gICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2MnKSkge1xuICAgICAgICAgICAgICBpZiAocGFyZW50Lm1hdGNoZXMoJ2xpJykpIHtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk1lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzdWJNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3ViTWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWN0aXZhdGVOYXZCeVNjcm9sbCgpIHtcbiAgICAgIGxldCBjdXJyZW50QWN0aXZlSW5kZXggPSAtMTtcblxuICAgICAgaGVhZGluZ3MuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uVG9wID0gaGVhZGluZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgICAgY29uc3QgYnVmZmVyID0gb2Zmc2V0O1xuXG4gICAgICAgICAgaWYgKHNlY3Rpb25Ub3AgPD0gYnVmZmVyKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRBY3RpdmVJbmRleCA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjb21tZW50c1Zpc2libGUgPSBjb21tZW50c1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICBpZiAoY29tbWVudHNWaXNpYmxlKSB7XG4gICAgICAgICAgY2xlYXJBY3RpdmVTdGF0ZXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEFjdGl2ZUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZUhlYWRpbmcgPSBoZWFkaW5nc1tjdXJyZW50QWN0aXZlSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZU5hdkxpbmsgPSBmaW5kTmF2TGluayhhY3RpdmVIZWFkaW5nLmlkKTtcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5hdkxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUtY3VycmVudCcpKSB7XG4gICAgICAgICAgICAgIGNsZWFyQWN0aXZlU3RhdGVzKCk7XG4gICAgICAgICAgICAgIGFjdGl2ZU5hdkxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJywgJ2FjdGl2ZS1jdXJyZW50Jyk7XG4gICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBhY3RpdmVOYXZMaW5rLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9jJykpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQubWF0Y2hlcygnbGknKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJNZW51ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Yk1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViTWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xlYXJBY3RpdmVTdGF0ZXMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhY3RpdmF0ZU5hdkJ5U2Nyb2xsKTtcbn0pO1xuXG4iLCAiLy8gU2hvdyBvciBoaWRlIG5hdiBvbiBjbGljayBvZiBtZW51IGJ1cmdlclxuZnVuY3Rpb24gdG9nZ2xlTmF2KCkge1xuICBsZXQgbWFpbk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbWVudScpO1xuICBsZXQgbmF2QmFyVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLW5hdmJhci10b2dnbGUnKTtcblxuICBuYXZCYXJUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbWFpbk1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudS0tYWN0aXZlJyk7XG4gICAgcmVtb3ZlU3ViTWVudXMoKTtcbiAgfSk7XG59XG5cbi8vIFNob3cgb3IgaGlkZSBtZW51IGl0ZW1zIG9uIG1vYmlsZVxuZnVuY3Rpb24gdG9nZ2xlTW9iaWxlTWVudSgpIHtcbiAgbGV0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKTtcblxuICBtZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBzdWJNZW51ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnUnKTtcbiAgICAgIGlmIChzdWJNZW51LmNsYXNzTGlzdC5jb250YWlucygnc3ViLW1lbnUtLWFjdGl2ZScpKSB7XG4gICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnUtLWFjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlU3ViTWVudXMoKTtcbiAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QuYWRkKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgfSk7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gQ29sbGFwc2Ugc3VibWVudXNcbmZ1bmN0aW9uIHJlbW92ZVN1Yk1lbnVzKCkge1xuICBsZXQgc3ViTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3ViLW1lbnUnKTtcbiAgc3ViTWVudXMuZm9yRWFjaChmdW5jdGlvbihzdWIpIHtcbiAgICBpZiAoc3ViLmNsYXNzTGlzdC5jb250YWlucygnc3ViLW1lbnUtLWFjdGl2ZScpKSB7XG4gICAgICBzdWIuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnUtLWFjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IGhlYWRlciA9ICgoKSA9PiB7XG4gIHRvZ2dsZU5hdigpO1xuICB0b2dnbGVNb2JpbGVNZW51KCk7XG59KSgpO1xuXG5leHBvcnQgeyBoZWFkZXIgfTsiLCAiZnVuY3Rpb24gZmlsdGVyUG9zdHMoKSB7XG4gIGxldCBzZWxlY3RQb3N0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3QtcG9zdHMnKTtcbiAgbGV0IGVudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdC1lbnRyeS1maWx0ZXInKTtcbiAgaWYgKHNlbGVjdFBvc3RzKSB7XG4gICAgc2VsZWN0UG9zdHMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgIGlmIChlbnRyeS5jbGFzc0xpc3QuY29udGFpbnMoYGVudHJ5LS0ke3NlbGVjdFBvc3RzLnZhbHVlfWApIHwgc2VsZWN0UG9zdHMudmFsdWUgPT09ICdhbGwtcG9zdHMnKSB7XG4gICAgICAgICAgZW50cnkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgaG9tZSA9ICgoKSA9PiB7XG4gIGZpbHRlclBvc3RzKCk7XG59KSgpO1xuXG5leHBvcnQgeyBob21lIH07Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFFQSxXQUFTLGNBQWM7QUFDckIsUUFBSSxjQUFjLFNBQVMsZUFBZSxhQUFhO0FBQ3ZELFFBQUksYUFBYTtBQU9mLFVBQVMsWUFBVCxXQUFxQjtBQUNuQixZQUFJLFNBQVMsYUFBYSxRQUFRLGFBQWE7QUFDL0MsWUFBSSxvQkFBb0I7QUFDeEIsWUFBSSxXQUFXLE1BQU07QUFDbkIsOEJBQW9CLFdBQVc7QUFBQSxRQUNqQyxPQUFPO0FBQ0wsOEJBQW9CLE9BQU8sV0FBVyw4QkFBOEIsRUFBRTtBQUFBLFFBQ3hFO0FBRUEsb0JBQVksVUFBVTtBQUN0QixtQkFBVztBQUFBLE1BQ2IsR0FFUyxhQUFULFdBQXNCO0FBQ3BCLFlBQUksWUFBWSxTQUFTO0FBQ3ZCLG1CQUFTLEtBQUssYUFBYSxjQUFjLE1BQU07QUFDL0MsdUJBQWEsUUFBUSxlQUFlLE1BQU07QUFBQSxRQUM1QyxPQUFPO0FBQ0wsbUJBQVMsS0FBSyxnQkFBZ0IsWUFBWTtBQUMxQyx1QkFBYSxRQUFRLGVBQWUsT0FBTztBQUFBLFFBQzdDO0FBRUEsWUFBSSxlQUFlLFNBQVMsY0FBYyw0Q0FBNEM7QUFDdEYsWUFBSSxjQUFjO0FBQ2hCLHVCQUFhLGFBQWEsY0FBYyxZQUFZLFVBQVUsU0FBUyxPQUFPO0FBQzlFLGNBQUksT0FBTyxRQUFRO0FBQ2pCLG1CQUFPLE9BQU8sT0FBTztBQUFBLFVBQ3ZCO0FBQUEsUUFDRjtBQUdBLFlBQUksT0FBTyxXQUFXLGFBQWE7QUFDL0IsaUJBQU8sTUFBTSxFQUFFLFFBQVEsS0FBSyxDQUFDO0FBQUEsUUFDakM7QUFBQSxNQUNGO0FBeENBLGdCQUFVO0FBRVYsa0JBQVksaUJBQWlCLFVBQVUs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
