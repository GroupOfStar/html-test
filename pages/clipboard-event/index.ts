import "./index.css";

document.addEventListener("copy", function (event) {
  event.preventDefault();
  event.stopPropagation();
  const clipboardData = event.clipboardData || new DataTransfer();
  clipboardData.clearData();
  const testObj = { name: "zhansan", school: { level: 1 } };
  const stringifyData = JSON.stringify(testObj);
  clipboardData.setData("text/plain", "testObj");
  clipboardData.setData("mind/node", stringifyData);

  console.log("copy clipboardData.types :>> ", clipboardData.types);
});

document.addEventListener("paste", function (event) {
  const clipboardData = event.clipboardData || new DataTransfer();
  const mindNode = clipboardData.getData("mind/node");
  const textPlain = clipboardData.getData("text/plain");
  console.log("----------下面是粘贴的内容----------");
  console.log("paste textPlain :>> ", textPlain);
  console.log("paste mindNode :>> ", mindNode);
  console.log("paste clipboardData.items :>> ", clipboardData.items);
  console.log("paste clipboardData.types :>> ", clipboardData.types);
});
