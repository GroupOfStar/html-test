# html-test
`html` `js` `css` 测试demo

## 开始

访问的 https://localhost:5173/ 在首页的入口进入的子页面,或者直接的访问子页面的链接,比如

- https://192.168.110.13:5173/pages/img-stretch/

- https://192.168.110.13:5173/pages/clipboard-event/

- https://192.168.110.13:5173/pages/navigator-clipboard/


## https问题

见 pages/navigator-clipboard/README.md 文件
> 当keys文件是基于192.168.110.13生成的, 换了ip需要重新生成


## 注意

`<script type="module">` 󠁪标签定义的模块时，由于JavaScript模块具有自己的作用域，模块内的函数并不会自动暴露到全局作用域中。因此，在HTML中直接通过 `onclick` 绑定的函数会找不到

因此最佳的方式是在js中 通过 `dom.addEventListener` 来绑定事件.
