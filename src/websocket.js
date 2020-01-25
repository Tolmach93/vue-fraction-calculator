
class Socket {
  constructor () {
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.setConnect();
    this.requestIncrement = 0;
    this.requestMap = {};
  }

  static onOpen () {
    console.log("[open] Соединение установлено");
  }

  setConnect () {
    this.socket = new WebSocket("ws://echo.websocket.org");
    this.socket.onopen = Socket.onOpen;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
  }

  onClose (event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      console.log('[close] Соединение прервано');
      this.setConnect();
    }
  }

  onMessage ({data}) {
    try {
      this.requestMap[data]();
      delete this.requestMap[data];
    } catch (e) {
      console.log(e);
    }
  }

  sendRequest () {
    return new Promise((resolve, reject) => {
      let requestNumber = this.requestIncrement++;
      requestNumber = requestNumber.toString();
      this.socket.send(requestNumber);
      this.requestMap[requestNumber] = resolve;
      setTimeout(reject, 30000);
    })
  }
}

const socket = new Socket();

export default socket;