export class Viewer {
  imgBox: HTMLDivElement;
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

  constructor(container: HTMLDivElement, imgBox: HTMLDivElement) {
    this.imgBox = imgBox;
    this.top = parseInt(imgBox.style.top) || 0;
    this.left = parseInt(imgBox.style.left) || 0;

    imgBox.addEventListener("dragstart", function (event) {
      event.preventDefault();
      // 可以在此添加其他逻辑
    });

    // add event
    imgBox.addEventListener("mousedown", e => {
      e.stopPropagation();
      this.drag = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
    });
    imgBox.addEventListener("mousemove", e => {
      e.stopPropagation();
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    imgBox.addEventListener("mouseup", e => {
      e.stopPropagation();
      this.drag = false;
      this.imageY += this.top;
      this.imageX += this.left;
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
      this.left = this.mouseX - this.startX;
      this.top = this.mouseY - this.startY;

      this.imgBox.style.top = this.imageY + this.top + "px";
      this.imgBox.style.left = this.imageX + this.left + "px";
    }
    requestAnimationFrame(this.render.bind(this));
  }

  setScale(n: number) {
    this.scale = n;
    if (this.imgBox) {
      this.imgBox.style.scale = this.scale.toString();
    }
  }
}
