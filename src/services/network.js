import { Network } from "@capacitor/network";
import { Notify } from "quasar";
import { useAppStore } from "stores/app";

const appStore = useAppStore();
const OFFLINE_MESSAGE = "You are currently offline.";
const ONLINE_MESSAGE = "Your Internet connection was restored.";

let notificaion;

export const showStatusMessage = ({ connected }) => {
  const message = connected ? ONLINE_MESSAGE : OFFLINE_MESSAGE;
  const icon = connected ? "fas fa-wifi" : "fas fa-wifi-slash";
  const timeout = connected ? 5000 : 0;

  appStore.setIsOffline(!connected);

  // remove offline notification
  if (connected && notificaion) notificaion();

  notificaion = Notify.create({
    message: message,
    icon: icon,
    timeout: timeout,
    position: "bottom-left",
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
  showStatusMessage(status);
});

export const getStatus = async () => {
  return Network.getStatus();
};

export default {
  async init() {
    console.func("network/core:init()", arguments);
  },
  getStatus,
  showStatusMessage,
};
