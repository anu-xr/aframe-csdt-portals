import { CSDTParent } from './lib/csdt.module';

AFRAME.registerComponent('csdt-portal', {
  schema: {
    href: { default: '' },
    title: { default: '' },
    width: { default: 1.5 },
    height: { default: 2.4 },
    frameWidth: { default: 0.15 },
    enableFrame: { default: true },
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    data.siteSendsThree = false;
    data.siteRecievesThree = false;
    data.has_iframe_loaded = false;
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

    //create iframe
    const iframe = document.createElement('iframe');
    iframe.src = data.href;
    document.body.appendChild(iframe);

    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.overflow = 'none';
    iframe.style.display = 'none';

    const CSDT = new CSDTParent(iframe);

    //set up CSDT
    el.addEventListener('iframe loaded', () => {
      iframe.addEventListener('load', () => {
        //check for CSDT supprt
        CSDT.checkSupport().then(() => {
          console.log('got support response');
          //open a portal
          CSDT.openPortal(true, true, true).then((d) => {
            console.log(d);
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

    if (data.has_iframe_loaded == false) {
      if (el.websurface_iframe) {
        if (el.websurface_iframe.contentDocument) {
          data.has_iframe_loaded = true;
          el.emit('iframe loaded');
        }
      }
    }

    if (data.siteRecievesThree == true) {
      //send our three scene to the site
      const scene = el.sceneEl.object3D.clone();
      scene.children = scene.children.filter((child) => {
        child.el.id !== 'player';
      });
      if (Math.random() > 0.99) console.log(scene.children);
    }
  },
});
