import "./index.css";

const textContentDom = document.querySelector(".text-content");

/** 插入内容 */
function insertTextToDiv(text: string) {
  if (textContentDom) {
    const oldText = textContentDom.innerHTML;
    textContentDom.innerHTML = oldText
      ? `${oldText}<p>${text}</p>`
      : `<p>${text}</p>`;
  }
  console.log(text);
}

/** 清空内容 */
function clearTextToDiv() {
  if (textContentDom) {
    textContentDom.innerHTML = "";
  }
}

/** 复制 */
function handleCopy() {
  const iptDom = document.querySelector<HTMLTextAreaElement>("#textIpt");
  if (iptDom) {
    const blob = new Blob([JSON.stringify(iptDom.value)], {
      type: "text/plain",
    });
    const data = [new ClipboardItem({ ["text/plain"]: blob })];

    navigator.clipboard.write(data).then(
      () => {
        clearTextToDiv();
        insertTextToDiv(
          "---通过 navigator.clipboard.write(data) 方法写入成功---------"
        );
        /* success */
        navigator.clipboard.readText().then((text) => {
          console.log("text :>> ", text);
          insertTextToDiv(
            "---通过 navigator.clipboard.readText() 方法读取成功---------"
          );
          insertTextToDiv(`读取的 text/plain 内容为: \n${text}`);
        });

        navigator.clipboard
          .read()
          .then((res) => {
            console.log("res[0] :>> ", res[0]);
            insertTextToDiv(
              "---通过 navigator.clipboard.read() 方法读取成功---------"
            );
            insertTextToDiv(
              `读取的 ClipboardItems[0] 对象的 types 内容为: \n${res[0].types}`
            );
          })
          .catch((err) => {
            insertTextToDiv(
              "---通过 navigator.clipboard.read() 方法读取失败---------"
            );
            insertTextToDiv(`错误内容为: \n${err.toString()}`);
          });
      },
      (err) => {
        /* failure */
        insertTextToDiv(
          "-----------写失败,navigator.clipboard.write api 不支持---------"
        );
        insertTextToDiv(`错误内容为: \n${err.toString()}\n`);
      }
    );
  }
}

document.addEventListener("copy", function (event) {
  // event.preventDefault();
  // event.stopPropagation();
  // const clipboardData = event.clipboardData;
  // clipboardData.clearData();
  // clipboardData.setData("text/plain", "testObj");
  // clipboardData.setData("mind/node", stringifyData);
  // clipboardData.setData("text/html", stringifyData);

  // console.log("copy clipboardData.types :>> ", clipboardData.types);
  handleCopy();
});

// document.addEventListener("paste", function (event) {
//   const clipboardData = event.clipboardData;
//   const mindNode = clipboardData.getData("mind/node");
//   const textPlain = clipboardData.getData("text/plain");
//   // const textHtml = clipboardData.getData("text/html");
//   const textHtml = "{}";
//   console.log("----------下面是粘贴的内容----------");
//   console.log("paste textPlain :>> ", textPlain);
//   console.log("paste mindNode :>> ", mindNode);
//   console.log("textHtml :>> ", textHtml);

//   const res = textHtml.match(
//     /<!--StartFragment-->(.*?)<!--EndFragment-->/s
//   );
//   console.log("res :>> ", res);

//   console.log("paste clipboardData.items :>> ", clipboardData.items);
//   console.log("paste clipboardData.types :>> ", clipboardData.types);
// });

const copyBtnDom = document.querySelector(".copy-btn");
copyBtnDom?.addEventListener("click", handleCopy);

const clearBtnDom = document.querySelector(".clear-btn");
clearBtnDom?.addEventListener("click", clearTextToDiv);
