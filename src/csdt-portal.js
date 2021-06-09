import { CSDTParent } from './lib/csdt.module';

AFRAME.registerComponent('csdt-portal', {
  schema: {
    href: { default: '' },
    title: { default: '' },
    width: { default: 1.5 },
    height: { default: 2.4 },
    player: { default: '#player' },
    frameWidth: { default: 0.15 },
    enableFrame: { default: true },
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    const sceneEl = el.sceneEl;

    data.dstOrigin = new THREE.Vector3(0, 100000, 0);
    data.has_iframe_loaded = false;

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

    //create portals
    const srcId = 'src' + Math.random().toString(36).substring(2, 15);
    const dstId = 'dst' + Math.random().toString(36).substring(2, 15);

    const portalSrc = document.createElement('a-entity');
    const elPostion = el.object3D.getWorldPosition(new THREE.Vector3());
    portalSrc.setAttribute('position', {
      x: elPostion.x,
      y: elPostion.y,
      z: elPostion.z,
    });
    portalSrc.setAttribute('id', srcId);
    sceneEl.appendChild(portalSrc);

    const portalDst = document.createElement('a-entity');
    portalDst.setAttribute('position', {
      x: data.dstOrigin.x,
      y: (data.dstOrigin.y += data.height / 2),
      z: data.dstOrigin.z,
    });
    portalDst.setAttribute('id', dstId);
    sceneEl.appendChild(portalDst);

    portalSrc.setAttribute('portal', {
      destination: `#${dstId}`,
      player: data.player,
      width: data.width,
      height: data.height,
    });
    portalDst.setAttribute('portal', {
      destination: `#${srcId}`,
      player: data.player,
      width: data.width,
      height: data.height,
    });

    //create child scene holder
    el.holder = new THREE.Group();
    el.object3D.add(el.holder);

    //create scene loader
    el.sceneLoader = new THREE.ObjectLoader();

    //create iframe
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.src = data.href;
    el.iframe = iframe;

    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.overflow = 'none';
    iframe.style.display = 'none';

    const CSDT = (el.CSDT = new CSDTParent(iframe));

    //set up CSDT
    el.addEventListener('iframe loaded', () => {
      iframe.addEventListener('load', () => {
        //check for CSDT supprt
        CSDT.checkSupport().then(() => {
          const ydoc = el.CSDT.ydoc;
          const ymap = ydoc.getMap('portal');

          ymap.observe(() => {
            const childScene = ymap.get('childScene');
            if (!childScene) return;

            const spawnLocation = ymap.get('spawnLocation');
            if (!spawnLocation) return;

            const spawnLocationParsed = JSON.parse(spawnLocation);

            const childSceneParsed = JSON.parse(childScene);
            el.holder.children = el.sceneLoader.parse(childSceneParsed).children;

            const localOffset = el.object3D.localToWorld(new THREE.Vector3());
            const spawnOffset = new THREE.Vector3(spawnLocationParsed.x, spawnLocationParsed.y, spawnLocationParsed.z);
            const origin = data.dstOrigin.clone().sub(localOffset).sub(spawnOffset);

            el.holder.position.x = origin.x;
            el.holder.position.y = origin.y;
            el.holder.position.z = origin.z;
          });

          //open a portal
          CSDT.openPortal(true, true, true).then((d) => {
            if (d.sendsThree == true) {
            }
          });
        });
      });
    });
  },

  tick: function () {
    const el = this.el;
    const data = this.data;

    if (data.has_iframe_loaded == false) {
      if (el.iframe) {
        if (el.iframe.contentDocument) {
          data.has_iframe_loaded = true;
          el.emit('iframe loaded');
        }
      }
    }
  },
});
