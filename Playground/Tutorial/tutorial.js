// =====================================================================
// TUTORIAL PAGE HELPER
// Makes the on-page key labels (<kbd>) light up while you hold them.
// This is just page decoration - it's NOT part of the p5.js lesson,
// and it doesn't touch your sketch.
//
//   <kbd data-code="KeyW">W</kbd>       lights up while W is held
//   <kbd data-mouse="left">Left</kbd>   lights up while left mouse is held
// =====================================================================

(function () {
  function setDown(selector, isDown) {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.toggle("down", isDown);
    });
  }

  window.addEventListener("keydown", (e) => setDown(`kbd[data-code="${e.code}"]`, true));
  window.addEventListener("keyup", (e) => setDown(`kbd[data-code="${e.code}"]`, false));

  const buttons = { 0: "left", 1: "center", 2: "right" };
  window.addEventListener("pointerdown", (e) => setDown(`kbd[data-mouse="${buttons[e.button]}"]`, true));
  window.addEventListener("pointerup", (e) => setDown(`kbd[data-mouse="${buttons[e.button]}"]`, false));

  // Clear everything if the window loses focus
  window.addEventListener("blur", () => setDown("kbd.down", false));
})();
