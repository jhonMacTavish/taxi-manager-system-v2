import stomp from "stompjs";

const config = {
  // SERVICE: "ws://10.35.240.210:61614/stomp",
  SERVICE: "ws://10.35.240.225:61614/stomp",  //测试
  USERNAME: "admin",
  PASSWORD: "admin",
  TOPIC: "/topic/stoc",
  that: null
};

export default class Connector {
  constructor(responseCallback, onFaild) {
    this.responseCallback = responseCallback;
    this.onFaild = onFaild;
    this.client = null;
    config.that = this;
  }

  onConnected() {
    this.subscribe(config.TOPIC, config.that.responseCallback, config.that.onFaild);
  }

  connect() {
    this.client = stomp.client(config.SERVICE);
    let headers = {
      login: config.USERNAME,
      passcode: config.PASSWORD,
    };
    this.client.connect(headers, this.onConnected, this.onFaild);
    console.log("connect");
    this.client.debug = null;
  }

  offLine() {
    console.log("offline");
    config.that.client.disconnect();
  }
}
