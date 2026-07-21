'use strict';

/* Perfil adaptativo: preserva a identidade em vídeo e reduz apenas o custo auxiliar. */
(function(){
  var nav = window.navigator || {};
  var connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  var slowConnection = !!(connection && /(^|-)2g$/.test(connection.effectiveType || ''));
  var lowPower = (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) ||
    (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) ||
    !!(connection && connection.saveData) || slowConnection;
  window.promptStudioLowPower = lowPower;
  if(lowPower) document.documentElement.classList.add('low-power');
})();
