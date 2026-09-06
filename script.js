const filterButtons = document.querySelectorAll('.filter-btn');
const gemCards = document.querySelectorAll('.gem-card');
const gemSelect = document.getElementById('gemSelect');
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    gemCards.forEach(card => {
      const show = filter === 'all' || card.dataset.color === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

document.querySelectorAll('.enquire-btn').forEach(button => {
  button.addEventListener('click', () => {
    gemSelect.value = button.dataset.gem;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('formNote').textContent = 'Sample enquiry ready. Add your WhatsApp number to connect this form in the final site.';
});
