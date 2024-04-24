export class Viewer1 {
  image: HTMLImageElement;
  scale = 0.5;

  // 图片位置
  top;
  left;

  // 鼠标位置
  startX = 0;
  startY = 0;
  mouseX = 0;
  mouseY = 0;

  imageX = 0;
  imageY = 0;

  drag = false;

  constructor(container: HTMLElement, imgDom: HTMLImageElement) {
    this.image = imgDom;
    this.top = parseInt(imgDom.style.top) || 0;
    this.left = parseInt(imgDom.style.left) || 0;

    imgDom.addEventListener("dragstart", function (event) {
      console.log("dragstart event :>> ", event);
      event.preventDefault();
      // 可以在此添加其他逻辑
    });

    // add event
    imgDom.addEventListener("mousedown", e => {
      e.stopPropagation();
      this.drag = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
    });
    imgDom.addEventListener("mousemove", e => {
      e.stopPropagation();
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      console.log("mouseup", e.clientX, e.clientY);
    });
    imgDom.addEventListener("mouseup", e => {
      console.log("mouseup", e.clientX, e.clientY);
      this.drag = false;
      //   this.imageY += this.top;
      //   this.imageX += this.left;
    });

    // 滚轮缩放
    container.addEventListener("wheel", e => {
      // 阻止事件冒泡
      e.preventDefault();

      // 通过event.deltaY判断滚动方向
      if (e.deltaY < 0) {
        if (this.scale < 3) this.setScale(this.scale + 0.1);
      } else if (e.deltaY > 0) {
        if (this.scale > 0.3) this.setScale(this.scale - 0.1);
      }
    });
    this.render();
  }

  // 更新图片位置
  render() {
    if (this.drag) {
      const moveX = this.mouseX - this.startX;
      const moveY = this.mouseY - this.startY;
      const currentLeft = parseInt(this.image.style.left);
      const currentTop = parseInt(this.image.style.top);

      console.log("moveY :>> ", moveY);

      this.image.style.top = currentTop + moveY + "px";
      this.image.style.left = currentLeft + moveX + "px";
    }
    requestAnimationFrame(this.render.bind(this));
  }

  setScale(n: number) {
    this.scale = n;
    if (this.image) {
      this.image.style.scale = this.scale.toString();
    }
  }
}
