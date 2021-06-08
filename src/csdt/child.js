import Base from './base';
import * as Y from 'yjs';

//manages connections as a child site
export default class CSDTChild extends Base {
  constructor() {
    super();

    //ydoc send updates
    this.ydoc.on('update', (update, _origin, _doc, _tr) => {
      const event = new CustomEvent('CSDT-y-update', { detail: update });
      parent.document.dispatchEvent(event);
    });

    //tells the parent site we have CSDT support
    document.addEventListener('CSDT-check-support', () => {
      const response = new CustomEvent('CSDT-response-check-support', { detail: this.version });
      parent.document.dispatchEvent(response);
    });
  }

  //called to send data to the parent for their portal
  responsePortalOpen(hasReturnPortal = false, sendsThree = false, recievesThree = false) {
    const data = {
      hasReturnPortal: hasReturnPortal,
      sendsThree: sendsThree,
      recievesThree: recievesThree,
    };
    const response = new CustomEvent('CSDT-response-portal-open', { detail: data });
    parent.document.dispatchEvent(response);
  }

  //called to return the user to the parent site
  portalReturn() {
    const event = new CustomEvent('CSDT-portal-return');
    parent.document.dispatchEvent(event);
  }
}
