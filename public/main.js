(() => {
  // ns-hugo-imp:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/switchTheme.js
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

  // ns-hugo-imp:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/clipboard.js
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

  // ns-hugo-imp:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/components/toc.js
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

  // ns-hugo-imp:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/layouts/header.js
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

  // ns-hugo-imp:/Users/zhenhuang/Documents/Blog/themes/hugo-liftoff/assets/js/pages/home.js
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnby1pbXA6L1VzZXJzL3poZW5odWFuZy9Eb2N1bWVudHMvQmxvZy90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3N3aXRjaFRoZW1lLmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy96aGVuaHVhbmcvRG9jdW1lbnRzL0Jsb2cvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvY29tcG9uZW50cy9jbGlwYm9hcmQuanMiLCAibnMtaHVnby1pbXA6L1VzZXJzL3poZW5odWFuZy9Eb2N1bWVudHMvQmxvZy90aGVtZXMvaHVnby1saWZ0b2ZmL2Fzc2V0cy9qcy9jb21wb25lbnRzL3RvYy5qcyIsICJucy1odWdvLWltcDovVXNlcnMvemhlbmh1YW5nL0RvY3VtZW50cy9CbG9nL3RoZW1lcy9odWdvLWxpZnRvZmYvYXNzZXRzL2pzL2xheW91dHMvaGVhZGVyLmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy96aGVuaHVhbmcvRG9jdW1lbnRzL0Jsb2cvdGhlbWVzL2h1Z28tbGlmdG9mZi9hc3NldHMvanMvcGFnZXMvaG9tZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9Db2R5SG91c2UvZGFyay1saWdodC1tb2RlLXN3aXRjaFxuXG5mdW5jdGlvbiBzd2l0Y2hUaGVtZSgpIHtcbiAgbGV0IHRoZW1lU3dpdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lU3dpdGNoJyk7XG4gIGlmICh0aGVtZVN3aXRjaCkge1xuICAgIGluaXRUaGVtZSgpO1xuXG4gICAgdGhlbWVTd2l0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgcmVzZXRUaGVtZSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaW5pdFRoZW1lKCkge1xuICAgICAgbGV0IGxzSXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aGVtZVN3aXRjaCcpO1xuICAgICAgbGV0IGRhcmtUaGVtZVNlbGVjdGVkID0gZmFsc2U7XG4gICAgICBpZiAobHNJdGVtICE9PSBudWxsKSB7XG4gICAgICAgIGRhcmtUaGVtZVNlbGVjdGVkID0gbHNJdGVtID09PSAnZGFyayc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgIH1cblxuICAgICAgdGhlbWVTd2l0Y2guY2hlY2tlZCA9IGRhcmtUaGVtZVNlbGVjdGVkO1xuICAgICAgcmVzZXRUaGVtZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VGhlbWUoKSB7XG4gICAgICBpZiAodGhlbWVTd2l0Y2guY2hlY2tlZCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZVN3aXRjaCcsICdkYXJrJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10aGVtZScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWVTd2l0Y2gnLCAnbGlnaHQnKTtcbiAgICAgIH1cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZ2lzY3VzIHRoZW1lIGFuZCByZS1yZW5kZXIgaXRcbiAgICAgIGxldCBnaXNjdXNTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbc3JjPVwiaHR0cHM6Ly9naXNjdXMuYXBwL2NsaWVudC5qc1wiXScpO1xuICAgICAgaWYgKGdpc2N1c1NjcmlwdCkge1xuICAgICAgICBnaXNjdXNTY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdGhlbWVTd2l0Y2guY2hlY2tlZCA/ICdkYXJrJyA6ICdsaWdodCcpO1xuICAgICAgICBpZiAod2luZG93Lmdpc2N1cykge1xuICAgICAgICAgIHdpbmRvdy5naXNjdXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgRGlzcXVzIHRvIG1hdGNoIG5ldyBjb2xvciBzY2hlbWVcbiAgICAgIGlmICh0eXBlb2YgRElTUVVTICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgRElTUVVTLnJlc2V0KHsgcmVsb2FkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzd2l0Y2hlciA9ICgoKSA9PiB7XG4gIHN3aXRjaFRoZW1lKCk7XG59KSgpO1xuXG5leHBvcnQgeyBzd2l0Y2hlciB9OyIsICIvLyBBZGFwdGVkIGZyb20gdGhlIGZvbGxvd2luZyB0dXRvcmlhbHM6XG4vLyBodHRwczovL3d3dy5kYW5ueWd1by5jb20vYmxvZy9ob3ctdG8tYWRkLWNvcHktdG8tY2xpcGJvYXJkLWJ1dHRvbnMtdG8tY29kZS1ibG9ja3MtaW4taHVnby9cbi8vIGh0dHBzOi8vYWFyb25sdW5hLmRldi9ibG9nL2FkZC1jb3B5LWJ1dHRvbi10by1jb2RlLWJsb2Nrcy1odWdvLWNocm9tYS9cbi8vIGh0dHBzOi8vbG9nZmV0Y2guY29tL2h1Z28tYWRkLWNvcHktdG8tY2xpcGJvYXJkLWJ1dHRvbi9cblxuY29uc3QgYWRkQ29weUJ1dHRvbnMgPSAoY2xpcGJvYXJkKSA9PiB7XG4gIC8vIDEuIExvb2sgZm9yIHByZSA+IGNvZGUgZWxlbWVudHMgaW4gdGhlIERPTVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGlnaGxpZ2h0ID4gcHJlID4gY29kZScpLmZvckVhY2goKGNvZGVCbG9jaykgPT4ge1xuICAgIC8vIDIuIENyZWF0ZSBhIGJ1dHRvbiB0aGF0IHdpbGwgdHJpZ2dlciBhIGNvcHkgb3BlcmF0aW9uXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3Qgc3ZnQ29weSA9ICc8c3ZnIHJvbGU9XCJpbWdcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjbGlwYm9hcmRDb3B5XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgdmVyc2lvbj1cIjEuMVwiIHdpZHRoPVwiMTZcIiBkYXRhLXZpZXctY29tcG9uZW50PVwidHJ1ZVwiPjx0aXRsZSBpZD1cImNsaXBib2FyZENvcHlcIj5Db3B5IHRoZSBjb2RlIHNuaXBwZXQgY29udGVudHM8L3RpdGxlPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTAgNi43NUMwIDUuNzg0Ljc4NCA1IDEuNzUgNWgxLjVhLjc1Ljc1IDAgMDEwIDEuNWgtMS41YS4yNS4yNSAwIDAwLS4yNS4yNXY3LjVjMCAuMTM4LjExMi4yNS4yNS4yNWg3LjVhLjI1LjI1IDAgMDAuMjUtLjI1di0xLjVhLjc1Ljc1IDAgMDExLjUgMHYxLjVBMS43NSAxLjc1IDAgMDE5LjI1IDE2aC03LjVBMS43NSAxLjc1IDAgMDEwIDE0LjI1di03LjV6XCI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTUgMS43NUM1IC43ODQgNS43ODQgMCA2Ljc1IDBoNy41QzE1LjIxNiAwIDE2IC43ODQgMTYgMS43NXY3LjVBMS43NSAxLjc1IDAgMDExNC4yNSAxMWgtNy41QTEuNzUgMS43NSAwIDAxNSA5LjI1di03LjV6bTEuNzUtLjI1YS4yNS4yNSAwIDAwLS4yNS4yNXY3LjVjMCAuMTM4LjExMi4yNS4yNS4yNWg3LjVhLjI1LjI1IDAgMDAuMjUtLjI1di03LjVhLjI1LjI1IDAgMDAtLjI1LS4yNWgtNy41elwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIGNvbnN0IHN2Z0NoZWNrID0gJzxzdmcgcm9sZT1cImltZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGFyaWEtbGFiZWxsZWRieT1cImNsaXBib2FyZENoZWNrbWFya1wiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDaGVja21hcmtcIj5Db2RlIHNuaXBwZXQgY29udGVudHMgY29waWVkPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYig2MywgMTg1LCA4MClcIiBkPVwiTTEzLjc4IDQuMjJhLjc1Ljc1IDAgMDEwIDEuMDZsLTcuMjUgNy4yNWEuNzUuNzUgMCAwMS0xLjA2IDBMMi4yMiA5LjI4YS43NS43NSAwIDAxMS4wNi0xLjA2TDYgMTAuOTRsNi43Mi02LjcyYS43NS43NSAwIDAxMS4wNiAwelwiPjwvcGF0aD48L3N2Zz4nO1xuICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnY2xpcGJvYXJkLWJ1dHRvbic7XG4gICAgYnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgdGV4dFRvQ29weSA9ICcnO1xuICAgICAgbGV0IGNvZGVCbG9ja0NoaWxkcmVuID0gQXJyYXkuZnJvbShjb2RlQmxvY2suY2hpbGRyZW4pXG4gICAgICBjb2RlQmxvY2tDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKHNwYW4pIHtcbiAgICAgICAgLy8gbGFzdENoaWxkIGlzIHJlcXVpcmVkIHRvIGF2b2lkIGNvcHlpbmcgbGluZSBudW1iZXJzXG4gICAgICAgIHRleHRUb0NvcHkgKz0gc3Bhbi5sYXN0Q2hpbGQuaW5uZXJUZXh0O1xuICAgICAgfSk7XG4gICAgICBjbGlwYm9hcmQud3JpdGVUZXh0KHRleHRUb0NvcHkpLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBidXR0b24uYmx1cigpO1xuICAgICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBzdmdDaGVjaztcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IChidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weSksIDIwMDApO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IChidXR0b24uaW5uZXJIVE1MID0gJ0Vycm9yJylcbiAgICAgICk7XG4gICAgfSk7XG4gICAgLy8gMy4gQXBwZW5kIHRoZSBidXR0b24gZGlyZWN0bHkgYmVmb3JlIHRoZSBwcmUgdGFnXG4gICAgY29uc3QgcHJlID0gY29kZUJsb2NrLnBhcmVudE5vZGU7XG4gICAgcHJlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgcHJlKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGlwYm9hcmQgPSAoKCkgPT4ge1xuICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICBhZGRDb3B5QnV0dG9ucyhuYXZpZ2F0b3IuY2xpcGJvYXJkKTtcbiAgfVxufSkoKTtcblxuZXhwb3J0IHsgY2xpcGJvYXJkIH07IiwgIi8vIGNvbnN0IHRvZ2dsZVRvYyA9ICgoKSA9PiB7XG4vLyAgIGxldCB0b2NUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdG9jLXRvZ2dsZScpO1xuLy8gICBsZXQgdG9jQ29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdG9jLWNvbnRlbnRzJyk7XG5cbi8vICAgaWYgKHRvY1RvZ2dsZSkge1xuLy8gICAgIHRvY1RvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICAgIHRvY0NvbnRlbnRzLmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1jb250ZW50cy0tYWN0aXZlJyk7XG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH0pKCk7XG5cbi8vIGV4cG9ydCB7IHRvZ2dsZVRvYyB9O1xuXG4vLyAtLS0tLVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBjb25zdCBiYWNrVG9Ub3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFjay10by10b3AnKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWJ1dHRvbicpO1xuICBjb25zdCB0b2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9jJyk7XG4gIGNvbnN0IHNpbmdsZUNvbnRhaW5lclBvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2luZ2xlLWNvbnRhaW5lci1wb3N0Jyk7XG4gIGxldCBpc1RvY1Zpc2libGUgPSBmYWxzZTtcbiAgXG4gIGlmIChtZW51QnV0dG9uKSB7XG4gICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzVG9jVmlzaWJsZSA9ICFpc1RvY1Zpc2libGU7XG4gICAgICB0b2Muc3R5bGUuZGlzcGxheSA9IGlzVG9jVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICBpZiAoaXNUb2NWaXNpYmxlKSB7XG4gICAgICAgIHNpbmdsZUNvbnRhaW5lclBvc3QuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYXlvdXQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNpbmdsZUNvbnRhaW5lclBvc3QuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1sYXlvdXQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgY29uc3QgY29udGVudEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHNjcm9sbFBlcmNlbnQgPSBjb250ZW50SGVpZ2h0ID4gMCA/IE1hdGgubWluKDEwMCAqIHdpbmRvdy5zY3JvbGxZIC8gY29udGVudEhlaWdodCwgMTAwKSA6IDA7XG5cbiAgICBpZiAoYmFja1RvVG9wKSB7XG4gICAgICBiYWNrVG9Ub3Auc3R5bGUub3BhY2l0eSA9IHNjcm9sbFBlcmNlbnQgPiAzID8gMSA6IDA7XG4gICAgfVxuICB9KTtcblxuICBiYWNrVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNpbmdsZS1wb3N0LWNvbnRlbnRzIGgyLCAuc2luZ2xlLXBvc3QtY29udGVudHMgaDMnKTtcbiAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9jIGEnKTtcbiAgY29uc3QgY29tbWVudHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDIgKyAuc2VjdGlvbicpO1xuICBjb25zdCBvZmZzZXQgPSAzMDtcblxuICBmdW5jdGlvbiBmaW5kTmF2TGluayhoYXNoKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShuYXZMaW5rcykuZmluZChsaW5rID0+IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09IGAjJHtoYXNofWApO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJBY3RpdmVTdGF0ZXMoKSB7XG4gICAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJywgJ2FjdGl2ZS1jdXJyZW50Jyk7XG4gICAgICAgICAgbGV0IHBhcmVudCA9IGxpbmsucGFyZW50Tm9kZTtcbiAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvYycpKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJlbnQubWF0Y2hlcygnbGknKSkge1xuICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTWVudSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICAgICAgICAgICAgICAgICAgaWYgKHN1Yk1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzdWJNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhY3RpdmF0ZU5hdkJ5U2Nyb2xsKCkge1xuICAgICAgbGV0IGN1cnJlbnRBY3RpdmVJbmRleCA9IC0xO1xuXG4gICAgICBoZWFkaW5ncy5mb3JFYWNoKChoZWFkaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBoZWFkaW5nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgICAgICBjb25zdCBidWZmZXIgPSBvZmZzZXQ7XG5cbiAgICAgICAgICBpZiAoc2VjdGlvblRvcCA8PSBidWZmZXIpIHtcbiAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvbW1lbnRzVmlzaWJsZSA9IGNvbW1lbnRzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgIGlmIChjb21tZW50c1Zpc2libGUpIHtcbiAgICAgICAgICBjbGVhckFjdGl2ZVN0YXRlcygpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QWN0aXZlSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY29uc3QgYWN0aXZlSGVhZGluZyA9IGhlYWRpbmdzW2N1cnJlbnRBY3RpdmVJbmRleF07XG4gICAgICAgICAgY29uc3QgYWN0aXZlTmF2TGluayA9IGZpbmROYXZMaW5rKGFjdGl2ZUhlYWRpbmcuaWQpO1xuICAgICAgICAgIGlmICghYWN0aXZlTmF2TGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZS1jdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgY2xlYXJBY3RpdmVTdGF0ZXMoKTtcbiAgICAgICAgICAgICAgYWN0aXZlTmF2TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnLCAnYWN0aXZlLWN1cnJlbnQnKTtcbiAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IGFjdGl2ZU5hdkxpbmsucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2MnKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5tYXRjaGVzKCdsaScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk1lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcigndWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViTWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJNZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGVhckFjdGl2ZVN0YXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlTmF2QnlTY3JvbGwpO1xufSk7XG5cbiIsICIvLyBTaG93IG9yIGhpZGUgbmF2IG9uIGNsaWNrIG9mIG1lbnUgYnVyZ2VyXG5mdW5jdGlvbiB0b2dnbGVOYXYoKSB7XG4gIGxldCBtYWluTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tZW51Jyk7XG4gIGxldCBuYXZCYXJUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtbmF2YmFyLXRvZ2dsZScpO1xuXG4gIG5hdkJhclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBtYWluTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LS1hY3RpdmUnKTtcbiAgICByZW1vdmVTdWJNZW51cygpO1xuICB9KTtcbn1cblxuLy8gU2hvdyBvciBoaWRlIG1lbnUgaXRlbXMgb24gbW9iaWxlXG5mdW5jdGlvbiB0b2dnbGVNb2JpbGVNZW51KCkge1xuICBsZXQgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbScpO1xuXG4gIG1lbnVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbGV0IHN1Yk1lbnUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudScpO1xuICAgICAgaWYgKHN1Yk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItbWVudS0tYWN0aXZlJykpIHtcbiAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVTdWJNZW51cygpO1xuICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5hZGQoJ3N1Yi1tZW51LS1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgIGl0ZW0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICB9KTtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgaXRlbS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBDb2xsYXBzZSBzdWJtZW51c1xuZnVuY3Rpb24gcmVtb3ZlU3ViTWVudXMoKSB7XG4gIGxldCBzdWJNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdWItbWVudScpO1xuICBzdWJNZW51cy5mb3JFYWNoKGZ1bmN0aW9uKHN1Yikge1xuICAgIGlmIChzdWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItbWVudS0tYWN0aXZlJykpIHtcbiAgICAgIHN1Yi5jbGFzc0xpc3QucmVtb3ZlKCdzdWItbWVudS0tYWN0aXZlJyk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgaGVhZGVyID0gKCgpID0+IHtcbiAgdG9nZ2xlTmF2KCk7XG4gIHRvZ2dsZU1vYmlsZU1lbnUoKTtcbn0pKCk7XG5cbmV4cG9ydCB7IGhlYWRlciB9OyIsICJmdW5jdGlvbiBmaWx0ZXJQb3N0cygpIHtcbiAgbGV0IHNlbGVjdFBvc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC1wb3N0cycpO1xuICBsZXQgZW50cmllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0LWVudHJ5LWZpbHRlcicpO1xuICBpZiAoc2VsZWN0UG9zdHMpIHtcbiAgICBzZWxlY3RQb3N0cy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5LmNsYXNzTGlzdC5jb250YWlucyhgZW50cnktLSR7c2VsZWN0UG9zdHMudmFsdWV9YCkgfCBzZWxlY3RQb3N0cy52YWx1ZSA9PT0gJ2FsbC1wb3N0cycpIHtcbiAgICAgICAgICBlbnRyeS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnRyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBob21lID0gKCgpID0+IHtcbiAgZmlsdGVyUG9zdHMoKTtcbn0pKCk7XG5cbmV4cG9ydCB7IGhvbWUgfTsiXSwKICAibWFwcGluZ3MiOiAiOztBQUVBLFdBQVMsY0FBYztBQUNyQixRQUFJLGNBQWMsU0FBUyxlQUFlLGFBQWE7QUFDdkQsUUFBSSxhQUFhO0FBT2YsVUFBUyxZQUFULFdBQXFCO0FBQ25CLFlBQUksU0FBUyxhQUFhLFFBQVEsYUFBYTtBQUMvQyxZQUFJLG9CQUFvQjtBQUN4QixZQUFJLFdBQVcsTUFBTTtBQUNuQiw4QkFBb0IsV0FBVztBQUFBLFFBQ2pDLE9BQU87QUFDTCw4QkFBb0IsT0FBTyxXQUFXLDhCQUE4QixFQUFFO0FBQUEsUUFDeEU7QUFFQSxvQkFBWSxVQUFVO0FBQ3RCLG1CQUFXO0FBQUEsTUFDYixHQUVTLGFBQVQsV0FBc0I7QUFDcEIsWUFBSSxZQUFZLFNBQVM7QUFDdkIsbUJBQVMsS0FBSyxhQUFhLGNBQWMsTUFBTTtBQUMvQyx1QkFBYSxRQUFRLGVBQWUsTUFBTTtBQUFBLFFBQzVDLE9BQU87QUFDTCxtQkFBUyxLQUFLLGdCQUFnQixZQUFZO0FBQzFDLHVCQUFhLFFBQVEsZUFBZSxPQUFPO0FBQUEsUUFDN0M7QUFFQSxZQUFJLGVBQWUsU0FBUyxjQUFjLDRDQUE0QztBQUN0RixZQUFJLGNBQWM7QUFDaEIsdUJBQWEsYUFBYSxjQUFjLFlBQVksVUFBVSxTQUFTLE9BQU87QUFDOUUsY0FBSSxPQUFPLFFBQVE7QUFDakIsbUJBQU8sT0FBTyxPQUFPO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBR0EsWUFBSSxPQUFPLFdBQVcsYUFBYTtBQUMvQixpQkFBTyxNQUFNLEVBQUUsUUFBUSxLQUFLLENBQUM7QUFBQSxRQUNqQztBQUFBLE1BQ0Y7QUF4Q0EsZ0JBQVU7QUFF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
