document.addEventListener('DOMContentLoaded', function () {
  const paths = window.location.pathname.split('/');
  let pagePath = paths[paths.length - 1];
  if (!pagePath.includes('.html')) {
    pagePath = 'index.html';
  }
  const page = pagePath.split('.')[0];

  const lis = document.querySelectorAll('nav ul li');
  lis.forEach((nav) => {
    if (nav.childNodes[0].innerText.toLowerCase() == page.toLowerCase()) {
      nav.classList.add('current');
    }
  });
});
