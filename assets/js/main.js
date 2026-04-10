/* ========================================
   主脚本
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSlideShow();
  initSlideNav();
});

/* ---------- 幻灯片展示 ---------- */
function initSlideShow() {
  const pres = document.querySelector('.presentation');
  if (!pres) return;

  const slides = pres.querySelectorAll('.pres-slide');
  const progressFill = pres.querySelector('.pres-progress-bar-fill');
  const counter = pres.querySelector('.pres-counter');
  const closeBtn = pres.querySelector('.pres-close');
  const prevBtn = pres.querySelector('.pres-btn.prev');
  const nextBtn = pres.querySelector('.pres-btn.next');
  let current = 0;

  function show(n) {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    progressFill.style.width = ((current + 1) / slides.length * 100) + '%';
    counter.textContent = `${current + 1} / ${slides.length}`;
  }

  pres.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); show(current + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); show(current - 1); }
    if (e.key === 'Escape') closePres();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => show(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(current + 1));
  if (closeBtn) closeBtn.addEventListener('click', closePres);
}

function openPres(slideSet) {
  const pres = document.querySelector('.presentation');
  if (!pres) return;
  // 激活对应幻灯片集
  pres.querySelectorAll('.pres-slide').forEach(s => s.classList.remove('active'));
  const target = pres.querySelectorAll(`.slide-set-${slideSet}`);
  if (target.length) target[0].classList.add('active');
  pres.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePres() {
  const pres = document.querySelector('.presentation');
  if (!pres) return;
  pres.classList.remove('active');
  document.body.style.overflow = '';
}

/* ---------- 嵌入式幻灯片导航 ---------- */
function initSlideNav() {
  document.querySelectorAll('.slide-container').forEach(container => {
    const slides = container.querySelectorAll('.slide');
    const prevBtn = container.querySelector('.slide-prev');
    const nextBtn = container.querySelector('.slide-next');
    const progressBar = container.querySelector('.slide-progress-bar');
    const counter = container.querySelector('.slide-counter');
    let current = 0;

    function show(n) {
      slides[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (progressBar) progressBar.style.width = ((current + 1) / slides.length * 100) + '%';
      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => show(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(current + 1));

    container.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); show(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    });
  });
}
