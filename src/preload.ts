import { ipcRenderer, contextBridge } from "electron";

const appMethods = {
  getVersion: async () => ipcRenderer.invoke("app-version"),
  restartApp: () => ipcRenderer.send("restart_app"),
  onUpdateAvailabe: (callback: VoidFunction) => {
    ipcRenderer.on("update_available", () => {
      ipcRenderer.removeAllListeners("update_available");
      callback();
    });
  },
  onUpdateDownloaded: (callback: VoidFunction) => {
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      callback();
    });
  },
};

contextBridge.exposeInMainWorld("app", appMethods);

export type AppMethods = typeof appMethods;
