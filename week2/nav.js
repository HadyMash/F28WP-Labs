const paths = window.location.pathname.split('/');
const pagePath = paths[paths.length - 1];
const page = pagePath.split('.')[0];

const lis = document.querySelectorAll('nav ul li');
lis.forEach((nav) => {
  if (nav.childNodes[0].innerText.toLowerCase() == page.toLowerCase()) {
    nav.classList.add('current');
  }
});
