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
    skipTicks: { default: 3 },
  },

  init: function () {
    const el = this.el;
    const data = this.data;
    const sceneEl = el.sceneEl;

    data.dstOrigin = { x: 0, y: 100000, z: 0 };
    data.siteSendsThree = false;
    data.siteRecievesThree = false;

    data.tickCount = 0;
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

    //test cube
    const tbox = document.createElement('a-box');
    tbox.setAttribute('color', 'red');
    tbox.setAttribute('position', { x: data.dstOrigin.x, y: data.dstOrigin.y - 0.5, z: data.dstOrigin.z + 3 });
    sceneEl.appendChild(tbox);

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
          //open a portal
          CSDT.openPortal(true, true, true).then((d) => {
            if (d.sendsThree == true) {
              //if the child site supports sending us threejs data
              data.siteSendsThree = true;
            }
            if (d.recievesThree == true) {
              //if the child site supports recieving threejs data from us
              data.siteRecievesThree = true;
            }
          });
        });
      });
    });
  },

  tick: function () {
    const el = this.el;
    const data = this.data;
    const sceneEl = el.sceneEl;

    data.tickCount += 1;
    if (data.tickCount % data.skipTicks !== 0) return;

    if (data.has_iframe_loaded == false) {
      if (el.iframe) {
        if (el.iframe.contentDocument) {
          data.has_iframe_loaded = true;
          el.emit('iframe loaded');
        }
      }
    }

    if (data.siteRecievesThree == true) {
      //send our three scene to the site
      const ydoc = el.CSDT.ydoc;
      const scene = el.sceneEl.object3D.clone();

      const ytext = ydoc.getText('three-parent');
      ydoc.transact(() => {
        ytext.delete(0, ytext.length);
        ytext.insert(0, JSON.stringify(scene));
      });
    }

    if (data.siteSendsThree == true) {
      const ydoc = el.CSDT.ydoc;

      const ytext = ydoc.getText('three-child');
      if (ytext.toString()) {
        const sceneJson = JSON.parse(ytext.toString());
        el.holder.children = el.sceneLoader.parse(sceneJson).children;

        el.holder.position.x = data.dstOrigin.x;
        el.holder.position.y = data.dstOrigin.y;
        el.holder.position.z = data.dstOrigin.z;

        //if (Math.random() > 0.9) console.log(el.object3D);
      }
    }
  },
});
