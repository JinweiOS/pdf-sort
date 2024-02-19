<script setup>
import Versions from './components/Versions.vue'
import { ref } from 'vue'
const filePath = ref('')
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
// 打开文件的方法
async function openFile() {
  const filePaths = await window.dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'PDF文件', extensions: ['pdf'] }]
  })
  // 仅处理第一个文件路径
  filePath.value = filePaths[0]
}
async function correctOrder() {
  const result = await window.api.correctPDFSort(filePath.value)
  window.dialog.saveFile(result)
}
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">得力打印机平板 PDF 正反扫描支持</div>
  <div class="creator" style="margin-top: 20px">文件路径：{{ filePath || '暂未选择文件' }}</div>
  <!-- <p class="tip">Please try pressing <code>F12</code> to open the devTool</p> -->
  <div class="actions">
    <div class="action">
      <a @click="openFile">选择PDF文件</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="correctOrder">纠正顺序</a>
    </div>
  </div>
  <Versions />
</template>
