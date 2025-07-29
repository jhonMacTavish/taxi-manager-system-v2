//./src/util/config.js

const configs = {
  dev: {
    url: {
        door:"http://10.35.240.225",
        api:"http://10.35.240.219",
        apiV1:"http://10.35.240.225:8081",
    },
    debug: true,
    version: "0.1.0-dev",
  },
  prod: {
    url: {
        door: "http://10.35.240.211",
        api: "http://10.35.240.215",
        apiV1: "http://10.35.240.211:8081"
    },
    debug: false,
    version: "1.0.0",
  }
};

export default configs