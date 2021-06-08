function e(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if("default"!==n){var i=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,t}var t,n=e(require("yjs"));function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};t.m=e,t.c=n,t.p="",t(0)}([function(e,t){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");var n={childList:!0,attributes:!0,subtree:!0};AFRAME.registerComponent("aabb-collider",{schema:{collideNonVisible:{default:!1},debug:{default:!1},enabled:{default:!0},interval:{default:80},objects:{default:""}},init:function(){this.centerDifferenceVec3=new THREE.Vector3,this.clearedIntersectedEls=[],this.closestIntersectedEl=null,this.boundingBox=new THREE.Box3,this.boxCenter=new THREE.Vector3,this.boxHelper=new THREE.BoxHelper,this.boxMax=new THREE.Vector3,this.boxMin=new THREE.Vector3,this.hitClosestClearEventDetail={},this.hitClosestEventDetail={},this.intersectedEls=[],this.objectEls=[],this.newIntersectedEls=[],this.prevCheckTime=void 0,this.previousIntersectedEls=[],this.setDirty=this.setDirty.bind(this),this.observer=new MutationObserver(this.setDirty),this.dirty=!0,this.hitStartEventDetail={intersectedEls:this.newIntersectedEls}},play:function(){this.observer.observe(this.el.sceneEl,n),this.el.sceneEl.addEventListener("object3dset",this.setDirty),this.el.sceneEl.addEventListener("object3dremove",this.setDirty)},remove:function(){this.observer.disconnect(),this.el.sceneEl.removeEventListener("object3dset",this.setDirty),this.el.sceneEl.removeEventListener("object3dremove",this.setDirty)},tick:function(e){var t,n,i,s,o=this.boundingBox,r=this.centerDifferenceVec3,a=this.clearedIntersectedEls,l=this.intersectedEls,c=this.el,d=this.newIntersectedEls,h=this.objectEls,u=this.prevCheckTime,m=this.previousIntersectedEls;if(this.data.enabled&&!(u&&e-u<this.data.interval)){for(this.prevCheckTime=e,this.dirty&&this.refreshObjects(),o.setFromObject(c.object3D),this.boxMin.copy(o.min),this.boxMax.copy(o.max),o.getCenter(this.boxCenter),this.data.debug&&(this.boxHelper.setFromObject(c.object3D),this.boxHelper.parent||c.sceneEl.object3D.add(this.boxHelper)),function(e,t){var n;for(e.length=0,n=0;n<t.length;n++)e[n]=t[n]}(m,l),l.length=0,s=0;s<h.length;s++)h[s]!==this.el&&(this.data.collideNonVisible||h[s].getAttribute("visible")?this.isIntersecting(h[s])&&l.push(h[s]):this.data.debug&&(t=h[s].object3D.boxHelper)&&(c.sceneEl.object3D.remove(t),h[s].object3D.boxHelper=null));for(d.length=0,s=0;s<l.length;s++)-1===m.indexOf(l[s])&&d.push(l[s]);for(a.length=0,s=0;s<m.length;s++)-1===l.indexOf(m[s])&&(m[s].hasAttribute("aabb-collider")||m[s].emit("hitend"),a.push(m[s]));for(s=0;s<d.length;s++)d[s]!==this.el&&(d[s].hasAttribute("aabb-collider")||d[s].emit("hitstart"));for(s=0;s<l.length;s++)l[s]!==this.el&&(r.copy(l[s].object3D.boundingBoxCenter).sub(this.boxCenter),(void 0===n||r.length()<n)&&(n=r.length(),i=l[s]));!l.length&&this.closestIntersectedEl?(this.hitClosestClearEventDetail.el=this.closestIntersectedEl,this.closestIntersectedEl.emit("hitclosestclear"),this.closestIntersectedEl=null,c.emit("hitclosestclear",this.hitClosestClearEventDetail)):i!==this.closestIntersectedEl&&(this.closestIntersectedEl&&(this.hitClosestClearEventDetail.el=this.closestIntersectedEl,this.closestIntersectedEl.emit("hitclosestclear",this.hitClosestClearEventDetail)),i&&(i.emit("hitclosest"),this.closestIntersectedEl=i,this.hitClosestEventDetail.el=i,c.emit("hitclosest",this.hitClosestEventDetail))),a.length&&c.emit("hitend"),d.length&&c.emit("hitstart",this.hitStartEventDetail)}},isIntersecting:function(){var e=new THREE.Box3;return function(t){var n,i;return e.setFromObject(t.object3D),this.data.debug&&(t.object3D.boxHelper||(t.object3D.boxHelper=new THREE.BoxHelper(t.object3D,new THREE.Color(Math.random(),Math.random(),Math.random())),t.sceneEl.object3D.add(t.object3D.boxHelper)),t.object3D.boxHelper.setFromObject(t.object3D)),n=e.min,i=e.max,t.object3D.boundingBoxCenter=t.object3D.boundingBoxCenter||new THREE.Vector3,e.getCenter(t.object3D.boundingBoxCenter),this.boxMin.x<=i.x&&this.boxMax.x>=n.x&&this.boxMin.y<=i.y&&this.boxMax.y>=n.y&&this.boxMin.z<=i.z&&this.boxMax.z>=n.z}}(),setDirty:function(){this.dirty=!0},refreshObjects:function(){var e=this.data;this.objectEls=e.objects?this.el.sceneEl.querySelectorAll(e.objects):this.el.sceneEl.children,this.dirty=!1}})}]),t=function(e){function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,n(e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var i=function(e){function n(t){var n;return(n=e.call(this)||this).element=t||document.createElement("div"),n.element.style.position="absolute",n.element.style.pointerEvents="auto",n.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&null!==e.element.parentNode&&e.element.parentNode.removeChild(e.element)})}),n}return t(n,e),n.prototype.copy=function(t,n){return e.prototype.copy.call(this,t,n),this.element=t.element.cloneNode(!0),this},n}(THREE.Object3D);i.prototype.isCSS3DObject=!0,function(e){function n(t){var n;return(n=e.call(this,t)||this).rotation2D=0,n}return t(n,e),n.prototype.copy=function(t,n){return e.prototype.copy.call(this,t,n),this.rotation2D=t.rotation2D,this},n}(i).prototype.isCSS3DSprite=!0;var s=new THREE.Matrix4,o=new THREE.Matrix4,r=function(){var e,t,n,i,r=this,a={camera:{fov:0,style:""},objects:new WeakMap},l=document.createElement("div");l.style.overflow="hidden",this.domElement=l;var c=document.createElement("div");function d(e){return Math.abs(e)<1e-10?0:e}function h(e){var t=e.elements;return"matrix3d("+d(t[0])+","+d(-t[1])+","+d(t[2])+","+d(t[3])+","+d(t[4])+","+d(-t[5])+","+d(t[6])+","+d(t[7])+","+d(t[8])+","+d(-t[9])+","+d(t[10])+","+d(t[11])+","+d(t[12])+","+d(-t[13])+","+d(t[14])+","+d(t[15])+")"}function u(e){var t=e.elements;return"translate(-50%,-50%)matrix3d("+d(t[0])+","+d(t[1])+","+d(t[2])+","+d(t[3])+","+d(-t[4])+","+d(-t[5])+","+d(-t[6])+","+d(-t[7])+","+d(t[8])+","+d(t[9])+","+d(t[10])+","+d(t[11])+","+d(t[12])+","+d(t[13])+","+d(t[14])+","+d(t[15])+")"}function m(e,t,n,i){if(e.isCSS3DObject){var l;e.onBeforeRender(r,t,n),e.isCSS3DSprite?(s.copy(n.matrixWorldInverse),s.transpose(),0!==e.rotation2D&&s.multiply(o.makeRotationZ(e.rotation2D)),s.copyPosition(e.matrixWorld),s.scale(e.scale),s.elements[3]=0,s.elements[7]=0,s.elements[11]=0,s.elements[15]=1,l=u(s)):l=u(e.matrixWorld);var d=e.element,h=a.objects.get(e);void 0!==h&&h.style===l||(d.style.transform=l,a.objects.set(e,{style:l})),d.style.display=e.visible?"":"none",d.parentNode!==c&&c.appendChild(d),e.onAfterRender(r,t,n)}for(var p=0,b=e.children.length;p<b;p++)m(e.children[p],t,n)}c.style.transformStyle="preserve-3d",c.style.pointerEvents="none",l.appendChild(c),this.getSize=function(){return{width:e,height:t}},this.render=function(e,t){var s,o,r=t.projectionMatrix.elements[5]*i;a.camera.fov!==r&&(l.style.perspective=t.isPerspectiveCamera?r+"px":"",a.camera.fov=r),!0===e.autoUpdate&&e.updateMatrixWorld(),null===t.parent&&t.updateMatrixWorld(),t.isOrthographicCamera&&(s=-(t.right+t.left)/2,o=(t.top+t.bottom)/2);var u=(t.isOrthographicCamera?"scale("+r+")translate("+d(s)+"px,"+d(o)+"px)"+h(t.matrixWorldInverse):"translateZ("+r+"px)"+h(t.matrixWorldInverse))+"translate("+n+"px,"+i+"px)";a.camera.style!==u&&(c.style.transform=u,a.camera.style=u),m(e,e,t)},this.setSize=function(s,o){n=(e=s)/2,i=(t=o)/2,l.style.width=s+"px",l.style.height=o+"px",c.style.width=s+"px",c.style.height=o+"px"}},a=100,l=function(){function e(e,t){this.websurfaceEntity=t,this.enabled=!0,this.cssRenderer=new r,this.domElement=this.cssRenderer.domElement,this.domElement.style.position="fixed",this.domElement.style.zIndex="-2",this.cssCamera=new THREE.PerspectiveCamera(e.fov,e.aspect,e.near*a,e.far*a),this.camera=e,this.cssScene=new THREE.Scene,this.update=this.update.bind(this)}var t=e.prototype;return t.setSize=function(e,t){this.cssRenderer.setSize(e,t),this.cssCamera.aspect=e/t,this.cssCamera.updateProjectionMatrix()},t.update=function(){this.camera.getWorldPosition(this.cssCamera.position),this.cssCamera.position.multiplyScalar(a),this.camera.getWorldQuaternion(this.cssCamera.quaternion),this.cssRenderer.render(this.cssScene,this.cssCamera)},e}(),c=function(e){function n(t,n,s,o,r){var l,c=(void 0===r?{}:r).elementWidth,d=void 0===c?1280:c,h=new THREE.PlaneGeometry(s,o),u=new THREE.MeshBasicMaterial({opacity:0,blending:THREE.NoBlending,side:THREE.DoubleSide,color:new THREE.Color(0,0,0)});return(l=e.call(this,h,u)||this).context=t,l.domElement=n,l.aspectRatio=o/s,l.elementWidth=d,l.elementHeight=l.elementWidth*l.aspectRatio,l.width=s,l.height=o,l.resizeElement(),l.cssObject=new i(l.domElement),l.cssObject.scale.multiplyScalar(a/(l.elementWidth/l.width)),l.cssObjectInitialScale=l.cssObject.scale,l.size=new THREE.Vector3,l.box=new THREE.Box3,l.addEventListener("added",l.handleAdded),l.addEventListener("removed",l.handleRemoved),l.update=l.update.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(l)),l}t(n,e);var s=n.prototype;return s.handleAdded=function(){this.context.cssScene.add(this.cssObject)},s.handleRemoved=function(){this.context.cssScene.remove(this.cssObject)},s.resizeElement=function(){this.domElement.style.width=this.elementWidth+"px",this.domElement.style.height=this.elementHeight+"px"},s.setElement=function(e){this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=e,this.cssObject.element=e,this.resizeElement()},s.update=function(e){this.cssObject.quaternion.copy(e.quaternion),this.cssObject.position.copy(e.position).multiplyScalar(a),this.box.setFromObject(this).getSize(this.size);var t=e.scale;this.oldScaleFactor!=t&&(this.oldScaleFactor=t,this.cssObject.scale.set(this.cssObjectInitialScale.x,this.cssObjectInitialScale.y,this.cssObjectInitialScale.z),this.cssObject.scale.multiply(t)),this.cssObject.visible=e.visible},s.dispose=function(){this.removeEventListener("added",this.handleAdded),this.removeEventListener("removed",this.handleRemoved),this.domElement.remove(),this.geometry.dispose(),this.material.dispose()},n}(THREE.Mesh),d=AFRAME.registerComponent("websurface",{schema:{url:{default:"https://aframe.io"},width:{default:1},height:{default:.75},isInteractable:{default:!0},frameSkips:{default:1},autoSceneStyling:{default:!0}},init:function(){var e=this.el,t=this.data;1==t.autoSceneStyling&&(e.sceneEl.style.position="absolute",e.sceneEl.style.zIndex="1"),1==t.isInteractable&&(t.mouseHasLeftScreen=!0,e.setAttribute("geometry","primitive:plane; width:"+t.width+"; height:"+t.height+";"),e.addEventListener("click",function(){0!=t.mouseHasLeftScreen&&(document.exitPointerLock(),e.sceneEl.style.zIndex="-1",t.mouseHasLeftScreen=!1)}),e.addEventListener("mouseenter",function(){t.context.domElement.style.zIndex="0"}),e.addEventListener("mouseleave",function(){t.context.domElement.style.zIndex="-2",t.mouseHasLeftScreen=!0})),e.addEventListener("cam-loaded",function(){var n=document.createElement("iframe");n.setAttribute("src",t.url),n.style.border="none";var i=new l(e.sceneEl.camera,e);i.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(i.domElement);var s=new c(i,n,t.width,t.height);if(e.object3D.add(s),1==t.isInteractable){var o=document.createElement("div");o.style.position="fixed",o.style.top="0",o.style.width="100%",o.style.height="100%",o.style.zIndex="-1",i.domElement.appendChild(o),o.addEventListener("click",function(){e.sceneEl.style.zIndex=1})}this.websurface_iframe=n,this.css3d_context=i,t.context=i,t.element=s,window.addEventListener("resize",function(){i.setSize(window.innerWidth,window.innerHeight)})}),t.frames=0,t.isCamLoaded=!1},tick:function(){var e=this.el,t=this.data;if(1!=t.isPaused)if(0!=t.isCamLoaded){var n=t.context,i=t.element;t.frames%t.frameSkips==0&&(n&&n.update(),i&&i.update(e.object3D)),t.frames++}else e.sceneEl.camera&&(this.el.emit("cam-loaded"),t.isCamLoaded=!0)},pause:function(){this.data.isPaused=!0},play:function(){this.data.isPaused=!1}});e.component=d},"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(self.aframeWebsurfaces={});var s=function(e){var t,n;function s(t){var n;return(n=e.call(this)||this).iframe=t,n.ydoc.on("update",function(e,t,i,s){var o=new CustomEvent("CSDT-y-update",{detail:e});n.iframe.contentDocument.dispatchEvent(o)}),n}n=e,(t=s).prototype=Object.create(n.prototype),t.prototype.constructor=t,i(t,n);var o=s.prototype;return o.checkSupport=function(){var e=this;return new Promise(function(t,n){window.document.addEventListener("CSDT-response-check-support",function(e){return t(e.detail)},{once:!0});var i=new CustomEvent("CSDT-check-support");e.iframe.contentDocument.dispatchEvent(i)})},o.openPortal=function(e,t){var n=this;return void 0===t&&(t=!1),new Promise(function(e,i){window.document.addEventListener("CSDT-response-portal-open",function(t){return e(t.detail)},{once:!0});var s={recievesThree:hasThreeScene,sendsThree:t},o=new CustomEvent("CSDT-portal-open",{detail:s});n.iframe.contentDocument.dispatchEvent(o)})},s}(function(){var e=this;this.version="0.1.0",this.ydoc=new n.Doc,document.addEventListener("CSDT-y-update",function(t){n.applyUpdate(e.ydoc,t.detail)})});AFRAME.registerComponent("web-portal",{schema:{url:{default:"https://aframe.io"},text:{default:""},width:{default:1.5},height:{default:2.4},frameWidth:{default:.15},enableFrame:{default:!0},enableWebsurface:{default:!0},enableReturnButton:{default:!1},enableCSDT:{default:!0}},init:function(){var e=this,t=this.el,n=this.data,i=this.el.sceneEl;n.siteSendsThree=!1,n.siteRecievesThree=!1,n.has_iframe_loaded=!1,t.object3D.position.y+=n.height/2;var o=document.createElement("a-text");if(o.setAttribute("value",n.text),o.setAttribute("position","0 "+(.5*n.height+.25+n.frameWidth)+" 0"),o.setAttribute("align","center"),o.setAttribute("side","double"),t.appendChild(o),n.titleEl=o,1==n.enableFrame){var r=n.frameWidth,a=n.width,l=n.height,c=document.createElement("a-box");c.setAttribute("position",(a+r)/2+" 0 0"),c.setAttribute("scale",r+" "+l+" "+r),t.appendChild(c);var d=document.createElement("a-box");d.setAttribute("position",-(a+r)/2+" 0 0"),d.setAttribute("scale",r+" "+l+" "+r),t.appendChild(d);var h=document.createElement("a-box");h.setAttribute("position","0 "+(l+r)/2+" 0"),h.setAttribute("scale",a+2*r+" "+r+" "+r),t.appendChild(h);var u=document.createElement("a-box");u.setAttribute("position","0 0 "+(-r/4-.01)),u.setAttribute("scale",a+2*r+" "+(l+2*r)+" "+r/2),t.appendChild(u)}if(i.camera){var m=i.camera.el;m.id||(m.id="web-portal-cam-tag"),t.setAttribute("aabb-collider",{objects:"#"+m.id})}else t.sceneEl.addEventListener("loaded",function(){var e=i.camera.el;e.id||(e.id="web-portal-cam-tag"),t.setAttribute("aabb-collider",{objects:"#"+e.id})});if("parent"==n.url)t.setAttribute("geometry",{primitive:"plane",width:n.width,height:n.height}),t.setAttribute("material",{color:"#c8c"}),t.addEventListener("hitstart",function(){document.exitPointerLock(),window.CSDT.portalReturn()});else if(1==n.enableCSDT);else{if(1==n.enableWebsurface)t.setAttribute("websurface",{url:n.url,width:n.width,height:n.height,isInteractable:!1});else{t.setAttribute("geometry",{primitive:"plane",width:n.width,height:n.height}),t.setAttribute("material",{color:"#c8c"});var p=document.createElement("iframe");p.src=n.url,document.body.appendChild(p),p.style.position="fixed",p.style.top="0",p.style.left="0",p.style.width="100%",p.style.height="100%",p.style.overflow="none",p.style.zIndex=10,p.style.display="none",t.websurface_iframe=p}if(1==n.enableReturnButton){var b=n.returnButton=document.createElement("button");b.className="web-portal-overlay-button",b.innerHTML="return";var f="\n      .web-portal-overlay-button {\n        position: fixed;\n        top: .5em;\n        left: .5em;\n\n        cursor: pointer;\n        color: white;\n        box-shadow: 1px 1px 1px 1px #000000;\n        background-color: transparent;\n        border-radius: 5px;\n        border: 2px solid white;\n        \n        font-family: Arial;\n        font-size: 1em;\n        font-weight: bold;\n        text-shadow: 2px 2px 1px #000000;\n        padding: 0.25em 0.5em;\n\n        z-index: 20;\n      }\n      \n      button:hover {\n        color: lightgrey;\n        border-color: lightgrey;\n      }",E=document.createElement("style");E.styleSheet?E.styleSheet.cssText=f:E.appendChild(document.createTextNode(f)),b.appendChild(E),document.body.appendChild(b),b.style.display="none",b.onclick=function(){e.returnFromPortal()}}1==n.enableCSDT&&t.addEventListener("iframe loaded",function(){t.websurface_iframe.addEventListener("load",function(){var i=e.CSDT=new s(t.websurface_iframe);i.checkSupport().then(function(){i.openPortal(!0,!0,!0).then(function(e){console.log(e),1==e.sendsThree&&(n.siteSendsThree=!0),1==e.recievesThree&&(n.siteRecievesThree=!0)})}),document.addEventListener("CSDT-portal-return",function(){e.returnFromPortal()})})}),t.addEventListener("hitstart",function(){if(1==n.enableWebsurface){t.components.websurface.pause();var e=t.websurface_iframe,s=t.css3d_context.domElement;n.style_iframe=e.style.cssText,n.style_context=s.style.cssText,n.style_contextChild=s.children[0].style.cssText,e.style="",s.style="",s.children[0].style="",e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.overflow="none"}i.style.display="none",t.websurface_iframe&&(t.websurface_iframe.style.display="block"),n.returnButton&&(n.returnButton.style.display="block"),document.exitPointerLock()})}},returnFromPortal:function(){var e=this.el,t=this.data,n=this.el.sceneEl;if(1==t.enableWebsurface){var i=e.css3d_context.domElement;e.websurface_iframe.style=t.style_iframe,i.style=t.style_context,i.children[0].style.cssText=t.style_contextChild,e.components.websurface.play()}var s=n.camera.el,o=new THREE.Vector3;e.object3D.getWorldPosition(o),o.y=s.object3D.position.y;var r=new THREE.Vector3;e.object3D.getWorldDirection(r).multiplyScalar(1.5);var a=new THREE.Vector3;if(a.copy(o),a.add(r),s.object3D.position.x=a.x,s.object3D.position.z=a.z,s.components["look-controls"]){s.setAttribute("look-controls",{enabled:!1});var l=new THREE.Vector3;s.object3D.getWorldPosition(l);var c=new THREE.Vector3;c.subVectors(l,o).add(l),s.object3D.lookAt(c),s.object3D.updateMatrix();var d=s.getAttribute("rotation");s.components["look-controls"].pitchObject.rotation.x=THREE.Math.degToRad(d.x),s.components["look-controls"].yawObject.rotation.y=THREE.Math.degToRad(d.y),s.setAttribute("look-controls",{enabled:!0})}n.style.display="block",t.returnButton&&(t.returnButton.style.display="none")},update:function(){var e=this.data;e.titleEl.setAttribute("value",e.text)},tick:function(){var e=this.el,t=this.data;if(0==t.has_iframe_loaded&&e.websurface_iframe&&e.websurface_iframe.contentDocument&&(t.has_iframe_loaded=!0,e.emit("iframe loaded")),1==t.siteRecievesThree){var n=e.sceneEl.object3D.clone();n.children=n.children.filter(function(e){}),Math.random()>.99&&console.log(n.children)}}});
//# sourceMappingURL=aframe-csdt-portals.js.map
