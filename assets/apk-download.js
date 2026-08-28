(function () {
  var DEFAULT_HREF =
    "https://github.com/DCSvisuals/OneLoop-Medication-TrackerAndroid/releases/download/v2.0.1-android-sideload/OneLoop-sideload.apk";

  function ensureModal() {
    if (document.getElementById("apk-modal")) return;
    var wrap = document.createElement("div");
    wrap.id = "apk-modal";
    wrap.className = "apk-modal";
    wrap.setAttribute("hidden", "");
    wrap.innerHTML =
      '<div class="apk-modal-card" role="dialog" aria-modal="true" aria-labelledby="apk-modal-title">' +
      '<p class="kicker">ANDROID BETA</p>' +
      '<h2 id="apk-modal-title">This is a beta. Use it at your own risk.</h2>' +
      "<p>OneLoop is in its first Android beta. It is a personal reminder tool, not a medical device, and it cannot guarantee every reminder. Sideload only on a phone you control. Requires Android 12 or newer. Allow Install unknown apps for Files or Chrome, then open the APK.</p>" +
      '<div class="actions">' +
      '<button type="button" class="button secondary" data-apk-cancel>Cancel</button>' +
      '<a class="button primary" data-apk-confirm href="#">Download APK</a>' +
      "</div>" +
      "</div>";
    document.body.appendChild(wrap);
    wrap.addEventListener("click", function (event) {
      if (event.target === wrap) closeModal();
    });
    wrap.querySelector("[data-apk-cancel]").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeModal();
    });
  }

  function openModal(href) {
    ensureModal();
    var wrap = document.getElementById("apk-modal");
    var confirm = wrap.querySelector("[data-apk-confirm]");
    confirm.setAttribute("href", href || DEFAULT_HREF);
    confirm.setAttribute("download", "OneLoop-sideload.apk");
    wrap.removeAttribute("hidden");
    document.body.classList.add("apk-modal-open");
    confirm.focus();
  }

  function closeModal() {
    var wrap = document.getElementById("apk-modal");
    if (!wrap) return;
    wrap.setAttribute("hidden", "");
    document.body.classList.remove("apk-modal-open");
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a.js-apk-download");
    if (!link) return;
    event.preventDefault();
    openModal(link.getAttribute("href") || DEFAULT_HREF);
  });
})();
