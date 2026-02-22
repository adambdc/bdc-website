// Mobile nav toggle switch
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');
  
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav__links--open');
      toggle.classList.toggle('is-open');
    });
    
    // Close on link click
    document.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        toggle.classList.remove('is-open');
      });
    });
  }

  // Set active class based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    let linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    }
  });

  // Smooth anchor scrolling offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          if (this.getAttribute('href') !== '#') {
              const targetId = this.getAttribute('href').substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                  e.preventDefault();
                  
                  // Mobile nav close
                  if (navLinks && navLinks.classList.contains('nav__links--open')) {
                      navLinks.classList.remove('nav__links--open');
                      if (toggle) toggle.classList.remove('is-open');
                  }

                  const offset = 72; // Nav height
                  const elementPosition = targetElement.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;

                  window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                  });
              }
          }
      });
  });
});
