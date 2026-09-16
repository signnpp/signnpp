/* SIGNN++ project page.
   Two jobs only. No framework, no build step -- the page works as a plain
   file on disk and on GitHub Pages without anything installed. */

(function () {
  "use strict";

  /* 1. Figure slots.
     Each placeholder names the file it is waiting for. On load we try that
     file: if it exists the real figure replaces the placeholder, and if it
     does not the placeholder stays and keeps telling you what to export.
     That means figures can be added by dropping files into
     static/images/ -- no edit to index.html is needed. */
  document.querySelectorAll(".slot[data-slot]").forEach(function (slot) {
    var src = slot.getAttribute("data-slot");
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement("img");
      img.src = src;
      img.alt = slot.textContent.trim();
      img.loading = "lazy";
      img.decoding = "async";
      slot.replaceWith(img);
    };
    probe.src = src;
  });

  /* 2. Copy the citation. The button reports what happened rather than
     flashing a generic tick, and restores its own label afterwards. */
  var copy = document.querySelector(".copy");
  var bib = document.querySelector(".bib code");
  if (copy && bib) {
    copy.addEventListener("click", function () {
      var label = copy.textContent;
      var done = function (msg) {
        copy.textContent = msg;
        setTimeout(function () { copy.textContent = label; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bib.textContent).then(
          function () { done("Copied"); },
          function () { done("Press Ctrl+C to copy"); }
        );
      } else {
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(bib);
        sel.removeAllRanges();
        sel.addRange(range);
        done("Press Ctrl+C to copy");
      }
    });
  }
})();
