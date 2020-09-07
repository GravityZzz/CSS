# 认识 React

HTML 是 Hypertext Markup Language 的缩写，即超文本标记语言：

_**都是 ML 结尾，共同点就是都是标记语言。**_

- HTML，超文本标记语言，是语法较为松散的、不严格的 Web 语言；
- XML，可扩展标记语言，主要用于存储数据和结构[参考]-(http://w3school.com.cn/xml/xml_intro.asp)；
- XHTML，可扩展超文本标记语言，基于 XML，作用与 HTML 类似，但语法更严格参考。

## 1.块级元素

**一、元素类型**

**(一)块级元素**

- 特点：
  (1)占据一整行。即使设置宽度，右边多余的部分也会用 margin 进行填充
  (2)可以设置宽高
  (3)块级元素可以嵌套所有的行内元素以及部分的块级元素
  有语义的标签最好不要套 div 标签 `p>div p>p`
  应用场景：怎么实现块级元素在父容器里水平居中？
  `margin:0 auto`
  总结：body、h1-h6、p、列表 ul>li ol>li dl>dt>dd

**(二)行内元素**

- 特点：
  (1)宽高由内容决定，不能设置宽高  
  (2)行内元素也遵循盒模型，但是设置上下的内外框无效  
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
3.list-item 转换成列表项(li)
4.inline-block 转换成行内块级元素
_(1)一行显示多个 (2)可以设置宽高_
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

## 2.定位与锚点

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
 ​ (3)相对定位的元素不脱离标准流。(灵魂出窍)

3.`position absolute;` 绝对定位  
 ​ (1)绝对定位的元素是相对于 html 或者最近的有定位的父元素  
 ​ (2)配合上下左右进行移动定位。相对于包含块的某条边往包  
 ​ (3)绝对定位的元素会脱离标准流

4.`position:fixed;` 固定定位  
 ​ (1)相对于浏览器的可视区域进行移动  
​ (2)配合上下左右进行移动定位。相对于浏览器可视区域的 某条边往浏览器可视区域中心移动为正值。  
 ​ (3)脱离标准流

```html
<!--如何实现元素在容器中居中？ ​ 子绝父相(父元素可以是其他定位) ​ 子元素-->
<!--top:50%;margin-top:负自己高度的一半；-->
<!--left:50%;margin-left:负自己宽度的一半-->

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

**(二)层级 z-index**  
​ 1.定位 > 浮动 > 浮动 > 标准流  
​ 2.`z-index` 只能用于有定位的元素上  
​ 3.`z-indent` 可以取负数，没有单位

**(三)命名锚点**  
​ a[href="#id 名"]跳转到 id 名所在的元素上  
​ a[href="页面路径#id 名"]跳转到其他页面该 id 名所在的元素上

**(四)overflow 内容溢出容器时的处理方式**  
​ **属性值：**  
 `visible` 默认可见 `hidden` 隐藏  
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

## 3.精灵门与滑动门

**精灵图**  
将导航背景图片、按钮背景图片等有规则合并成一张背景图片,即将多张图片合成一张整图,使用 background-position

**滑动门**  
通过多张背景图片进行层叠，从而在视觉上达到同一张图片的效果

```less
a {
  //padding-left 存放左边的背景图片
}
> span {
  //padding-right 以实现文本居中
}
// case
a {
  height: 22px;
  display: block;
  text-align: center;
  padding-left: 26px;
  background: url("./src/images/carousel_1.jpg") no-repeat left top;

  span {
    display: block;
    background: url("./src/images/carousel_2.jpg") no-repeat right top;
  }
}
```

## 4.宽高自适应

**(一)宽度自适应**  
 当块级元素的宽度设置为 100%，或者不设置，宽度默认为占父元素的 100%  
 经验：当父元素脱离了标准流，由子元素的宽度撑大父元素

**(二)父元素的高度由子元素撑开**  
1.高度塌陷：当子元素都浮动了，父元素会没有子元素撑开高度

解决方法：

> (1)给父元素加 overflow:hidden；缺点：若存在内容溢出，会被裁掉  
> (2)给父元素添加最后一个元素(块级元素)
> (3)伪元素清除法：(把类名 .clearfix 添加到父元素上, 脱离标准版的元素同理)

```less
// 2.给父元素添加块级元素
.div {
  height: 0;
  clear: both;
  overflow: hidden;
}
// 3.伪元素清除法
.clearfix::after {
  height: 0;
  content: "";
  display: block;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
```

2.最小高度: `min-height`  
 当内容高度小于最小高度，按最小高度显示；  
 当内容高度大于最小高度，按内容高度显示；

    应用场景：内容不确定，内容前后相差较多时，无法较好控制父元素
    兼容ie6：
       ie中height代表的是最小高度。若想这个属性只让ie6识别，
       通过过滤器:_height

**(三)元素高度自适应窗口高度**

```less
html,
body {
  height: 100%;

  .div {
    height: 100%;
  }
}
```

## 5.伪元素

元素类型默认为行内元素  
 content:""不能省略  
 content:url("");添加图片

1.E：before 给 E 元素添加第一个子元素  
2.E：after 给 E 元素添加最后一个子元素  
3.E：first-letter 给 E 元素的第一个文本添加样式  
4.E：first-line 给 E 元素的第一行文本添加样式

## 6.兼容小细节

**隐藏**  
隐藏元素的两种方式  
 1.隐藏元素：不占位置 `display：none;`  
 2.可见性，隐藏元素，占位置 `visibility：hidden;`

**(2)图片间隙问题**  
div>img,img 下方会存在间隙

    解决方法：
    *img{display:none}
    *img{font-size:0;}

**(3)双倍浮动问题**  
ie6 以下版本，会错误地将浮动元素浮向边 margin 加倍显示

    解决方法：
    {display:inline;}

**(4)默认高度**  
IE7 以下版本 存在默认高度为 16px

    解决方法：
    {font-size:0;}
    {overflow:hidden;}

**(5)表单元素行高**  
表单元素行高不一致(基线对齐的问题)

    解决方法：
    *{vertical-align:middle;}
    *{float:left;}

**(6)表单元素元素样式**  
表单元素元素样式在各流浪器渲染效果不一

    解决方法：
    给input清除默认样式
    {display:block; border:0; none; padding:0;}
    给input外层嵌套标签，设置input需要的样式。

**(7)百分比 bug**  
浮动元素`50% + 50%>100%` (IE6 以下的版本)

    解决办法：
    若两个元素都在左浮动，给元素添加clear::right

**(8)鼠标指针 bug**  
IE8 以下支持 cursor:hand;

    解决办法：
    {cursor:pointer} // 手势为手指

**(9)透明属性**  
 _ opacity:val;val 取值为 0-1；越大越不透明 (高等浏览器)  
 _ filter:alpha(opacity=val)  
 \* filter:alpha(opacity=100)  
 val 取值为 0-100,整十数，越大越不透明。(IE8)

**(10)margin 塌陷**  
 父元素与第一个子元素存在上间距，若给第一个子元素 margin-top，会错误地渲染成父元素的 margin-top。

    解决方法：
    (1)子元素或者父元素浮动
    (2)给父元素加overflow:hidden
    (3)给父元素加border-top
    (4)将子元素的margin-top当作父元素的padding-top

**(11)margin 合并**  
 当两个块级元素竖直排列时，  
 上一个元素的 margin-bottom 与下一个元素的 margin-top 会发生合并，它们之间的 margin 取两者之间较大的值。

**(12)禁止点击**  
 pointer events:none;  
 val: auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit

## 7.BFC

> BFC(Block format content)块级格式化上下文,它是一个独立的渲染区域，只有 block-level box(块)参与，  
> 它规定了内部的块如何布局，并且与区域外部毫不相干。

- 1.内部的 box 会在垂直方向，一个接一个地放置

- 2.Box 垂直方向的距离由 margin 决定。属于同一个 bfc 的两个相邻块发生 margin 重叠

- 3.每个元素的 Margin box 的左边，与包含块 border box 的左边相接触  
  盒模型=content+padding+margin+border。  
  width 指的是 content 的宽，height 是 content 的高

- 4.bfc 的区域不会与 float box 重叠(应用场景：清除浮动的第二种方式、自适应两栏布局)

- 5.BFC 就是页面上的一个隔离的独立容器，不影响外部的元素  
  (应用场景：防止 margin 合并，对独立的 bfc 里面的 子元素操作不会影响到外部元素)

- 6.计算 bfc 高度时，里面的浮动元素也参与计算  
  (清除浮动的第一种方式) 兄弟元素属于同一个 bfc 里面

_触发条件：_
`根元素html float属性不为none position为absolute(有定位的父元素或者html)fixed display为inline-block, table-cell,table-caption flex, inline-flex(css3), overflow不为visible(overflow:hidden;) `

自适应两栏布局  
 方法一：  
左边定宽加浮动,右边为`margin-left`留左边位置,左边浮动元素会脱离标准流，第二个占据位置第一个位置，  
 块级元素宽度为 100%，当设置 margin 后就自动调整。

方法二：
左边定宽加浮动，右边不定宽加`overflow:hidden`  
原理：BFC 区域不会与浮动块重叠。

## 8.表单、表格

### 表单

**fieldset**  
相当于一个方框，在字段集中可包含文本和其他元素。  
该元素用于对表单中的元素进行分组并在文档中区别标出文本，fieldset 可以设置嵌套，disable 可以定义空间禁止使用。

**fieldset > Legend**  
字段集标题(必须作为表单字段集的第一个元素，align 控制位置)

**label 提示信息标签**  
[for]关联到 id 名所在的表单元素  
若用于单选框或多选框，一般都是直接将文字及表单元素包含在 label 里面

**type 属性**

- 常用类型与 H5 新增的类型  
  1.color 拾色器  
  2.e-mail 邮箱(正则验证)  
  3.number 数字  
  4.tel 电话号码  
  5.url 网址(正则验证)  
  6.search 搜索  
  7.range 特定范围的数值选择器，min、max、value 当前值、step  
  8.date、month、week、time、datetime、datetime-local--时间

**html 属性**  
1.autofocus 自动聚焦  
2.placeholder 占位符  
3.required 必填项  
4.pattern 正则

```html
<fieldset class="f1">
  <h2>已注册用户登录</h2>
  <fieldset class="f2">
    <legend class="la"><span>用户登录</span></legend>
    <form action="#" method="get" id="form1">
      <div class="dv1">
        <label for="user" class="x1">用户名:</label>
        <input type="text" id="user" /> <br />
      </div>
      <label for="mima" class="x2">密码：</label>
      <input type="password" id="mima" /> <br />
      <div class="dv2">
        <input type="checkbox" id="a1" />记住我
        <input type="submit" value="登录" id="submit" /><br />
      </div>
      <p>您忘记密码？</p>
    </form>
  </fieldset>
  <h2>未注册创建账号</h2>
  <form action="#" method="get" id="form2">
    <fieldset class="f3">
      <legend class="la"><span>用户注册</span></legend>
      <p>您的电子邮箱不会被公布出去</p>
      <label for="user1">用户名:</label>
      <input type="text" id="user1" /><span>*(最多30个字符)</span><br />
      <label for="email">电子邮箱:</label>
      <input type="text" id="email" /> <span>*</span> <br />
      <label for="mima2">密码:</label>
      <input type="text" id="mima2" /><span>*</span><br />
      <label for="remima">重复密码:</label>
      <input type="text" id="remima" /><span>*(最多15字符)</span><br />
      <input type="submit" id="submit1" />
      <input type="reset" id="reset1" /><br />
      <p>*注意事项</p>
    </fieldset>
  </form>
</fieldset>
```

![Alt text](https://github.com/GravityZzz/CSS/blob/master/src/Images/fieldset.png "事例")

```less
// 上传文件
input[type="file"] [multiple多选]
// 图片上传
input[type="images"][scr图片路径]

/*移除input[number]的上下箭头*/
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  -moz-appearance: textfield;
  margin: 0;
}
```

## 10.H5 增加的新特性

> 增加了新特性：语义特性，本地存储特性，设备兼容性，链接特性，网页多媒体特性，三维，图形及特效特性，性能与集成特性，css3 特性。

1.header 头部标签，一般都是包含标题标签或者导航条 (header,foot 不互相嵌套)  
2.hgroup 对标题进行组合  
3.footer 一般都是版权信息、作者简介  
4.nav 导航条，对于屏幕阅读器等设备支持更好  
5.main 主要内容，一个页面就用一次，外层结构  
6.article 文章、独立的内容块。可以嵌套自己  
7.section 章节、区块，专题性的内容  
8.aside 侧边栏，非正文的内容

- 9.figure 对图片跟文字进行组合>figcaption 对 figure 的内容进行说明

```html
<figure>
  <img src="../images/39.gif" height="254" width="196" alt="" />
  <figcaption>这是一个赵本山的图片</figcaption>
</figure>
```

10.time 具体时间标签

```html
<p>我一般都是<time>6:00</time>起床！</p>
<p>我<time datetime="2018/01/01">今年春节</time>买了个表</p>
```

11.details 细节[open 默认显示细节]>summary 对细节的总结

```html
<details open>
  <summary>静夜思 李白</summary>
  <p>床前明月光，疑是地上霜。举头望明月，低头思故乡。</p>
</details>
```

12.mark 定义带有标号的文本，在需要突出显示文本时使用<mark>标签

```html
<p>
  我<mark>看见</mark>他缓缓地<mark>离去</mark>，泪水<mark>浸湿</mark>了我的衣衫。
</p>
```

13.progress[max 最大值][value当前值]定义进度条

```html
<progress max="200" value="100"><span>50</span>%</progress>
```

14.度量尺-不支持 IE 浏览器  
[min 最小值][max最大值][low 较低的值][high较高的值][value 当前值]  
[optimum 较佳的值，当取值小于较低的值说明越低越好，反之同理]

```html
<meter min="0" max="100" low="60" high="85" value="39" optimum="86" />
```

15.注释标签  
 ruby 注释标签>rt 对内容的注释信息  
 <ruby>禤<rt>xuan</rt></ruby>  
16.video  
支持格式：ogg、mp4、webM  
(1)[controls]控制条  
(2)[autoplay]自动播放  
(3)[loop]循环播放  
(4)[width][height]  
(5)[muted] 值 muted 规定视频输出应该被静音  
(6)[preload] preload  
如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。  
(7)[poster]等待加载

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
- [模块化(webpack)](https://github.com/wscats/react-tutorial/tree/master/react/webpack)
- [脚手架(create-react-app)](https://github.com/wscats/react-tutorial/tree/master/react/create-react-app)
- [调试工具(react-dev-tool)](https://github.com/wscats/react-tutorial/tree/master/react/react-devtool)
- [路由(3.0)](https://github.com/wscats/react-tutorial/tree/master/react/router)[和(4.0)](https://github.com/wscats/react-tutorial/tree/master/react/router4)
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
