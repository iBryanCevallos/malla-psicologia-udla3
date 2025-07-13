document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.course');
  const completed = new Set();

  function checkUnlocks() {
    buttons.forEach(btn => {
      if (btn.classList.contains('done')) return;
      const prereqs = btn.dataset.prereqs;
      if (!prereqs) {
        btn.classList.remove('locked');
        btn.disabled = false;
        return;
      }
      const reqs = prereqs.split('+');
      const met = reqs.every(r => completed.has(r));
      if (met) {
        btn.classList.remove('locked');
        btn.disabled = false;
      } else {
        btn.classList.add('locked');
        btn.disabled = true;
      }
    });
  }

  buttons.forEach(btn => {
    btn.classList.add('locked');
    btn.disabled = true;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.classList.add('done');
      btn.disabled = true;
      completed.add(btn.dataset.id);
      checkUnlocks();
    });
  });

  checkUnlocks();
});
