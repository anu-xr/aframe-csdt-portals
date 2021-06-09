import { CSDTChild } from './lib/csdt.module';
import { deepRemoveIds } from './utils';

AFRAME.registerComponent('csdt-receiver-portal', {
  schema: {
    title: { default: 'Return to Parent' },
    width: { default: 1.5 },
    height: { default: 2.4 },
    player: { default: 'player' }, //id of the player
    frameWidth: { default: 0.15 },
    enableFrame: { default: true },
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    const CSDT = (el.CSDT = new CSDTChild());

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
    document.addEventListener('CSDT-portal-open', (e) => {
      const d = e.detail;
      const ydoc = CSDT.ydoc;

      //if the parent site supports receiving three data
      if (d.recievesThree == true) {
        const ymap = ydoc.getMap('portal');

        //filter scene
        const sceneCpy = el.sceneEl.object3D.clone();
        const [filtered, removed] = deepRemoveIds(el.sceneEl.object3D, [data.player]);
        el.sceneEl.object3D = sceneCpy;

        const spawnLocation = el.object3D.getWorldPosition(new THREE.Vector3());

        ydoc.transact(() => {
          ymap.set('childScene', JSON.stringify(filtered));
          ymap.set('spawnLocation', JSON.stringify(spawnLocation));
        });
      }

      //send info back to parent
      CSDT.responsePortalOpen(true, true, true);
    });
  },
});
