import { Network } from "@capacitor/network";

Network.addListener("networkStatusChange", (status) => {
  console.log("Network status changed", status);
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
};
