export class Stretch {
  /** Stretch实例 */
  private static instance: Stretch;
  /** 将要挂载模拟节点的容器 */
  toContainerEl: HTMLElement;
  /** 模拟的节点容器 */
  nodeWrapperEl: HTMLDivElement;
  /** 模拟节点的className */
  private static wrapperClassName: string = "node-wrapper";
  /** 右下角拉伸的小点 */
  nodeDotEl: HTMLDivElement;

  /** 图片节点 */
  nodeBox?: HTMLDivElement;

  imgWidth = 0;
  imgHeight = 0;

  /** 拉伸开始位置 */
  startX = 0;
  startY = 0;

  /** 是否在拉伸模式下 */
  isStretching = false;

  constructor() {
    this.toContainerEl = document.body;
    this.nodeWrapperEl = document.createElement("div");
    this.nodeDotEl = document.createElement("div");
    const wrapperEl = this.toContainerEl.querySelector<HTMLDivElement>(
      `.${Stretch.wrapperClassName}`
    );
    if (wrapperEl) {
      this.nodeWrapperEl = wrapperEl;
    } else {
      this.createResizeElement();
    }
  }

  // 创建图片容器节点
  public createResizeElement() {
    // 容器元素
    this.nodeWrapperEl.style.cssText = `
      position: fixed;
      display: none;
      user-select: none;
      border: 4px solid #191919;
      box-sizing: border-box;
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    `;
    this.nodeWrapperEl.className = Stretch.wrapperClassName;
    // 调整按钮元素
    this.nodeDotEl.style.cssText = `
      position: absolute;
      bottom: -6px;
      right: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #191919;
      user-select: none;
      cursor: se-resize;
    `;
    this.nodeDotEl.className = "node-resize-dot";
    this.bindEvent();
    // 添加元素
    this.nodeWrapperEl.appendChild(this.nodeDotEl);
    this.toContainerEl.appendChild(this.nodeWrapperEl);
  }

  // 单例模式
  public static create() {
    if (!Stretch.instance) {
      Stretch.instance = new Stretch();
    }
    return Stretch.instance;
  }

  // 显示元素
  public show(nodeBox: HTMLDivElement) {
    this.nodeBox = nodeBox;
    const rect = nodeBox.getBoundingClientRect();
    this.imgWidth = rect.width;
    this.imgHeight = rect.height;

    this.nodeWrapperEl.style.display = "block";
    this.nodeWrapperEl.style.backgroundImage = `url(${"./38-536x354.jpg"})`;
    this.nodeWrapperEl.style.top = rect.top + "px";
    this.nodeWrapperEl.style.left = rect.left + "px";
    this.nodeWrapperEl.style.width = rect.width + "px";
    this.nodeWrapperEl.style.height = rect.height + "px";

    nodeBox.style.display = "none";
  }

  // 隐藏元素
  public hide() {
    this.nodeWrapperEl.style.display = "none";
    this.nodeWrapperEl.style.backgroundImage = "none";
  }

  // 绑定事件函数
  private bindEvent() {
    this.onMousedown = this.onMousedown.bind(this);
    this.onMousemove = this.onMousemove.bind(this);
    this.onMouseup = this.onMouseup.bind(this);

    this.nodeDotEl.addEventListener("mousedown", this.onMousedown);
    window.addEventListener("mousemove", this.onMousemove);
    this.nodeDotEl.addEventListener("mouseup", this.onMouseup);
  }

  // 鼠标按下事件
  private onMousedown(e: MouseEvent) {
    e.stopPropagation();
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.isStretching = true;
  }

  // 鼠标拖动事件
  private onMousemove(e: MouseEvent) {
    e.stopPropagation();
    if (this.isStretching) {
      const imgNewWidth = e.clientX - this.startX + this.imgWidth;
      const imgNewHeight = e.clientY - this.startY + this.imgHeight;

      this.nodeWrapperEl.style.width = imgNewWidth + "px";
      this.nodeWrapperEl.style.height = imgNewHeight + "px";
    }
  }

  // 鼠标松开事件
  private onMouseup() {
    if (this.nodeBox) {
      // 记录图片宽度，方便下次拖动使用
      this.imgWidth = this.nodeWrapperEl.clientWidth;
      this.imgHeight = this.nodeWrapperEl.clientHeight;
      // 把宽高应用的nodeBox上
      this.nodeBox.style.width = this.imgWidth + "px";
      this.nodeBox.style.height = this.imgHeight + "px";
      // 隐藏元素并显示nodeBox
      this.hide();
      this.nodeBox.style.display = "block";
    }
    this.isStretching = false;
  }
}
