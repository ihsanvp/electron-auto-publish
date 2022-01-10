import { ipcRenderer, contextBridge } from "electron";

type AnyFunction = (...args: any[]) => void;

const appMethods = {
  getVersion: async () => ipcRenderer.invoke("app-version"),
  checkForUpdates: async () => ipcRenderer.invoke("check-for-app-updates"),
  onUpdateAvailable: (callback: VoidFunction) => {
    ipcRenderer.on("app-update-available", () => callback());
  },
  onUpdateDownload: (callback: AnyFunction) => {
    ipcRenderer.on("app-download-progress", (...args) => {
      callback(args);
    });
  },
};

contextBridge.exposeInMainWorld("app", appMethods);

export type AppMethods = typeof appMethods;
