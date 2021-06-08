import Base from './base';

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

  //response to CSDT-portal-open
  responsePortalOpen(hasReturnPortal = false, sendsThree = false, recievesThree = false) {
    const data = {
      hasReturnPortal: hasReturnPortal,
      sendsThree: sendsThree,
      recievesThree: recievesThree,
    };
    const response = new CustomEvent('CSDT-response-portal-open', { detail: data });
    parent.document.dispatchEvent(response);
  }
}
