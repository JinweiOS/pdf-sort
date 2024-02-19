import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { correctPDFSort } from './util/resort'

// Custom APIs for renderer
const api = { correctPDFSort }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // 将 dialog 方法暴露给渲染进程
    contextBridge.exposeInMainWorld('dialog', {
      saveFile: async (option) => {
        return await ipcRenderer.invoke('save-file', option)
      },
      showOpenDialog: async (options) => {
        return await ipcRenderer.invoke('show-open-dialog', options)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
