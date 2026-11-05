// Loads the Lake Domain WebGL build only when the visitor asks to play.
(function () {
  var root = document.getElementById('lake-play');
  if (!root) return;
  var frame = root.querySelector('.lake-play-frame');
  var cover = root.querySelector('.lake-play-cover');
  var full = root.querySelector('.lake-play-full');
  var src = root.getAttribute('data-src');
  cover.addEventListener('click', function () {
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Lake Domain 可游玩版本';
    iframe.allow = 'fullscreen; autoplay; gamepad';
    iframe.allowFullscreen = true;
    frame.replaceChild(iframe, cover);
    full.hidden = false;
    iframe.focus();
  });
  full.addEventListener('click', function () {
    var el = frame.querySelector('iframe') || frame;
    (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
  });
})();
