export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export function handleNavLink() {
  // Handle navbar when click on mobile
  const navLink = $$('.nav-item');
  navLink.forEach((e) => {
    e.onclick = function () {
      $('.collapse.navbar-collapse').classList.remove('show');
    }
  })

  // Handle navbar when window scrolling
  const navBar = $('.navbar');
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      navBar.classList.add("hidden");
      $('.collapse.navbar-collapse').classList.remove('show');
    } else {
      navBar.classList.remove("hidden");
      $('.collapse.navbar-collapse').classList.remove('show');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
}