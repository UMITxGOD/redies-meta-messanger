import Pusher from "pusher";
import pusherJs from "pusher-js";

export const serverPusher = new Pusher({
    appId: "1534823",
    key: "d26460b22210e7e15e06",
    secret: "1206f7fa985b45e043f1",
    cluster: "ap2",
    useTLS: true
  });
export const clientPusher = new pusherJs(
    'd26460b22210e7e15e06', {
    cluster: 'ap2',
  }

)
