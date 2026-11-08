(function () {
  'use strict';
  var counter = 114127387;
  var test = new URLSearchParams(location.search).get('analytics_test') === '1';
  var bindings = [
    ['.actions a[href^="https://wa.me/"]', 'whatsapp_hero'],
    ['.actions a[href^="tel:"]', 'phone_hero'],
    ['.product:nth-child(1) a', 'whatsapp_euro'],
    ['.product:nth-child(2) a', 'whatsapp_wide'],
    ['.product:nth-child(3) a', 'whatsapp_epal'],
    ['footer a[href^="tel:"]', 'phone_footer'],
    ['.mobile a[href^="https://wa.me/"]', 'whatsapp_mobile'],
    ['.mobile a[href^="tel:"]', 'phone_mobile']
  ];
  if (!test) {
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Date.now();
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://mc.yandex.ru/metrika/tag.js?id=' + counter;
    document.head.appendChild(tag);
    window.ym(counter, 'init', {clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false});
  }
  bindings.forEach(function (binding) {
    var link = document.querySelector(binding[0]);
    if (!link) return;
    link.dataset.analyticsGoal = binding[1];
    link.addEventListener('click', function (event) {
      if (test) {
        event.preventDefault();
        console.info('analytics_test', binding[1]);
        return;
      }
      var params = {button: binding[1], channel: binding[1].startsWith('whatsapp') ? 'whatsapp' : 'phone'};
      var normal = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0;
      var finished = false;
      function navigate() {
        if (finished || !normal) return;
        finished = true;
        location.assign(link.href);
      }
      if (normal) { event.preventDefault(); setTimeout(navigate, 650); }
      try { window.ym(counter, 'reachGoal', binding[1], params, navigate); }
      catch (_) { navigate(); }
    });
  });
}());
