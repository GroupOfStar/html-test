export class DrawImg {
  dotDom: HTMLDivElement;
  imgBox: HTMLDivElement;

  imgWidth: number;
  imgHeight: number;

  startX = 0;
  startY = 0;

  isMoving = false;

  constructor(
    dotDom: HTMLDivElement,
    imgBox: HTMLDivElement,
    container: HTMLElement
  ) {
    this.dotDom = dotDom;
    this.imgBox = imgBox;

    this.imgWidth = imgBox.clientWidth;
    this.imgHeight = imgBox.clientHeight;

    this.onmousedown = this.onmousedown.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    this.onmouseup = this.onmouseup.bind(this);

    dotDom.addEventListener("mousedown", this.onmousedown);
    window.addEventListener("mousemove", this.onmousemove);

    dotDom.addEventListener("mouseup", this.onmouseup);
    imgBox.addEventListener("mouseup", this.onmouseup);
    container.addEventListener("mouseup", this.onmouseup);
  }

  onmousedown(e: MouseEvent) {
    e.stopPropagation();
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.isMoving = true;
  }

  onmousemove(e: MouseEvent) {
    e.stopPropagation();
    if (this.isMoving) {
      const imgNewWidth = e.clientX - this.startX + this.imgWidth;
      const imgNewHeight = e.clientY - this.startY + this.imgHeight;

      this.imgBox.style.width = imgNewWidth + "px";
      this.imgBox.style.height = imgNewHeight + "px";
    }
  }

  onmouseup() {
    // 记录图片宽度，方便下次拖动使用
    this.imgWidth = this.imgBox.clientWidth;
    this.imgHeight = this.imgBox.clientHeight;
    this.isMoving = false;
  }
}
