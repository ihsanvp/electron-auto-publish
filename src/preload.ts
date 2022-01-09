import { ipcRenderer, contextBridge } from "electron";

const appMethods = {
  getVersion: async () => ipcRenderer.invoke("app-version"),
  checkForUpdates: async () => ipcRenderer.invoke("check-for-app-updates"),
};

contextBridge.exposeInMainWorld("app", appMethods);

export type AppMethods = typeof appMethods;
