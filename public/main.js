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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvc3dpdGNoVGhlbWUuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2NvbXBvbmVudHMvY2xpcGJvYXJkLmpzIiwgIm5zLWh1Z286L1VzZXJzL3poZW5odWFuZy9Eb2N1bWVudHMvQmxvZy90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3RvYy5qcyIsICJucy1odWdvOi9Vc2Vycy96aGVuaHVhbmcvRG9jdW1lbnRzL0Jsb2cvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvbGF5b3V0cy9oZWFkZXIuanMiLCAibnMtaHVnbzovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vQ29keUhvdXNlL2RhcmstbGlnaHQtbW9kZS1zd2l0Y2hcblxuZnVuY3Rpb24gc3dpdGNoVGhlbWUoKSB7XG4gIGxldCB0aGVtZVN3aXRjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZVN3aXRjaCcpO1xuICBpZiAodGhlbWVTd2l0Y2gpIHtcbiAgICBpbml0VGhlbWUoKTtcblxuICAgIHRoZW1lU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGluaXRUaGVtZSgpIHtcbiAgICAgIGxldCBsc0l0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWVTd2l0Y2gnKTtcbiAgICAgIGxldCBkYXJrVGhlbWVTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKGxzSXRlbSAhPT0gbnVsbCkge1xuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IGxzSXRlbSA9PT0gJ2RhcmsnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGFya1RoZW1lU2VsZWN0ZWQgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXM7XG4gICAgICB9XG5cbiAgICAgIHRoZW1lU3dpdGNoLmNoZWNrZWQgPSBkYXJrVGhlbWVTZWxlY3RlZDtcbiAgICAgIHJlc2V0VGhlbWUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFRoZW1lKCkge1xuICAgICAgaWYgKHRoZW1lU3dpdGNoLmNoZWNrZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAnZGFyaycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWVTd2l0Y2gnLCAnZGFyaycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lU3dpdGNoJywgJ2xpZ2h0Jyk7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgdGhlIGdpc2N1cyB0aGVtZSBhbmQgcmUtcmVuZGVyIGl0XG4gICAgICBsZXQgZ2lzY3VzU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYz1cImh0dHBzOi8vZ2lzY3VzLmFwcC9jbGllbnQuanNcIl0nKTtcbiAgICAgIGlmIChnaXNjdXNTY3JpcHQpIHtcbiAgICAgICAgZ2lzY3VzU2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRoZW1lU3dpdGNoLmNoZWNrZWQgPyAnZGFyaycgOiAnbGlnaHQnKTtcbiAgICAgICAgaWYgKHdpbmRvdy5naXNjdXMpIHtcbiAgICAgICAgICB3aW5kb3cuZ2lzY3VzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFJlc2V0IERpc3F1cyB0byBtYXRjaCBuZXcgY29sb3Igc2NoZW1lXG4gICAgICBpZiAodHlwZW9mIERJU1FVUyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIERJU1FVUy5yZXNldCh7IHJlbG9hZDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3dpdGNoZXIgPSAoKCkgPT4ge1xuICBzd2l0Y2hUaGVtZSgpO1xufSkoKTtcblxuZXhwb3J0IHsgc3dpdGNoZXIgfTsiLCAiLy8gQWRhcHRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgdHV0b3JpYWxzOlxuLy8gaHR0cHM6Ly93d3cuZGFubnlndW8uY29tL2Jsb2cvaG93LXRvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b25zLXRvLWNvZGUtYmxvY2tzLWluLWh1Z28vXG4vLyBodHRwczovL2Fhcm9ubHVuYS5kZXYvYmxvZy9hZGQtY29weS1idXR0b24tdG8tY29kZS1ibG9ja3MtaHVnby1jaHJvbWEvXG4vLyBodHRwczovL2xvZ2ZldGNoLmNvbS9odWdvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b24vXG5cbmNvbnN0IGFkZENvcHlCdXR0b25zID0gKGNsaXBib2FyZCkgPT4ge1xuICAvLyAxLiBMb29rIGZvciBwcmUgPiBjb2RlIGVsZW1lbnRzIGluIHRoZSBET01cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpZ2hsaWdodCA+IHByZSA+IGNvZGUnKS5mb3JFYWNoKChjb2RlQmxvY2spID0+IHtcbiAgICAvLyAyLiBDcmVhdGUgYSBidXR0b24gdGhhdCB3aWxsIHRyaWdnZXIgYSBjb3B5IG9wZXJhdGlvblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHN2Z0NvcHkgPSAnPHN2ZyByb2xlPVwiaW1nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY2xpcGJvYXJkQ29weVwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDb3B5XCI+Q29weSB0aGUgY29kZSBzbmlwcGV0IGNvbnRlbnRzPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0wIDYuNzVDMCA1Ljc4NC43ODQgNSAxLjc1IDVoMS41YS43NS43NSAwIDAxMCAxLjVoLTEuNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtMS41YS43NS43NSAwIDAxMS41IDB2MS41QTEuNzUgMS43NSAwIDAxOS4yNSAxNmgtNy41QTEuNzUgMS43NSAwIDAxMCAxNC4yNXYtNy41elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDEuNzVDNSAuNzg0IDUuNzg0IDAgNi43NSAwaDcuNUMxNS4yMTYgMCAxNiAuNzg0IDE2IDEuNzV2Ny41QTEuNzUgMS43NSAwIDAxMTQuMjUgMTFoLTcuNUExLjc1IDEuNzUgMCAwMTUgOS4yNXYtNy41em0xLjc1LS4yNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtNy41YS4yNS4yNSAwIDAwLS4yNS0uMjVoLTcuNXpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBjb25zdCBzdmdDaGVjayA9ICc8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjbGlwYm9hcmRDaGVja21hcmtcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB2ZXJzaW9uPVwiMS4xXCIgd2lkdGg9XCIxNlwiIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCI+PHRpdGxlIGlkPVwiY2xpcGJvYXJkQ2hlY2ttYXJrXCI+Q29kZSBzbmlwcGV0IGNvbnRlbnRzIGNvcGllZDwvdGl0bGU+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGZpbGw9XCJyZ2IoNjMsIDE4NSwgODApXCIgZD1cIk0xMy43OCA0LjIyYS43NS43NSAwIDAxMCAxLjA2bC03LjI1IDcuMjVhLjc1Ljc1IDAgMDEtMS4wNiAwTDIuMjIgOS4yOGEuNzUuNzUgMCAwMTEuMDYtMS4wNkw2IDEwLjk0bDYuNzItNi43MmEuNzUuNzUgMCAwMTEuMDYgMHpcIj48L3BhdGg+PC9zdmc+JztcbiAgICBidXR0b24uY2xhc3NOYW1lID0gJ2NsaXBib2FyZC1idXR0b24nO1xuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHRleHRUb0NvcHkgPSAnJztcbiAgICAgIGxldCBjb2RlQmxvY2tDaGlsZHJlbiA9IEFycmF5LmZyb20oY29kZUJsb2NrLmNoaWxkcmVuKVxuICAgICAgY29kZUJsb2NrQ2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihzcGFuKSB7XG4gICAgICAgIC8vIGxhc3RDaGlsZCBpcyByZXF1aXJlZCB0byBhdm9pZCBjb3B5aW5nIGxpbmUgbnVtYmVyc1xuICAgICAgICB0ZXh0VG9Db3B5ICs9IHNwYW4ubGFzdENoaWxkLmlubmVyVGV4dDtcbiAgICAgIH0pO1xuICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0VG9Db3B5KS50aGVuKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYnV0dG9uLmJsdXIoKTtcbiAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ2hlY2s7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9IHN2Z0NvcHkpLCAyMDAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9ICdFcnJvcicpXG4gICAgICApO1xuICAgIH0pO1xuICAgIC8vIDMuIEFwcGVuZCB0aGUgYnV0dG9uIGRpcmVjdGx5IGJlZm9yZSB0aGUgcHJlIHRhZ1xuICAgIGNvbnN0IHByZSA9IGNvZGVCbG9jay5wYXJlbnROb2RlO1xuICAgIHByZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShidXR0b24sIHByZSk7XG4gIH0pO1xufTtcblxuY29uc3QgY2xpcGJvYXJkID0gKCgpID0+IHtcbiAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XG4gICAgYWRkQ29weUJ1dHRvbnMobmF2aWdhdG9yLmNsaXBib2FyZCk7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCB7IGNsaXBib2FyZCB9OyIsICIvLyBjb25zdCB0b2dnbGVUb2MgPSAoKCkgPT4ge1xuLy8gICBsZXQgdG9jVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy10b2dnbGUnKTtcbi8vICAgbGV0IHRvY0NvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXRvYy1jb250ZW50cycpO1xuXG4vLyAgIGlmICh0b2NUb2dnbGUpIHtcbi8vICAgICB0b2NUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICB0b2NDb250ZW50cy5jbGFzc0xpc3QudG9nZ2xlKCd0b2MtY29udGVudHMtLWFjdGl2ZScpO1xuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9KSgpO1xuXG4vLyBleHBvcnQgeyB0b2dnbGVUb2MgfTtcblxuLy8gLS0tLS1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYmFja1RvVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2stdG8tdG9wJyk7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1idXR0b24nKTtcbiAgY29uc3QgdG9jID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpO1xuICBjb25zdCBzaW5nbGVDb250YWluZXJQb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZS1jb250YWluZXItcG9zdCcpO1xuICBsZXQgaXNUb2NWaXNpYmxlID0gZmFsc2U7XG4gIFxuICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGlzVG9jVmlzaWJsZSA9ICFpc1RvY1Zpc2libGU7XG4gICAgdG9jLnN0eWxlLmRpc3BsYXkgPSBpc1RvY1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIGlmIChpc1RvY1Zpc2libGUpIHtcbiAgICAgIHNpbmdsZUNvbnRhaW5lclBvc3QuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYXlvdXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2luZ2xlQ29udGFpbmVyUG9zdC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWxheW91dCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGNvbnN0IHNjcm9sbFBlcmNlbnQgPSBjb250ZW50SGVpZ2h0ID4gMCA/IE1hdGgubWluKDEwMCAqIHdpbmRvdy5zY3JvbGxZIC8gY29udGVudEhlaWdodCwgMTAwKSA6IDA7XG5cbiAgICAgIGlmIChiYWNrVG9Ub3ApIHtcbiAgICAgICAgICBiYWNrVG9Ub3Auc3R5bGUub3BhY2l0eSA9IHNjcm9sbFBlcmNlbnQgPiA1ID8gMSA6IDA7XG4gICAgICAgICAgbWVudUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgIG1lbnVCdXR0b24uc3R5bGUub3BhY2l0eSA9IHNjcm9sbFBlcmNlbnQgPiA1ID8gMSA6IDA7XG4gICAgICB9XG4gIH0pO1xuXG4gIGJhY2tUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG4gIH0pO1xufSk7XG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2luZ2xlLXBvc3QtY29udGVudHMgaDIsIC5zaW5nbGUtcG9zdC1jb250ZW50cyBoMycpO1xuICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2MgYScpO1xuICBjb25zdCBjb21tZW50c1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMiArIC5zZWN0aW9uJyk7XG4gIGNvbnN0IG9mZnNldCA9IDMwO1xuXG4gIGZ1bmN0aW9uIGZpbmROYXZMaW5rKGhhc2gpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKG5hdkxpbmtzKS5maW5kKGxpbmsgPT4gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gYCMke2hhc2h9YCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckFjdGl2ZVN0YXRlcygpIHtcbiAgICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnYWN0aXZlLWN1cnJlbnQnKTtcbiAgICAgICAgICBsZXQgcGFyZW50ID0gbGluay5wYXJlbnROb2RlO1xuICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9jJykpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcmVudC5tYXRjaGVzKCdsaScpKSB7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdWJNZW51ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgICAgICAgICAgICAgICBpZiAoc3ViTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgIHN1Yk1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2YXRlTmF2QnlTY3JvbGwoKSB7XG4gICAgICBsZXQgY3VycmVudEFjdGl2ZUluZGV4ID0gLTE7XG5cbiAgICAgIGhlYWRpbmdzLmZvckVhY2goKGhlYWRpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2VjdGlvblRvcCA9IGhlYWRpbmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IG9mZnNldDtcblxuICAgICAgICAgIGlmIChzZWN0aW9uVG9wIDw9IGJ1ZmZlcikge1xuICAgICAgICAgICAgICBjdXJyZW50QWN0aXZlSW5kZXggPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY29tbWVudHNWaXNpYmxlID0gY29tbWVudHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgaWYgKGNvbW1lbnRzVmlzaWJsZSkge1xuICAgICAgICAgIGNsZWFyQWN0aXZlU3RhdGVzKCk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRBY3RpdmVJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb25zdCBhY3RpdmVIZWFkaW5nID0gaGVhZGluZ3NbY3VycmVudEFjdGl2ZUluZGV4XTtcbiAgICAgICAgICBjb25zdCBhY3RpdmVOYXZMaW5rID0gZmluZE5hdkxpbmsoYWN0aXZlSGVhZGluZy5pZCk7XG4gICAgICAgICAgaWYgKCFhY3RpdmVOYXZMaW5rLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlLWN1cnJlbnQnKSkge1xuICAgICAgICAgICAgICBjbGVhckFjdGl2ZVN0YXRlcygpO1xuICAgICAgICAgICAgICBhY3RpdmVOYXZMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScsICdhY3RpdmUtY3VycmVudCcpO1xuICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gYWN0aXZlTmF2TGluay5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocGFyZW50Lm1hdGNoZXMoJ2xpJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN1Yk1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsZWFyQWN0aXZlU3RhdGVzKCk7XG4gICAgICB9XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWN0aXZhdGVOYXZCeVNjcm9sbCk7XG59KTtcblxuIiwgIi8vIFNob3cgb3IgaGlkZSBuYXYgb24gY2xpY2sgb2YgbWVudSBidXJnZXJcbmZ1bmN0aW9uIHRvZ2dsZU5hdigpIHtcbiAgbGV0IG1haW5NZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLW1lbnUnKTtcbiAgbGV0IG5hdkJhclRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1uYXZiYXItdG9nZ2xlJyk7XG5cbiAgbmF2QmFyVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG1haW5NZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtLWFjdGl2ZScpO1xuICAgIHJlbW92ZVN1Yk1lbnVzKCk7XG4gIH0pO1xufVxuXG4vLyBTaG93IG9yIGhpZGUgbWVudSBpdGVtcyBvbiBtb2JpbGVcbmZ1bmN0aW9uIHRvZ2dsZU1vYmlsZU1lbnUoKSB7XG4gIGxldCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtJyk7XG5cbiAgbWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgc3ViTWVudSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnN1Yi1tZW51Jyk7XG4gICAgICBpZiAoc3ViTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1tZW51LS1hY3RpdmUnKSkge1xuICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZVN1Yk1lbnVzKCk7XG4gICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LmFkZCgnc3ViLW1lbnUtLWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgIH0pO1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICBpdGVtLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIENvbGxhcHNlIHN1Ym1lbnVzXG5mdW5jdGlvbiByZW1vdmVTdWJNZW51cygpIHtcbiAgbGV0IHN1Yk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN1Yi1tZW51Jyk7XG4gIHN1Yk1lbnVzLmZvckVhY2goZnVuY3Rpb24oc3ViKSB7XG4gICAgaWYgKHN1Yi5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1tZW51LS1hY3RpdmUnKSkge1xuICAgICAgc3ViLmNsYXNzTGlzdC5yZW1vdmUoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xuICB0b2dnbGVOYXYoKTtcbiAgdG9nZ2xlTW9iaWxlTWVudSgpO1xufSkoKTtcblxuZXhwb3J0IHsgaGVhZGVyIH07IiwgImZ1bmN0aW9uIGZpbHRlclBvc3RzKCkge1xuICBsZXQgc2VsZWN0UG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LXBvc3RzJyk7XG4gIGxldCBlbnRyaWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3QtZW50cnktZmlsdGVyJyk7XG4gIGlmIChzZWxlY3RQb3N0cykge1xuICAgIHNlbGVjdFBvc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICBpZiAoZW50cnkuY2xhc3NMaXN0LmNvbnRhaW5zKGBlbnRyeS0tJHtzZWxlY3RQb3N0cy52YWx1ZX1gKSB8IHNlbGVjdFBvc3RzLnZhbHVlID09PSAnYWxsLXBvc3RzJykge1xuICAgICAgICAgIGVudHJ5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVudHJ5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGhvbWUgPSAoKCkgPT4ge1xuICBmaWx0ZXJQb3N0cygpO1xufSkoKTtcblxuZXhwb3J0IHsgaG9tZSB9OyJdLAogICJtYXBwaW5ncyI6ICI7O0FBRUEsV0FBUyxjQUFjO0FBQ3JCLFFBQUksY0FBYyxTQUFTLGVBQWUsYUFBYTtBQUN2RCxRQUFJLGFBQWE7QUFPZixVQUFTLFlBQVQsV0FBcUI7QUFDbkIsWUFBSSxTQUFTLGFBQWEsUUFBUSxhQUFhO0FBQy9DLFlBQUksb0JBQW9CO0FBQ3hCLFlBQUksV0FBVyxNQUFNO0FBQ25CLDhCQUFvQixXQUFXO0FBQUEsUUFDakMsT0FBTztBQUNMLDhCQUFvQixPQUFPLFdBQVcsOEJBQThCLEVBQUU7QUFBQSxRQUN4RTtBQUVBLG9CQUFZLFVBQVU7QUFDdEIsbUJBQVc7QUFBQSxNQUNiLEdBRVMsYUFBVCxXQUFzQjtBQUNwQixZQUFJLFlBQVksU0FBUztBQUN2QixtQkFBUyxLQUFLLGFBQWEsY0FBYyxNQUFNO0FBQy9DLHVCQUFhLFFBQVEsZUFBZSxNQUFNO0FBQUEsUUFDNUMsT0FBTztBQUNMLG1CQUFTLEtBQUssZ0JBQWdCLFlBQVk7QUFDMUMsdUJBQWEsUUFBUSxlQUFlLE9BQU87QUFBQSxRQUM3QztBQUVBLFlBQUksZUFBZSxTQUFTLGNBQWMsNENBQTRDO0FBQ3RGLFlBQUksY0FBYztBQUNoQix1QkFBYSxhQUFhLGNBQWMsWUFBWSxVQUFVLFNBQVMsT0FBTztBQUM5RSxjQUFJLE9BQU8sUUFBUTtBQUNqQixtQkFBTyxPQUFPLE9BQU87QUFBQSxVQUN2QjtBQUFBLFFBQ0Y7QUFHQSxZQUFJLE9BQU8sV0FBVyxhQUFhO0FBQy9CLGlCQUFPLE1B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
