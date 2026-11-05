/* Progressive enhancement: the content and all destinations work without JavaScript. */
(() => {
  "use strict";
  const menu = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (menu && nav) {
    const setMenu = (open, restoreFocus = false) => {
      menu.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (restoreFocus) menu.focus();
    };
    menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        setMenu(false, true);
      }
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
    document.documentElement.classList.add("menu-ready");
    menu.hidden = false;
  }

  const controls = document.getElementById("work-controls");
  const cards = [...document.querySelectorAll("[data-categories]")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const status = document.getElementById("work-status");
  if (controls && cards.length && filters.length && status) {
    filters.forEach(button => {
      button.addEventListener("click", () => {
        const category = button.dataset.filter;
        let shown = 0;
        cards.forEach(card => {
          const visible = category === "all" || card.dataset.categories.split(/\s+/).includes(category);
          card.hidden = !visible;
          if (visible) shown++;
        });
        filters.forEach(filter => filter.setAttribute("aria-pressed", String(filter === button)));
        status.textContent = shown + (shown === 1 ? " project" : " projects") + (category === "all" ? "" : " · " + button.textContent.trim());
      });
    });
    controls.hidden = false;
  }

  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll("[data-section]")];
    const sections = links.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
    const activeSections = new Map();
    const update = () => {
      const active = sections.find(section => activeSections.get(section.id));
      links.forEach(link => {
        if (active && link.dataset.section === active.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => activeSections.set(entry.target.id, entry.isIntersecting));
      update();
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
})();
