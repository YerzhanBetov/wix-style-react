if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (callback) {
      window.clearTimeout(callback);
    };
  })();
}
