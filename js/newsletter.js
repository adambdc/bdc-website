// Newsletter + research-notify subscription — Supabase backend
(function () {
  var SB_URL = 'https://fglyjylbilcyqzaprzbl.supabase.co';
  var SB_KEY = 'sb_publishable_3S9VnzDkTXzX1dRJz0UAaQ_wABalcJv';

  function bindForm(id, source, defaultLabel) {
    var form = document.getElementById(id);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = form.querySelector('input[name="email"]');
      var btn = form.querySelector('button[type="submit"]');
      var email = emailInput.value.trim();
      if (!email) return;

      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing...';

      fetch(SB_URL + '/rest/v1/newsletter_subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SB_KEY,
          'Authorization': 'Bearer ' + SB_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email: email, source: source })
      })
        .then(function (res) {
          if (res.ok || res.status === 201) {
            emailInput.value = '';
            btn.textContent = defaultLabel === 'Notify Me' ? 'Subscribed' : 'Subscribed';
            btn.style.background = 'var(--green)';
          } else if (res.status === 409) {
            btn.textContent = 'Already subscribed';
            btn.style.background = 'var(--green)';
          } else {
            throw new Error(res.status);
          }
          setTimeout(function () {
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.background = '';
          }, 3000);
        })
        .catch(function () {
          btn.textContent = 'Error -- try again';
          btn.style.background = 'var(--coral)';
          setTimeout(function () {
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.background = '';
          }, 3000);
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindForm('newsletter-form', 'website', 'Subscribe');
    bindForm('research-notify-form', 'research', 'Notify Me');
  });
})();
