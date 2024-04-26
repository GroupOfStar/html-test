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
        resWriteDom.innerHTML = `<div class="success"><p>写入成功！内容为：</p><p>${iptDom.value}</p></div>`;
      },
      (err) => {
        resWriteDom.innerHTML = `<div class="error"><p>写入失败，navigator.clipboard.write() api不支持, 错误内容为：</p><p>${err.toString()}</p></div>`;
      }
    );
  }
}

/** 通过 clipboard.read() 读取剪切板内容 */
function handleReadClipboard() {
  const resReadDom = document.querySelector(".result-text.read-res");
  if (resReadDom) {
    const t1 = window.performance.now();
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        clipboardItems.forEach((item) => {
          item.getType("text/plain").then((res) => {
            res
              .text()
              .then((text) => {
                const t2 = window.performance.now();
                resReadDom.innerHTML = `<div class="success">
                    <p>读取成功！使用 clipboardItem.getType("text/plain") 获取的内容为：</p>
                    <p>${text}</p>
                    <p>读取耗时：${Math.round(t2 - t1)} 毫秒</p>
                  </div>`;
              })
              .catch((err) => {
                resReadDom.innerHTML = `<div class="error"><p>使用的 clipboardItem.getType("text/plain") api读取失败！错误内容为：</p><p>${err.toString()}</p></div>`;
              });
          });
        });
      })
      .catch((err) => {
        resReadDom.innerHTML = `<div class="error"><p>使用 navigator.clipboard.read() api读取失败！ 错误内容为：</p><p>${err.toString()}</p></div>`;
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
    const t1 = window.performance.now();
    navigator.clipboard
      .readText()
      .then((text) => {
        const t2 = window.performance.now();
        resReadTextDom.innerHTML = `<div class="success">
            <p>读取成功！文本内容为：</p>
            <p>${text}</p>
            <p>读取耗时：${Math.round(t2 - t1)} 毫秒</p>
          </div>`;
      })
      .catch((err) => {
        resReadTextDom.innerHTML = `<div class="error"><p>使用的 navigator.clipboard.readText() api读取失败！错误内容为：</p><p>${err.toString()}</p></div>`;
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
