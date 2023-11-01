/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */

export const utils = {
  convertObjectToCSV(objArray) {
    return new Promise((resolve, reject) => {
      try {
        if (!Array.isArray(objArray) || objArray.length === 0) {
          reject(new Error("Input data is empty or not an array."));
          return;
        }
        const keys = Object.keys(objArray[0]);
        let csv = `${keys.join(",")}\r\n`;
        for (let i = 0; i < objArray.length; i++) {
          let line = "";
          for (const key of keys) {
            if (line !== "") line += ",";
            line += objArray[i][key];
          }
          csv += `${line}\r\n`;
        }
        resolve(csv);
      } catch (error) {
        reject(error);
      }
    });
  },
  downloadCSV(csv, filename) {
    const csvData = new Blob([csv], { type: "text/csv" });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", filename);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  },
};

export default utils;
