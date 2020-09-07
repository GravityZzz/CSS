# 认识 React

HTML 是 Hypertext Markup Language 的缩写，即超文本标记语言：

_**都是 ML 结尾，共同点就是都是标记语言。**_

- HTML，超文本标记语言，是语法较为松散的、不严格的 Web 语言；
- XML，可扩展标记语言，主要用于存储数据和结构[参考]-(http://w3school.com.cn/xml/xml_intro.asp)；
- XHTML，可扩展超文本标记语言，基于 XML，作用与 HTML 类似，但语法更严格参考。

## 1.块级元素

**一、元素类型**

**（一）块级元素**

- 特点：
  (1)占据一整行。即使设置宽度，右边多余的部分也会用 margin 进行填充
  (2)可以设置宽高
  (3)块级元素可以嵌套所有的行内元素以及部分的块级元素
  有语义的标签最好不要套 div 标签 `p>div p>p`
  应用场景：怎么实现块级元素在父容器里水平居中？
  `margin:0 auto`
  总结：body、h1-h6、p、列表 ul>li ol>li dl>dt>dd

**（二）行内元素**

- 特点：
  （1）宽高由内容决定，不能设置宽高  
  （2）行内元素也遵循盒模型，但是设置上下的内外框无效  
   应用：行内元素如何实现在容器的水平居中； 给其父容器添加 `text-align；center；`  
   总结：加粗、倾斜、a、span、img、input、textarea  
   如何实现元素在容器的垂直方向上居中  
   1.设置一把尺子 `width,height = 父容器的高度`  
   2.该元素与尺子 `display:inline-block; vertical-align:middle`

```html
<style type="text/css">
  .parent {
    width: 1000px;
    height: 300px;
    border: 1px solid black;
    text-align: center;
  }

  .parent .child {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: orange;
    vertical-align: middle;
  }

  .parent .rule {
    display: inline-block;
    width: 0;
    height: 300px;
    vertical-align: middle;
  }
</style>

<body>
  <div class="parent">
    <div class="child"></div>
    <div class="rule"></div>
  </div>
</body>
```

**二、元素类型的转换 display**
1.inline 转换为行内元素
2.block 转换为块级元素
3.list-item 转换成列表项（li）
4.inline-block 转换成行内块级元素
_（1）一行显示多个 （2）可以设置宽高_
5.none 隐藏元素，不占位置 6.
A.大部分块元素 display 属性值默认为`block`，其中列表 li 的默认值为 list-item。
B. 大部分内联元素的 display 属性值默认为`inline`，其中 img,inoput,textarea 默认为 inline-block。

```html
This is a regular paragraph.

<table>
  <tr>
    <td>Foo</td>
  </tr>
</table>

This is another regular paragraph.
```

===================================================================================

## 定位与锚点

**(一)定位 position**

_rules:_  
 移动为正值。  
 ​ 相对于自己的左边往右边移为正值;  
 ​ 相对于自己的中心走为正值，框内走为正，框外走为负。

1.`position:static;` 静态定位 (默认标准流定位)  
 ​ 无法设置 `left、right、top、bottom`

2.`position:relative;` 相对定位  
 ​ (1)相对于自己本身所在的位置进行移动定位  
 ​ (2)配合上下左右进行移动定位。相对于自己的某条边的元素中心  
 ​ (3)相对定位的元素不脱离标准流。（灵魂出窍）

3.`position absolute;` 绝对定位  
 ​ (1)绝对定位的元素是相对于 html 或者最近的有定位的父元素  
 ​ (2)配合上下左右进行移动定位。相对于包含块的某条边往包  
 ​ (3)绝对定位的元素会脱离标准流

4.position:fixed;固定定位  
 ​ (1)相对于浏览器的可视区域进行移动
​ (2)配合上下左右进行移动定位。相对于浏览器可视区域的 某条边往浏览器可视区域中心移动为正值。  
 ​ (3)脱离标准流

```html
如何实现元素在容器中居中？ ​ 子绝父相（父元素可以是其他定位） ​ 子元素
`top:50%;margin-top:负自己高度的一半；` ​
`left:50%;margin-left:负自己宽度的一半`

<div class="parent">
  <div class="child"></div>
</div>
```

```less
.parent {
  width: 500px;
  height: 500px;
  position: relative;

  .child {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
```

**（二）层级 z-index**
​ 1.定位 > 浮动 > 浮动 > 标准流  
​ 2.`z-index` 只能用于有定位的元素上  
​ 3.`z-indent` 可以取负数，没有单位

**（三）命名锚点**
​ a[href="#id 名"]跳转到 id 名所在的元素上  
​ a[href="页面路径#id 名"]跳转到其他页面该 id 名所在的元素上

**（四）overflow 内容溢出容器时的处理方式**
​ 属性值：`visible` 默认可见 `hidden` 隐藏  
​ `scroll` 滚动条 `auto` 判断需要出现滚动条才会出现  
​ 设置某个方向：`overflow-x` 水平方向 `overflow-y` 垂直方向  
​ **规定：当某一个方向的值设置不为 `visible`，另外一个方向会设置成 `auto`**

    隐藏元素的两种方式
    1.`display：none` 隐藏元素：不占位置
    2.`visibility：hidden；`可见性，隐藏元素，占位置

```less
// 隐藏滚轮
.div {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
}

.div {
  width: 100%;
  overflow: hidden;
  height: 340px;

  ul {
    padding-bottom: 40px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch; /* ios5+ */

    li {
      ...;
    }
  }
}
```

# 技术点

- [JSX 语法](https://github.com/wscats/react-tutorial/tree/master/react/jsx)
- [组件定义](https://github.com/wscats/react-tutorial/tree/master/react/component/src/define)
- [组件渲染](https://github.com/wscats/react-tutorial/tree/master/react/component/src/render)
- [组件事件](https://github.com/wscats/react-tutorial/tree/master/react/component/src/event)
- [state](https://github.com/wscats/react-tutorial/tree/master/react/component/src/state)
- [样式绑定](https://github.com/wscats/react-tutorial/tree/master/react/component/src/style)
- [表单](https://github.com/wscats/react-tutorial/tree/master/react/component/src/form)
- [组件通信](https://github.com/wscats/react-tutorial/tree/master/react/component/src/communication)
- [生命周期](https://github.com/wscats/react-tutorial/tree/master/react/component/src/lifecycle)
- [模块化（webpack）](https://github.com/wscats/react-tutorial/tree/master/react/webpack)
- [脚手架（create-react-app）](https://github.com/wscats/react-tutorial/tree/master/react/create-react-app)
- [调试工具（react-dev-tool）](https://github.com/wscats/react-tutorial/tree/master/react/react-devtool)
- [路由（3.0）](https://github.com/wscats/react-tutorial/tree/master/react/router)[和（4.0）](https://github.com/wscats/react-tutorial/tree/master/react/router4)
- Redux
  - [Redux 简介和简单实现](https://github.com/wscats/react-tutorial/tree/master/react/redux)
  - [Redux 跨组件通信之入门篇 —— combineReducers](https://github.com/wscats/react-tutorial/tree/master/react/redux/combineReducers)
  - [Redux 跨组件通信之进阶篇 —— Provider 和 connect](https://github.com/wscats/react-tutorial/tree/master/react/redux/connetProvider)
  - [Redux 跨组件通信之高级篇 —— 中间件](https://github.com/wscats/react-tutorial/tree/master/react/redux/middleware)
- [项目应用](https://wscats.github.io/react-tutorial/react/reactERP/index.html#/login)
- [其他案例](https://github.com/Wscats/react-tutorial/blob/master/CASE.md)
- [纲要总结](https://github.com/Wscats/react-tutorial/blob/master/react/summery/summery.md)

# 题外话

这份教程是综合了[Y.Pig](https://github.com/Wscats/react-tutorial)和[DK](https://github.com/dk-lan/react)的内容，因为代码和文档比较多，整理中如有疏漏或者错误，可以在 Issues 中提出，多多谅解，希望对你们有帮助，如果你喜欢可以点个 Star 或者 Fork ，谢谢~
