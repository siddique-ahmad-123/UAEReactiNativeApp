// utils/networkListener.ts
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export function initSyncListener() {
  // run once at app start
  let lastState: boolean | null = null;
  NetInfo.addEventListener((state) => {
    if (lastState === state.isConnected) return; 
    lastState = state.isConnected ?? false;
    if (!state.isConnected) {
      Toast.show({
        type: "error",
        text1: "No Internet Connection",
        text2: "Some features may not work until you're back online.",
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Back Online",
        text2: "You're connected to the internet.",
        visibilityTime: 2000,
      });
    }
  });
}
