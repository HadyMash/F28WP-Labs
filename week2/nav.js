document.addEventListener('DOMContentLoaded', function () {
  const paths = window.location.pathname.split('/');
  let pagePath = paths[paths.length - 1];
  if (!pagePath.includes('.html') || pagePath == 'index.html') {
    pagePath = 'home.html';
  }

  const page = pagePath.split('.')[0];

  const lis = document.querySelectorAll('nav ul li');
  lis.forEach((nav) => {
    if (nav.childNodes[0].innerText.toLowerCase() == page.toLowerCase()) {
      nav.childNodes[0].classList.add('current');
    }
  });

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');

    if (window.scrollY > 77) {
      header.style.marginBottom = `${nav.offsetHeight}px`;
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
      header.style.marginBottom = '0';
    }
  });
});
