
export function readFileAsJSON(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const json = JSON.parse(fr.result);
        resolve(json);
      } catch(ex) {
        reject(ex);
      }
    }
    fr.onerror = reject;
    fr.abort = reject;
    fr.readAsText(file);
  });
}

