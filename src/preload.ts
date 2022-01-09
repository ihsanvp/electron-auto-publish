import { ipcRenderer, contextBridge } from "electron";

const appMethods = {
  getVersion: async () => ipcRenderer.invoke("app-version"),
  checkForUpdates: async () => ipcRenderer.invoke("check-for-app-updates"),
  onUpdateAvailabe: (callback: VoidFunction) => {
    ipcRenderer.on("app-update-available", () => callback());
  },
};

contextBridge.exposeInMainWorld("app", appMethods);

export type AppMethods = typeof appMethods;
