document.addEventListener('DOMContentLoaded', function () {
  const paths = window.location.pathname.split('/');
  console.log('paths', paths);
  let pagePath = paths[paths.length - 1];
  if (!pagePath.includes('.html')) {
    pagePath = 'index.html';
  }
  console.log('pagePath', pagePath);

  const page = pagePath.split('.')[0];
  console.log('page', page);

  const lis = document.querySelectorAll('nav ul li');
  console.log('lis', lis);
  lis.forEach((nav) => {
    console.log('nav', nav);
    if (nav.childNodes[0].innerText.toLowerCase() == page.toLowerCase()) {
      nav.childNodes[0].classList.add('current');
      console.log('adding current to', nav.childNodes[0]);
    }
  });
});
