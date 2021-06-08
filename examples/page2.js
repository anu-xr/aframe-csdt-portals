const scene = document.querySelector('a-scene');

document.addEventListener('CSDT-portal-open', (e) => {
  const d = e.detail;

  //create a portal
  const portal = document.createElement('a-entity');
  portal.setAttribute('web-portal', 'url:parent; text:Return to Parent;');
  portal.setAttribute('position', '0 0 -6');
  scene.appendChild(portal);

  //send info back to parent
  CSDT.responsePortalOpen(true, true, true);
});
