import { PDFDocument } from 'pdf-lib'
import fs from 'node:fs'

async function correctPDFSort(PDFPath) {
  const existingPdfBytes = fs.readFileSync(PDFPath)
  // 新的pdf文件
  const reSortPdf = await PDFDocument.create()
  // Load a PDFDocument from the existing PDF bytes
  const originPdf = await PDFDocument.load(existingPdfBytes)
  const pages = originPdf.getPages()
  const copyPages = await reSortPdf.copyPages(
    originPdf,
    pages.map((item, index) => index)
  )
  // 页面排序, 假设只有6页
  // 1,3,5,6,4,2
  const newPages = []

  const pageLength = pages.length
  const zhengMian = copyPages.slice(0, pageLength / 2)
  const fanMian = copyPages.slice(pageLength / 2, pageLength).reverse()

  zhengMian.forEach((page, index) => {
    newPages.push(page, fanMian[index])
  })

  newPages.forEach((page) => {
    reSortPdf.addPage(page)
  })

  const reSortPdfBytes = await reSortPdf.save()
  return { status: 'ok', buffer: reSortPdfBytes, path: PDFPath }
}

export { correctPDFSort }
