AFRAME.registerComponent('csdt-receiver-portal', {
  schema: {
    title: { default: 'Return to Parent' },
    width: { default: 1.5 },
    height: { default: 2.4 },
    frameWidth: { default: 0.15 },
    enableFrame: { default: true },
  },

  init: function () {
    const CSDT = window.CSDT;
    const el = this.el;
    const data = this.data;

    data.parentRecievesThree = false;
    data.parentSendsThree = false;

    el.object3D.position.y += data.height / 2;

    //portal title
    const title = document.createElement('a-text');
    title.setAttribute('value', data.title);
    title.setAttribute('position', `0 ${data.height * 0.5 + 0.25 + data.frameWidth} 0`);
    title.setAttribute('align', 'center');
    title.setAttribute('side', 'double');
    el.appendChild(title);

    //portal frame
    if (data.enableFrame == true) {
      const frameWidth = data.frameWidth;
      const width = data.width;
      const height = data.height;

      const box1 = document.createElement('a-box');
      box1.setAttribute('position', `${(width + frameWidth) / 2} 0 0`);
      box1.setAttribute('scale', `${frameWidth} ${height} ${frameWidth}`);
      el.appendChild(box1);

      const box2 = document.createElement('a-box');
      box2.setAttribute('position', `${-(width + frameWidth) / 2} 0 0`);
      box2.setAttribute('scale', `${frameWidth} ${height} ${frameWidth}`);
      el.appendChild(box2);

      const box3 = document.createElement('a-box');
      box3.setAttribute('position', `0 ${(height + frameWidth) / 2} 0`);
      box3.setAttribute('scale', `${width + frameWidth * 2} ${frameWidth} ${frameWidth}`);
      el.appendChild(box3);

      const box4 = document.createElement('a-box');
      box4.setAttribute('position', `0 0 ${-frameWidth / 4 - 0.01}`);
      box4.setAttribute('scale', `${width + frameWidth * 2} ${height + frameWidth * 2} ${frameWidth / 2}`);
      el.appendChild(box4);
    }

    //set up CSDT
    el.addEventListener('CSDT-portal-open', (e) => {
      const d = e.detail;

      if (d.recievesThree == true) {
        data.parentRecievesThree = true;
      }
      if (d.sendsThree == true) {
        data.parentSendsThree = true;
      }

      //send info back to parent
      CSDT.responsePortalOpen(true, true, true);
    });
  },

  tick: function () {
    const el = this.el;
    const data = this.data;

    if (data.parentRecievesThree == true) {
      //send our three scene to the parent
      const scene = el.sceneEl.object3D.clone();
      scene.children = scene.children.filter((child) => {
        child.el.id !== 'player';
      });
    }
  },
});
