import { Network } from "@capacitor/network";
import { Notify } from "quasar";

const OFFLINE_MESSAGE = "You are currently offline.";
const ONLINE_MESSAGE = "Your Internet connection was restored.";

let notificaion;

export const showStatusMessage = ({ connected }) => {
  const message = connected ? ONLINE_MESSAGE : OFFLINE_MESSAGE;
  const icon = connected ? "fas fa-wifi" : "fas fa-wifi-slash";
  const timeout = connected ? 5000 : 0;

  // remove offline notification
  if (connected && notificaion) notificaion();

  notificaion = Notify.create({
    message: message,
    icon: icon,
    timeout: timeout,
    actions: [
      {
        icon: "fas fa-circle-xmark",
        dense: true,
        color: "white",
      },
    ],
  });
};

Network.addListener("networkStatusChange", (status) => {
  console.log("Network status changed", status);
  showStatusMessage(status);
});

export const getNetworkStatus = async () => {
  const status = await Network.getStatus();
  return status;
};

export default {
  async init() {
    console.func("network/core:init()", arguments);
  },
  getNetworkStatus,
  showStatusMessage,
};
