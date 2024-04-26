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
    const menuButton = document.createElement("div");
    menuButton.className = "menu-button";
    menuButton.innerHTML = '<svg class="menu-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="2290" width="200" height="200"><path d="M332.3904 813.4656h545.1776c17.8176 0 31.3344-13.312 31.3344-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 13.312 13.5168 31.3344 31.3344 31.3344z m0-268.288h545.1776c22.3232 0 35.84-13.312 35.84-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176-4.5056-31.3344 9.0112-31.3344 31.3344 0 18.0224 13.5168 31.3344 31.3344 31.3344z m0-263.5776h545.1776c22.3232 0 35.84-17.8176 35.84-35.84 0-17.8176-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 17.8176 13.5168 35.84 31.3344 35.84zM158.1056 826.7776c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m49.152-312.9344c0-26.8288-22.3232-49.152-49.152-49.152-26.8288-4.5056-49.152 17.8176-49.152 49.152 0 26.8288 22.3232 49.152 49.152 49.152s49.152-22.3232 49.152-49.152zM158.1056 294.912c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m0 0" p-id="2291"></path></svg>';
    document.body.appendChild(menuButton);
    const toc = document.querySelector(".toc");
    const singleContainerPost = document.querySelector(".single-container-post");
    let isTocVisible = false;
    menuButton.addEventListener("click", function() {
      isTocVisible = !isTocVisible;
      toc.style.display = isTocVisible ? "block" : "none";
      if (isTocVisible) {
        singleContainerPost.classList.add("grid-layout");
      } else {
        singleContainerPost.classList.remove("grid-layout");
      }
    });
    window.addEventListener("scroll", () => {
      const contentHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = contentHeight > 0 ? Math.min(100 * window.scrollY / contentHeight, 100) : 0;
      if (backToTop) {
        backToTop.style.opacity = scrollPercent > 5 ? 1 : 0;
        menuButton.style.display = "flex";
        menuButton.style.opacity = scrollPercent > 5 ? 1 : 0;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvc3dpdGNoVGhlbWUuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2xpcGJvYXJkLmpzIiwgIm5zLWh1Z286L1VzZXJzL3poZW5odWFuZy9Eb2N1bWVudHMvQmxvZy90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3RvYy5qcyIsICJucy1odWdvOi9Vc2Vycy96aGVuaHVhbmcvRG9jdW1lbnRzL0Jsb2cvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvbGF5b3V0cy9oZWFkZXIuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vQ29keUhvdXNlL2RhcmstbGlnaHQtbW9kZS1zd2l0Y2hcblxuZnVuY3Rpb24gc3dpdGNoVGhlbWUoKSB7XG4gIGxldCB0aGVtZVN3aXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZVN3aXRjaCcpO1xuICBpZiAodGhlbWVTd2l0Y2gpIHtcbiAgICBpbml0VGhlbWUoKTtcblxuICAgIHRoZW1lU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGluaXRUaGVtZSgpIHtcbiAgICAgIGxldCBsc0l0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWVTd2l0Y2gnKTtcbiAgICAgIGxldCBkYXJrVGhlbWVTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKGxzSXRlbSAhPT0gbnVsbCkge1xuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IGxzSXRlbSA9PT0gJ2RhcmsnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGFya1RoZW1lU2VsZWN0ZWQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICB9XG5cbiAgICAgIHRoZW1lU3dpdGNoLmNoZWNrZWQgPSBkYXJrVGhlbWVTZWxlY3RlZDtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFRoZW1lKCkge1xuICAgICAgaWYgKHRoZW1lU3dpdGNoLmNoZWNrZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWVTd2l0Y2gnLCAnZGFyaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lU3dpdGNoJywgJ2xpZ2h0Jyk7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgdGhlIGdpc2N1cyB0aGVtZSBhbmQgcmUtcmVuZGVyIGl0XG4gICAgICBsZXQgZ2lzY3VzU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vZ2lzY3VzLmFwcC9jbGllbnQuanNcIl0nKTtcbiAgICAgIGlmIChnaXNjdXNTY3JpcHQpIHtcbiAgICAgICAgZ2lzY3VzU2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRoZW1lU3dpdGNoLmNoZWNrZWQgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICAgICAgaWYgKHdpbmRvdy5naXNjdXMpIHtcbiAgICAgICAgICB3aW5kb3cuZ2lzY3VzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IERpc3F1cyB0byBtYXRjaCBuZXcgY29sb3Igc2NoZW1lXG4gICAgICBpZiAodHlwZW9mIERJU1FVUyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIERJU1FVUy5yZXNldCh7IHJlbG9hZDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3dpdGNoZXIgPSAoKCkgPT4ge1xuICBzd2l0Y2hUaGVtZSgpO1xufSkoKTtcblxuZXhwb3J0IHsgc3dpdGNoZXIgfTsiLCAiLy8gQWRhcHRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgdHV0b3JpYWxzOlxuLy8gaHR0cHM6Ly93d3cuZGFubnlndW8uY29tL2Jsb2cvaG93LXRvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b25zLXRvLWNvZGUtYmxvY2tzLWluLWh1Z28vXG4vLyBodHRwczovL2Fhcm9ubHVuYS5kZXYvYmxvZy9hZGQtY29weS1idXR0b24tdG8tY29kZS1ibG9ja3MtaHVnby1jaHJvbWEvXG4vLyBodHRwczovL2xvZ2ZldGNoLmNvbS9odWdvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b24vXG5cbmNvbnN0IGFkZENvcHlCdXR0b25zID0gKGNsaXBib2FyZCkgPT4ge1xuICAvLyAxLiBMb29rIGZvciBwcmUgPiBjb2RlIGVsZW1lbnRzIGluIHRoZSBET01cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpZ2hsaWdodCA+IHByZSA+IGNvZGUnKS5mb3JFYWNoKChjb2RlQmxvY2spID0+IHtcbiAgICAvLyAyLiBDcmVhdGUgYSBidXR0b24gdGhhdCB3aWxsIHRyaWdnZXIgYSBjb3B5IG9wZXJhdGlvblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHN2Z0NvcHkgPSAnPHN2ZyByb2xlPVwiaW1nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY2xpcGJvYXJkQ29weVwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDb3B5XCI+Q29weSB0aGUgY29kZSBzbmlwcGV0IGNvbnRlbnRzPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0wIDYuNzVDMCA1Ljc4NC43ODQgNSAxLjc1IDVoMS41YS43NS43NSAwIDAxMCAxLjVoLTEuNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtMS41YS43NS43NSAwIDAxMS41IDB2MS41QTEuNzUgMS43NSAwIDAxOS4yNSAxNmgtNy41QTEuNzUgMS43NSAwIDAxMCAxNC4yNXYtNy41elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDEuNzVDNSAuNzg0IDUuNzg0IDAgNi43NSAwaDcuNUMxNS4yMTYgMCAxNiAuNzg0IDE2IDEuNzV2Ny41QTEuNzUgMS43NSAwIDAxMTQuMjUgMTFoLTcuNUExLjc1IDEuNzUgMCAwMTUgOS4yNXYtNy41em0xLjc1LS4yNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtNy41YS4yNS4yNSAwIDAwLS4yNS0uMjVoLTcuNXpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBjb25zdCBzdmdDaGVjayA9ICc8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjbGlwYm9hcmRDaGVja21hcmtcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB2ZXJzaW9uPVwiMS4xXCIgd2lkdGg9XCIxNlwiIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCI+PHRpdGxlIGlkPVwiY2xpcGJvYXJkQ2hlY2ttYXJrXCI+Q29kZSBzbmlwcGV0IGNvbnRlbnRzIGNvcGllZDwvdGl0bGU+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoNjMsIDE4NSwgODApXCIgZD1cIk0xMy43OCA0LjIyYS43NS43NSAwIDAxMCAxLjA2bC03LjI1IDcuMjVhLjc1Ljc1IDAgMDEtMS4wNiAwTDIuMjIgOS4yOGEuNzUuNzUgMCAwMTEuMDYtMS4wNkw2IDEwLjk0bDYuNzItNi43MmEuNzUuNzUgMCAwMTEuMDYgMHpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBidXR0b24uY2xhc3NOYW1lID0gJ2NsaXBib2FyZC1idXR0b24nO1xuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHRleHRUb0NvcHkgPSAnJztcbiAgICAgIGxldCBjb2RlQmxvY2tDaGlsZHJlbiA9IEFycmF5LmZyb20oY29kZUJsb2NrLmNoaWxkcmVuKVxuICAgICAgY29kZUJsb2NrQ2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihzcGFuKSB7XG4gICAgICAgIC8vIGxhc3RDaGlsZCBpcyByZXF1aXJlZCB0byBhdm9pZCBjb3B5aW5nIGxpbmUgbnVtYmVyc1xuICAgICAgICB0ZXh0VG9Db3B5ICs9IHNwYW4ubGFzdENoaWxkLmlubmVyVGV4dDtcbiAgICAgIH0pO1xuICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0VG9Db3B5KS50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmJsdXIoKTtcbiAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ2hlY2s7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHkpLCAyMDAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9ICdFcnJvcicpXG4gICAgICApO1xuICAgIH0pO1xuICAgIC8vIDMuIEFwcGVuZCB0aGUgYnV0dG9uIGRpcmVjdGx5IGJlZm9yZSB0aGUgcHJlIHRhZ1xuICAgIGNvbnN0IHByZSA9IGNvZGVCbG9jay5wYXJlbnROb2RlO1xuICAgIHByZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShidXR0b24sIHByZSk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xpcGJvYXJkID0gKCgpID0+IHtcbiAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XG4gICAgYWRkQ29weUJ1dHRvbnMobmF2aWdhdG9yLmNsaXBib2FyZCk7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCB7IGNsaXBib2FyZCB9OyIsICIvLyBjb25zdCB0b2dnbGVUb2MgPSAoKCkgPT4ge1xuLy8gICBsZXQgdG9jVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy10b2dnbGUnKTtcbi8vICAgbGV0IHRvY0NvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy1jb250ZW50cycpO1xuXG4vLyAgIGlmICh0b2NUb2dnbGUpIHtcbi8vICAgICB0b2NUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICB0b2NDb250ZW50cy5jbGFzc0xpc3QudG9nZ2xlKCd0b2MtY29udGVudHMtLWFjdGl2ZScpO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9KSgpO1xuXG4vLyBleHBvcnQgeyB0b2dnbGVUb2MgfTtcblxuLy8gLS0tLS1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYmFja1RvVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stdG8tdG9wJyk7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbWVudUJ1dHRvbi5jbGFzc05hbWUgPSAnbWVudS1idXR0b24nO1xuICBtZW51QnV0dG9uLmlubmVySFRNTCA9ICc8c3ZnIGNsYXNzPVwibWVudS1pY29uXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgcC1pZD1cIjIyOTBcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPjxwYXRoIGQ9XCJNMzMyLjM5MDQgODEzLjQ2NTZoNTQ1LjE3NzZjMTcuODE3NiAwIDMxLjMzNDQtMTMuMzEyIDMxLjMzNDQtMzEuMzM0NHMtMTMuMzEyLTMxLjMzNDQtMzEuMzM0NC0zMS4zMzQ0SDMzMi4zOTA0Yy0xNy44MTc2IDAtMzEuMzM0NCAxMy4zMTItMzEuMzM0NCAzMS4zMzQ0IDAgMTMuMzEyIDEzLjUxNjggMzEuMzM0NCAzMS4zMzQ0IDMxLjMzNDR6IG0wLTI2OC4yODhoNTQ1LjE3NzZjMjIuMzIzMiAwIDM1Ljg0LTEzLjMxMiAzNS44NC0zMS4zMzQ0cy0xMy4zMTItMzEuMzM0NC0zMS4zMzQ0LTMxLjMzNDRIMzMyLjM5MDRjLTE3LjgxNzYtNC41MDU2LTMxLjMzNDQgOS4wMTEyLTMxLjMzNDQgMzEuMzM0NCAwIDE4LjAyMjQgMTMuNTE2OCAzMS4zMzQ0IDMxLjMzNDQgMzEuMzM0NHogbTAtMjYzLjU3NzZoNTQ1LjE3NzZjMjIuMzIzMiAwIDM1Ljg0LTE3LjgxNzYgMzUuODQtMzUuODQgMC0xNy44MTc2LTEzLjMxMi0zMS4zMzQ0LTMxLjMzNDQtMzEuMzM0NEgzMzIuMzkwNGMtMTcuODE3NiAwLTMxLjMzNDQgMTMuMzEyLTMxLjMzNDQgMzEuMzM0NCAwIDE3LjgxNzYgMTMuNTE2OCAzNS44NCAzMS4zMzQ0IDM1Ljg0ek0xNTguMTA1NiA4MjYuNzc3NmMyNi44Mjg4IDAgNDkuMTUyLTIyLjMyMzIgNDkuMTUyLTQ5LjE1MnMtMjIuMzIzMi00OS4xNTItNDkuMTUyLTQ5LjE1Mi00OS4xNTIgMjIuMzIzMi00OS4xNTIgNDkuMTUyIDIyLjMyMzIgNDkuMTUyIDQ5LjE1MiA0OS4xNTJ6IG00OS4xNTItMzEyLjkzNDRjMC0yNi44Mjg4LTIyLjMyMzItNDkuMTUyLTQ5LjE1Mi00OS4xNTItMjYuODI4OC00LjUwNTYtNDkuMTUyIDE3LjgxNzYtNDkuMTUyIDQ5LjE1MiAwIDI2LjgyODggMjIuMzIzMiA0OS4xNTIgNDkuMTUyIDQ5LjE1MnM0OS4xNTItMjIuMzIzMiA0OS4xNTItNDkuMTUyek0xNTguMTA1NiAyOTQuOTEyYzI2LjgyODggMCA0OS4xNTItMjIuMzIzMiA0OS4xNTItNDkuMTUycy0yMi4zMjMyLTQ5LjE1Mi00OS4xNTItNDkuMTUyLTQ5LjE1MiAyMi4zMjMyLTQ5LjE1MiA0OS4xNTIgMjIuMzIzMiA0OS4xNTIgNDkuMTUyIDQ5LjE1MnogbTAgMFwiIHAtaWQ9XCIyMjkxXCI+PC9wYXRoPjwvc3ZnPic7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobWVudUJ1dHRvbik7XG5cbiAgY29uc3QgdG9jID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpO1xuICBjb25zdCBzaW5nbGVDb250YWluZXJQb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZS1jb250YWluZXItcG9zdCcpO1xuICBsZXQgaXNUb2NWaXNpYmxlID0gZmFsc2U7XG4gIFxuICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGlzVG9jVmlzaWJsZSA9ICFpc1RvY1Zpc2libGU7XG4gICAgdG9jLnN0eWxlLmRpc3BsYXkgPSBpc1RvY1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIGlmIChpc1RvY1Zpc2libGUpIHtcbiAgICAgIHNpbmdsZUNvbnRhaW5lclBvc3QuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYXlvdXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2luZ2xlQ29udGFpbmVyUG9zdC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWxheW91dCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGNvbnN0IHNjcm9sbFBlcmNlbnQgPSBjb250ZW50SGVpZ2h0ID4gMCA/IE1hdGgubWluKDEwMCAqIHdpbmRvdy5zY3JvbGxZIC8gY29udGVudEhlaWdodCwgMTAwKSA6IDA7XG5cbiAgICAgIGlmIChiYWNrVG9Ub3ApIHtcbiAgICAgICAgICBiYWNrVG9Ub3Auc3R5bGUub3BhY2l0eSA9IHNjcm9sbFBlcmNlbnQgPiA1ID8gMSA6IDA7XG4gICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgIG1lbnVCdXR0b24uc3R5bGUub3BhY2l0eSA9IHNjcm9sbFBlcmNlbnQgPiA1ID8gMSA6IDA7XG4gICAgICB9XG4gIH0pO1xuXG4gIGJhY2tUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS1wb3N0LWNvbnRlbnRzIGgyLCAuc2luZ2xlLXBvc3QtY29udGVudHMgaDMnKTtcbiAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9jIGEnKTtcbiAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDIgKyAuc2VjdGlvbicpO1xuICBjb25zdCBvZmZzZXQgPSAzMDtcblxuICBmdW5jdGlvbiBmaW5kTmF2TGluayhoYXNoKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShuYXZMaW5rcykuZmluZChsaW5rID0+IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09IGAjJHtoYXNofWApO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJBY3RpdmVTdGF0ZXMoKSB7XG4gICAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywgJ2FjdGl2ZS1jdXJyZW50Jyk7XG4gICAgICAgICAgbGV0IHBhcmVudCA9IGxpbmsucGFyZW50Tm9kZTtcbiAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQubWF0Y2hlcygnbGknKSkge1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgICAgICAgICAgICAgICAgaWYgKHN1Yk1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdWJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZU5hdkJ5U2Nyb2xsKCkge1xuICAgICAgbGV0IGN1cnJlbnRBY3RpdmVJbmRleCA9IC0xO1xuXG4gICAgICBoZWFkaW5ncy5mb3JFYWNoKChoZWFkaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBoZWFkaW5nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICBjb25zdCBidWZmZXIgPSBvZmZzZXQ7XG5cbiAgICAgICAgICBpZiAoc2VjdGlvblRvcCA8PSBidWZmZXIpIHtcbiAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbW1lbnRzVmlzaWJsZSA9IGNvbW1lbnRzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgIGlmIChjb21tZW50c1Zpc2libGUpIHtcbiAgICAgICAgICBjbGVhckFjdGl2ZVN0YXRlcygpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QWN0aXZlSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY29uc3QgYWN0aXZlSGVhZGluZyA9IGhlYWRpbmdzW2N1cnJlbnRBY3RpdmVJbmRleF07XG4gICAgICAgICAgY29uc3QgYWN0aXZlTmF2TGluayA9IGZpbmROYXZMaW5rKGFjdGl2ZUhlYWRpbmcuaWQpO1xuICAgICAgICAgIGlmICghYWN0aXZlTmF2TGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZS1jdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgY2xlYXJBY3RpdmVTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgYWN0aXZlTmF2TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLCAnYWN0aXZlLWN1cnJlbnQnKTtcbiAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGFjdGl2ZU5hdkxpbmsucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2MnKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5tYXRjaGVzKCdsaScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk1lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJNZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGVhckFjdGl2ZVN0YXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlTmF2QnlTY3JvbGwpO1xufSk7XG5cbiIsICIvLyBTaG93IG9yIGhpZGUgbmF2IG9uIGNsaWNrIG9mIG1lbnUgYnVyZ2VyXG5mdW5jdGlvbiB0b2dnbGVOYXYoKSB7XG4gIGxldCBtYWluTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tZW51Jyk7XG4gIGxldCBuYXZCYXJUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyLXRvZ2dsZScpO1xuXG4gIG5hdkJhclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LS1hY3RpdmUnKTtcbiAgICByZW1vdmVTdWJNZW51cygpO1xuICB9KTtcbn1cblxuLy8gU2hvdyBvciBoaWRlIG1lbnUgaXRlbXMgb24gbW9iaWxlXG5mdW5jdGlvbiB0b2dnbGVNb2JpbGVNZW51KCkge1xuICBsZXQgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbScpO1xuXG4gIG1lbnVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHN1Yk1lbnUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudScpO1xuICAgICAgaWYgKHN1Yk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItbWVudS0tYWN0aXZlJykpIHtcbiAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVTdWJNZW51cygpO1xuICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5hZGQoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICB9KTtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBDb2xsYXBzZSBzdWJtZW51c1xuZnVuY3Rpb24gcmVtb3ZlU3ViTWVudXMoKSB7XG4gIGxldCBzdWJNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudScpO1xuICBzdWJNZW51cy5mb3JFYWNoKGZ1bmN0aW9uKHN1Yikge1xuICAgIGlmIChzdWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItbWVudS0tYWN0aXZlJykpIHtcbiAgICAgIHN1Yi5jbGFzc0xpc3QucmVtb3ZlKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgaGVhZGVyID0gKCgpID0+IHtcbiAgdG9nZ2xlTmF2KCk7XG4gIHRvZ2dsZU1vYmlsZU1lbnUoKTtcbn0pKCk7XG5cbmV4cG9ydCB7IGhlYWRlciB9OyIsICJmdW5jdGlvbiBmaWx0ZXJQb3N0cygpIHtcbiAgbGV0IHNlbGVjdFBvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC1wb3N0cycpO1xuICBsZXQgZW50cmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWVudHJ5LWZpbHRlcicpO1xuICBpZiAoc2VsZWN0UG9zdHMpIHtcbiAgICBzZWxlY3RQb3N0cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5LmNsYXNzTGlzdC5jb250YWlucyhgZW50cnktLSR7c2VsZWN0UG9zdHMudmFsdWV9YCkgfCBzZWxlY3RQb3N0cy52YWx1ZSA9PT0gJ2FsbC1wb3N0cycpIHtcbiAgICAgICAgICBlbnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnRyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBob21lID0gKCgpID0+IHtcbiAgZmlsdGVyUG9zdHMoKTtcbn0pKCk7XG5cbmV4cG9ydCB7IGhvbWUgfTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUVBLFdBQVMsY0FBYztBQUNyQixRQUFJLGNBQWMsU0FBUyxlQUFlLGFBQWE7QUFDdkQsUUFBSSxhQUFhO0FBT2YsVUFBUyxZQUFULFdBQXFCO0FBQ25CLFlBQUksU0FBUyxhQUFhLFFBQVEsYUFBYTtBQUMvQyxZQUFJLG9CQUFvQjtBQUN4QixZQUFJLFdBQVcsTUFBTTtBQUNuQiw4QkFBb0IsV0FBVztBQUFBLFFBQ2pDLE9BQU87QUFDTCw4QkFBb0IsT0FBTyxXQUFXLDhCQUE4QixFQUFFO0FBQUEsUUFDeEU7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QUFlO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFHQSxXQUFTLG1CQUFtQjtBQUMxQixRQUFJLFlBQVksU0FBUyxpQkFBaUIsWUFBWTtBQUV0RCxjQUFVLFFBQVEsU0FBUyxNQUFNO0FBQy9CLFdBQUssaUJBQWlCLFNBQVMsTUFBTTtBQUNuQyxZQUFJLFVBQVUsS0FBSyxjQUFjLFdBQVc7QUFDNUMsWUFBSSxRQUFRLFVBQVUsU0FBUyxrQkFBa0IsR0FBRztBQUNsRCxrQkFBUSxVQUFVLE9BQU8sa0JBQWtCO0FBQUEsUUFDN0MsT0FBTztBQUNMLHlCQUFlO0FBQ2Ysa0JBQVEsVUFBVSxJQUFJLGtCQUFrQjtBQUFBLFFBQzFDO0FBQUEsTUFDRixDQUFDO0FBQ0QsV0FBSyxpQkFBaUIsYUFBYSxNQUFNO0FBQ3ZDLGFBQUssTUFBTSxVQUFVO0FBQUEsTUFDdkIsQ0FBQztBQUNELFdBQUssaUJBQWlCLFlBQVksTUFBTTtBQUN0QyxhQUFLLE1BQU0sVUFBVTtBQUFBLE1BQ3ZCLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBR0EsV0FBUyxpQkFBaUI7QUFDeEIsUUFBSSxXQUFXLFNBQVMsaUJBQWlCLFdBQVc7QUFDcEQsYUFBUyxRQUFRLFNBQVMsS0FBSztBQUM3QixVQUFJLElBQUksVUFBVSxTQUFTLGtCQUFrQixHQUFHO0FBQzlDLFlBQUksVUFBVSxPQUFPLGtCQUFrQjtBQUFBLE1BQ3pDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQU0sVUFBVSxNQUFNO0FBQ3BCLGNBQVU7QUFDVixxQkFBaUI7QUFBQSxFQUNuQixHQUFHOzs7QUMvQ0gsV0FBUyxjQUFjO0FBQ3JCLFFBQUksY0FBYyxTQUFTLGVBQWUsY0FBYztBQUN4RCxRQUFJLFVBQVUsU0FBUyxpQkFBaUIsb0JBQW9CO0FBQzVELFFBQUksYUFBYTtBQUNmLGtCQUFZLGlCQUFpQixVQUFVLE1BQU07QUFDM0MsZ0JBQVEsUUFBUSxTQUFTLE9BQU87QUFDOUIsY0FBSSxNQUFNLFVBQVUsU0FBUyxVQUFVLFlBQVksS0FBSyxFQUFFLElBQUksWUFBWSxVQUFVLGFBQWE7QUFDL0Ysa0JBQU0sTUFBTSxVQUFVO0FBQUEsVUFDeEIsT0FBTztBQUNMLGtCQUFNLE1BQU0sVUFBVTtBQUFBLFVBQ3hCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFFQSxNQUFNLFFBQVEsTUFBTTtBQUNsQixnQkFBWTtBQUFBLEVBQ2QsR0FBRzsiLAogICJuYW1lcyI6IFsiY2xpcGJvYXJkIl0KfQo=
