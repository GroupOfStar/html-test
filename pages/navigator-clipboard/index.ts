import "./index.css";

/** 写入剪切板内容 */
function handleWriteClipboard() {
  const iptDom = document.querySelector<HTMLTextAreaElement>("#text-ipt");
  const resWriteDom = document.querySelector(".result-text.write-res");
  if (iptDom && resWriteDom) {
    const blob = new Blob([iptDom.value], {
      type: "text/plain",
    });
    const data = [new ClipboardItem({ ["text/plain"]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        resWriteDom.innerHTML = `<p>写入成功！内容为：</p><p>${iptDom.value}</p>`;
      },
      (err) => {
        resWriteDom.innerHTML = `<p>---写失败,navigator.clipboard.write() api不支持, 错误内容为：</p><p>${err.toString()}</p>`;
      }
    );
  }
}

/** 通过 clipboard.read() 读取剪切板内容 */
function handleReadClipboard() {
  const resReadDom = document.querySelector(".result-text.read-res");
  if (resReadDom) {
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        clipboardItems.forEach((item) => {
          item.getType("text/plain").then((res) => {
            res
              .text()
              .then((text) => {
                resReadDom.innerHTML = `<p>读取成功！使用 clipboardItem.getType("text/plain") 获取的内容为：</p><p>${text}</p>`;
              })
              .catch((err) => {
                resReadDom.innerHTML = `<p>读取失败！使用的 clipboardItem.getType("text/plain") api不支持, 错误内容为：</p><p>${err.toString()}</p>`;
              });
          });
        });
      })
      .catch((err) => {
        resReadDom.innerHTML = `<p>---读取成功,navigator.clipboard.read() api不支持, 错误内容为：</p><p>${err.toString()}</p>`;
      });
  }
}

/** 清空clipboard.read()的内容 */
function clearByRead() {
  const resReadDom = document.querySelector(".result-text.read-res");
  if (resReadDom) {
    resReadDom.innerHTML = "";
  }
}

/** 通过 clipboard.readText() 读取剪切板内容 */
function handleReadTextClipboard() {
  const resReadTextDom = document.querySelector(".result-text.read-text-res");
  if (resReadTextDom) {
    navigator.clipboard
      .readText()
      .then((text) => {
        resReadTextDom.innerHTML = `<p>读取成功！文本内容为：</p><p>${text}</p>`;
      })
      .catch((err) => {
        resReadTextDom.innerHTML = `<p>读取失败！使用的 navigator.clipboard.readText api不支持, 错误内容为：</p><p>${err.toString()}</p>`;
      });
  }
}

/** 清空clipboard.readText()的内容 */
function clearByReadText() {
  const resReadTextDom = document.querySelector(".result-text.read-text-res");
  if (resReadTextDom) {
    resReadTextDom.innerHTML = "";
  }
}

document.addEventListener("copy", function (event) {
  event.preventDefault();
  event.stopPropagation();
  // const clipboardData = event.clipboardData;
  // clipboardData.clearData();
  // clipboardData.setData("text/plain", "testObj");
  // clipboardData.setData("mind/node", stringifyData);
  // clipboardData.setData("text/html", stringifyData);
  // console.log("copy clipboardData.types :>> ", clipboardData.types);
  handleWriteClipboard();
});

const writeBtnDom = document.querySelector(".btn.write-btn");
writeBtnDom?.addEventListener("click", handleWriteClipboard);

const readBtnDom = document.querySelector(".btn.read-btn");
readBtnDom?.addEventListener("click", handleReadClipboard);

const clearBtnDom = document.querySelector(".btn.read-clear-btn");
clearBtnDom?.addEventListener("click", clearByRead);

const readTextBtnDom = document.querySelector(".btn.read-text-btn");
readTextBtnDom?.addEventListener("click", handleReadTextClipboard);

const clearTextBtnDom = document.querySelector(".btn.read-text-clear-btn");
clearTextBtnDom?.addEventListener("click", clearByReadText);
