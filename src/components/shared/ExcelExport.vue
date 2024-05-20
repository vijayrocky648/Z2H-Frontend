<template>
  <div></div>
</template>

<script setup>
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Props
const props = defineProps({
  rowData: {
    type: Object,
    required: true,
    default: {},
  },
});

// Functions
const exportToExcel = (jsonData = props.rowData, fileName = "data.xlsx") => {
  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a binary string
  const workbookBinary = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "binary",
  });

  // Convert the binary string to an ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  // Save the file using FileSaver
  const blob = new Blob([s2ab(workbookBinary)], {
    type: "application/octet-stream",
  });
  saveAs(blob, fileName);
};
</script>
