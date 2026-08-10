/** Inline script: mark JS + allow motion CSS before paint (no FOUC / no flash). */
export const motionInitScript = `(function(){try{var d=document.documentElement;d.classList.add("js");if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion-ok");}catch(e){}})();`;
