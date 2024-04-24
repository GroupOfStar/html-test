import { Viewer1 } from "./Viewer1";
import { Viewer } from "./Viewer";
import { DrawImg } from "./DrawImg";
import { Stretch } from "./Stretch";

// ((document: Document) => {
//   const container = document.querySelector<HTMLDivElement>(".container");
//   const imgBox = document.querySelector<HTMLDivElement>(".img_box");
//   const dotDom = document.querySelector<HTMLDivElement>(".dot");

//   if (dotDom && container && imgBox) {
//     //   new Viewer(container, imgBox);
//     new DrawImg(dotDom, imgBox, container);
//   }
// })(document);

((document: Document) => {
  const container = document.querySelector<HTMLDivElement>(".container");
  const nodeBox = document.querySelector<HTMLDivElement>(".node_box");
  const nodeImg = document.querySelector<HTMLDivElement>(".node_img");
  if (container && nodeBox && nodeImg) {
    const stretch = Stretch.create();

    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      stretch.show(nodeBox);
    };

    const onContainerClick = () => {
      console.log("onContainerClick");
      stretch.hide();
    };

    nodeBox.addEventListener("click", onClick);
    container.addEventListener("click", onContainerClick);
  }
})(document);

export default Stretch;
