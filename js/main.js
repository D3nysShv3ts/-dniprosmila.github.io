
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initBackToTop();
  initNavbarEffect();
  initReveal();
  initHeroParticles();
  initTiltCards();
  initContactForm();
});

function initProgressBar(){
  const bar = document.createElement('div');
  bar.className = 'page-progress';
  document.body.appendChild(bar);
  const update = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const progress = total > 0 ? (h.scrollTop / total) * 100 : 0;
    bar.style.width = progress + '%';
  };
  update();
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
}

function initBackToTop(){
  const button = document.createElement('button');
  button.className = 'top-button';
  button.setAttribute('aria-label', 'Повернутися нагору');
  button.innerHTML = '↑';
  document.body.appendChild(button);
  const toggle = () => {
    if(window.scrollY > 320){ button.classList.add('show'); }
    else { button.classList.remove('show'); }
  };
  toggle();
  window.addEventListener('scroll', toggle, {passive:true});
  button.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

function initNavbarEffect(){
  const navbar = document.querySelector('.navbar');
  if(!navbar) return;
  const onScroll = () => navbar.classList.toggle('navbar-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
}

function initReveal(){
  document.querySelectorAll('.card, .feature-box, .stats, .section-title, .gallery-card, .service-card, .hero-panel').forEach(el => {
    if(!el.classList.contains('reveal-card')) el.classList.add('reveal');
  });
  const items = document.querySelectorAll('.reveal, .reveal-card, .reveal-up');
  if(!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.16});
  items.forEach(item => observer.observe(item));
}

function initHeroParticles(){
  document.querySelectorAll('.hero, .hero-mini').forEach((hero) => {
    const layer = document.createElement('div');
    layer.className = 'hero-particles';
    const count = hero.classList.contains('hero') ? 18 : 10;
    for(let i = 0; i < count; i++){
      const dot = document.createElement('span');
      dot.style.left = Math.random() * 100 + '%';
      dot.style.bottom = (-10 - Math.random() * 20) + 'px';
      const size = 4 + Math.random() * 7;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.animationDuration = (6 + Math.random() * 8) + 's';
      dot.style.animationDelay = (Math.random() * 5) + 's';
      layer.appendChild(dot);
    }
    hero.appendChild(layer);
  });
}

function initTiltCards(){
  const cards = document.querySelectorAll('.soft-card, .service-card, .hero-panel');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if(window.innerWidth < 992) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = (0.5 - (y / rect.height)) * 5;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initContactForm(){
  const form = document.querySelector('#contactForm');
  if(!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      input.classList.remove('is-invalid');
      if(input.hasAttribute('required') && !input.value.trim()){
        input.classList.add('is-invalid');
        valid = false;
      }
      if(input.type === 'email' && input.value.trim()){
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        if(!ok){
          input.classList.add('is-invalid');
          valid = false;
        }
      }
    });

    const old = form.querySelector('.form-status');
    if(old) old.remove();

    const msg = document.createElement('div');
    msg.className = 'form-status alert mt-3 ' + (valid ? 'alert-success' : 'alert-danger');
    msg.textContent = valid ? 'Повідомлення успішно підготовлено. Тут можна підключити реальну відправку.' : 'Будь ласка, правильно заповніть усі обов’язкові поля.';
    form.appendChild(msg);

    if(valid) form.reset();
  });
}
