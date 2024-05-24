((document: Document) => {
  const dom = document.querySelector(".signal-node");
  const btn = document.querySelector("#btn");
  function onClick() {
    if (dom) {
      const width = dom.getAttribute("stroke-width");
      console.log("width :>> ", width);
      dom.setAttribute("stroke-width", `${parseInt(width ?? "0") + 1}`);
    }
  }
  btn?.addEventListener("click", onClick);
})(document);
