export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);


export function handleNavLink() {
  const navLink = $$('.nav-item');

  navLink.forEach((e) => {
    e.onclick = function () {
      $('.collapse.navbar-collapse').classList.remove('show');
    }
  })
}

export function createLocalStorage() {
  localStorage.setItem('user', JSON.stringify({
    auth: false,
    avatar: "",
    email: "",
    id: "",
    name: "",
    password: "",
    phone: "",
    username: "",
  }))
  localStorage.setItem('favorites', JSON.stringify([]))
}