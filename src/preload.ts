import { ipcRenderer, contextBridge } from "electron";

const appMethods = {
  getVersion: async () => ipcRenderer.invoke("app-version"),
};

contextBridge.exposeInMainWorld("app", appMethods);

export type AppMethods = typeof appMethods;
