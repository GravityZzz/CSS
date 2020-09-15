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

**盒模型**
盒模型：content、padding、margin、border  
1.标准盒模型：width、height 指的是 content 的宽高  
2.怪异盒模型：width、height 指的是 content+padding+border 的宽高  
 `box-sizing: attr⬇️` 规定盒模型  
 content-box 设置普通盒模型 border-box 设置成怪异盒模型

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

常用类型与 H5 新增的类型  
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
9.figure 对图片跟文字进行组合>figcaption 对 figure 的内容进行说明

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
16.video、audio  
支持格式：ogg、mp4、webM  
(1)[controls]控制条  
(2)[autoplay]自动播放  
(3)[loop]循环播放  
(4)[width][height]  
(5)[muted] 值 muted 规定视频输出应该被静音  
(6)[preload] preload  
如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。  
(7)[poster]等待加载

## 11.选择器

(一)基本选择器  
 1.标签(元素)选择器：通过标签名获取元素  
 2.类选择器：通过.类名获取元素  
 3.id 选择器：通过#id 名获取元素  
 4.通配符选择器：通过\*获取到页面中所有元素  
 5.群组选择器 E1，E2：通过逗号获取到多个选择器

(二)层次选择器  
 1.后代选择器 E1 E2：表示获取到的 E2 元素是 E1 元素的后代  
 2.子代选择器 E1>E2：表示获取到的 E2 元素是 E1 元素的子代  
 3.相邻兄弟选择器 E1+E2：表示获取的 E2 元素，紧跟 E1 元素的后面  
 4.兄弟选择器 E1~E2：表示获取 E1 后面的所有 E2 元素

(三)动态伪类选择器  
 1.`:link` 锚链接被访问前添加的样式  
 2.`:visiter` 锚链接被访问后添加的样式  
 3.`:hover` 鼠标悬停在任一元素上的添加的样式  
 4.`:active` 鼠标点击任一元素时添加的样式  
 5.`:focus` 表单元素被聚焦时添加的样式

(四)目标伪类选择器  
 E：`target` 获取 E 元素里面被作为当前目标的元素

(五)ui 状态伪类选择器  
 1.`:enabled` 可用的表单元素添加样式  
 2.`:disabled` 可用的表单元素添加样式  
 3.`:checked` 选中的表单选框添加样式

(六)结构伪类选择器  
 1.E:first-child 获取到父元素的第一个子元素，且要满足 E 元素  
 2.E:last-child 获取到父元素的最后一个子元素，且要满足 E 元素  
 3.E:nth-child(n) 获取到其父元素的第 n 个子元素，且满足 E 元素  
 从 1 开始计数。  
 4.E:nth-last-child(n) 获取到其父元素的倒数第 n 个子元素,且满足 E 元素，从 1 开始计数。  
​ n 的数值：具体数值  
 odd(2n-1)第奇数个孩子 even(2n)第偶数个孩子 -n+a 获取到父元素第一个到第 a 个孩子  
​ 5.E:first-of-type 获取到其父元素的第一个 E 类型的子元素  
​ 6.E:last-of-type 获取到其父元素的最后一个 E 类型的子元素  
​ 7.E:nath-of-type(n) 获取到其父元素的第 n 个 E 类型的子元素  
​ 8.E:nath-last-of-type(n) 获取到其父元素的倒数第 n 个 E 类型的子元素  
​ 9.E:empty 空文本元素添加样式，有空格不算空文本  
​ 10.E:only-child{}获取到其父元素唯一的一个子元素  
​ 11.E:only-of-type 获取到父元素的唯一一个 E 类型的孩子

(七)否定伪类选择器  
 F:not(E) 除了 E 元素以外的所有 F 元素

(八)语言伪类选择器  
 q:lang(no){quotes:"""";}  
​ q[lang="no"]在内容两侧会生成引号，若想改变符号，通过如上的语言伪类选择器

(九)伪元素选择器  
 1.`E::before(content:"")`给 E 元素添加第一个子元素  
 2.`E::after(content:"")`给 E 元素添加最后一个子元素  
 3.`E::first-letter(content:"")`第一个文本  
 4.`E::first-list(content:"")`第一个行  
 5.`E::selection` E 元素的内容被选中时添加样式  
 兼容火狐：-moz-selection

(十)属性选择器  
 1.`E[attr]`拥有该 attr 属性的 E 元素被获取到  
 2.`E[attr="val"]`拥有该 attr 属性，且属性值等于 val 的值的 E 元素  
 3.`E[attr*="val"]`拥有该 attr 属性，且属性值包含 val 的值的 E 元素  
 4.`E[attr^="val"]`拥有该 attr 属性，且属性值以 val 值开头的 E 元素  
 5.`E[attr$="val"]`拥有该 attr 属性，且属性值以 val 值结尾的 E 元素

## 12.文本和背景图

**(一)文本属性**

1.  文本阴影 `text-shadow: attr ⬇️ `  
    x-offset 水平偏移，右正左负  
    ​y-offset 垂直偏移，下正上负  
    ​blur 模糊区域，不能取负值
2.  文本溢出 `text-overflow: attr ⬇️`  
    属性值 clip-默认不处理 ellipsis- 省略号

3.  单词间距 `word-spacing: attr ⬇️`  
    数值 px

4.  单词换行 `word-break: attr ⬇️`  
    break-all 任意字符间断行  
    keep-all 文本不断行  
    break-word 单词换行
5.  文本换行 `white-space: attr ⬇️`

    |                | 换行符 | 空格和制表符 | 文字换行 | 行尾空格 |
    | :------------- | :----- | :----------- | :------- | -------- |
    | `normal`       | 合并   | 合并         | 换行     | 删除     |
    | `nowrap`       | 合并   | 合并         | 不换行   | 删除     |
    | `pre`          | 保留   | 保留         | 不换行   | 保留     |
    | `pre-wrap`     | 保留   | 保留         | 换行     | 挂起     |
    | `pre-line`     | 保留   | 合并         | 换行     | 删除     |
    | `break-spaces` | 保留   | 保留         | 换行     | 换行     |

6.  自定义字体

```css
/* 字体图标：矢量图(可以理解成文本，字)，放大缩小不会模糊。*/
@font-face {
  font-family: "SFMono-Regular";
  src: url("./src/images");
}
```

7.  颜色  
    rgba(red0-255,green0-255,blue0-255,alpha 不透明度)
    hsla(色调 0-360，饱和度 0-100%，亮度 0-100%，alpha0-1)
    transparent 完全透明（三角形）

> 省略文本

```css
/*只显示一行，超出部分用省略号*/
.line {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 只显示两行(或多行)，超出部分用省略号*/
.multiple {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

​
**(二)背景属性**

1.  `background-size: attr ⬇️` 背景图片的尺寸  
    ​ `cover` 背景图片完全覆盖容器(绝大部分情况会出现背景图丢失一部分)  
    ​ `contain` 容器完全包含背景图片(绝大部分容器留白现象)

            *应用：一般轮播图采用背景图片
            background-size:cover;
            background-position:center center;
            background-position 背景图片在容器的定位区域中的位置

2.  `background-origin: attr ⬇️` 背景图片的定位区域  
    默认从 padding 开始摆放 padding-box  
    `content` content-box(此时的 background-position：0 0 是在内容的左上角)
    `border-box` 开始

3.  `background-clip: attr ⬇️`背景图片的裁剪(最终显示区域)
    `border-box` 从边框部分开始裁剪  
    `padding-box` 从 padding 部分开始裁剪  
    `content-box` 从 content 部分开始裁剪  


## 边框与渐变

**(一)边框属性**

1.  `box-shadow: x-offset,y-offset,blur,spread,color，inset ⬇️` 边框阴影  
     x-offset 水平偏移 往右为正  
    ​ y-offset 垂直偏移 往下为正  
    ​ blur 模糊区域  
    ​ spread 扩展区域  
    ​ color 颜色  
    ​ inset 往元素内部移动。若是不设置，往元素外部添加阴影边框

```css
/*兼容写法*/
.box {
  -webkit-appearance: none;
  box-shadow: 0 20px 44px 0 rgba(79, 11, 11, 0.5);
  -webkit-box-shadow: 0 20px 44px 0 rgba(79, 11, 11, 0.5);
}
```

2.  `border-image: attr ⬇️` 边框图片  
     边框图片引入`border-image-source:(url)`  
     边框图片的宽度 `border-image-width` 若省略该值，默认就是边框宽度
    ​ 边框图片的重复 `border-image-repeat: attr ⬇️`  
    ​ stretch 默认拉伸 repeat 重复 round 压缩重复  
    ​ 边框图片向外延伸 border-image-outset 不能取负数  
     边框圆角 `border-radius :水平半径/垂直半径;`  
    ​ 水平或者垂直半径遵循（从左上角开始）顺时针原则，缺省的值找对角

```css
/*边框渐变*/
.box {
  border: 1px transparent solid;
  border-image: linear-gradient(to right, #000718, #23b7cb) 1 10;
}
/*边框圆角*/
.box {
  border-radius: 4px 3px 6px 10px/ 2px 4px 10px 10px; // X坐标/Y坐标
}
```

**(二)渐变**

1. `linear-gradient: attr ⬇️` 线性渐变  
    gradient(linear,起点坐标，终点坐标，from(color) to(color))  
   ​ gradient(linear，起点坐标，垂直坐标，color-stop(渐变开始的位置))

2. `radial-gradient: attr ⬇️` 径向界面  
    1.radial-webkit-gradient(圆心，颜色 开始渐变的位置)  
   ​ 2.radial-webkit-gradient(圆心，size||shape,颜色 开始渐变的位置）  
   ​ `size大小 attr⬇️`  
   ​ closest-side:最近边 farthest-side:最远边  
   ​ closest-corner:最近角 farthest-corner:最远角（默认值）  
   ​ `shape形状: attr⬇️`  
   ​ ellipse 椭圆形（默认） circle 表示圆形
3. ` repeating-radial-gradient: attr ⬇️`  
    用法同上

```css
/*图片背景渐变*/
.background {
  background: -webkit-linear-gradient(
    top,
    #c43337,
    #e34c4b,
    #cf383b
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    bottom,
    #c43337,
    #e34c4b,
    #cf383b
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    bottom,
    #c43337,
    #e34c4b,
    #cf383b
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to bottom,
    #c43337,
    #e34c4b,
    #cf383b
  ); /* 标准的语法 */
}
```

## 14.过渡与状态-2d

> 渐进增加：保证低版本浏览器最基本的功能，再考虑高版本的一些的用户需求。  
> 优雅降级：一开始构建完整的功能，然后再针对低版本浏览器进行兼容。

**(一)transition 过渡**

过渡: 让变化在一段时间内进行

1.  `transition-property: attr`需要过渡的属性
2.  `transition-duration: 200s`需要过渡的时间
3.  `transition-timing-function: attr ⬇️ `需要过渡的形式

    | 属性          | 描述             |
    | ------------- | ---------------- |
    | `linear`      | 匀速             |
    | `ease`        | 慢速进入         |
    | `ease-in`     | 慢速进入         |
    | `ease-out`    | 慢速离开         |
    | `ease-in-out` | 慢速进入慢速离开 |

4.  `transition-delay: 0.2s`需要过渡的延迟

> 总属性：1,2 必须写 transition:1 2 3 4(1 跟 2 不可以忽略)  
> 多个属性同时过渡可以用 all

**(二)transform 状态**

1. 移动变换 transform:translate(水平方向（右正），垂直方向（下正）)  
   ​ 改变某个方向 transform:translateX(水平方向) transform:translateY(垂直方向)  
   ​ \*取值取百分比的话，指的是自己的宽高 transform:translate(-50%, -50%)

​ 2. 缩放变换 transform:scale(x,y)
​ *取值为缩放比(倍数)，基准点为元素中心
​ *transform:scaleX(x) transform:scaleY(y)

​ 3. 旋转变换 transform:rotate(deg)  
 ​ \*顺时针旋转为正值，基准点在元素中心

​ 4. 扭曲变换 transform:skew(x 轴，y 轴)
​ x 轴逆时针为正值，y 轴顺时针为正值

​ 5. 元素变换的基准点 transform-origin  
 ​ 取值：数值 百分比 方位

## 15.3d 动画

**(一)3d 变换**

1. `transform：translate3d(x,y,z);`移动变换  
   `transform:translateZ(z);`其他方向同理
2. `transform-style：attr ⬇️;`变换方式  
   flat 平面(默认) preserve-3d 保持 3d 变换（父元素上）

3. `perspective: 数值;`设置管擦的距离,景深(父元素上)

4. `transform: attr ⬇️` 旋转变换  
   transform:rotateX(deg) 安培左手定律，扑倒方向为正
   transform 参考 transform 状态
5. `transform-origin:left top;` 变换的原点
   left,right,top,bottom

6. `perspective-origin: -200px -200px;` 景深的远点  
   数值

**(二)关键帧动画**

1. 通过@keyframes 指定动画序列：@keyframes name{}
2. 通过百分比将动画序列分割成多个节点
3. 在各节点中分别定义各属性
4. 通过 animation 将动画应用于相应元素

```less
.box {
  width: 200%;
  overflow: hidden;
  animation: move 4s infinite linear;
}

@keyframes move {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(-1050px);
  }
}
```

**(三)animation 属性**

1.  `animation-name: Gravity;` 动画名字
2.  `animation-operation: 2s;` 动画播放时间
3.  `animation-timing-function: linear;` 动画播放形式

    | 属性          | 描述             |
    | ------------- | ---------------- |
    | `linear`      | 匀速             |
    | `ease`        | 慢速进入         |
    | `ease-in`     | 慢速进入         |
    | `ease-out`    | 慢速离开         |
    | `ease-in-out` | 慢速进入慢速离开 |

4.  `animation-iteration-count: 2;` 动画播放的次数 infinite 循环播放

5.  `animation-direction: ` 动画播放的方向

    | 属性                | 描述         |
    | ------------------- | ------------ |
    | `normal`            | 正向播放     |
    | `reverse`           | 慢速进入     |
    | `alternate`         | 交替播放     |
    | `alternate-reverse` | 反向交替播放 |

7.`animation-fill-mode: backwards;` 动画完成后的状态  
 forward-保持最后的状态

     animation:1 2 3 4 5 6 7
     *animation:change 6s steps(2)
         step(n)、step(n，end)每一帧都分成n步，每一步都以前一步状态来填充时间段
         step(n,start)每一帧都分成n步，每一步都以后一步状态来填充时间段

8.`-webkit-animation-play-state:paused;` 动画播放状态  
​ pause 规定动画已暂停 ​ running 规定动画正在播放

- [7 个面](https://htmlpreview.github.io/?https://github.com/GravityZzz/CSS/blob/master/src/Case/7-sidedRotation.html, "case")
- [正方形选择](http://htmlpreview.github.io/?https://github.com/GravityZzz/CSS/blob/master/src/Case/BoxRotation.html, "case")
- [7 个面](https://htmlpreview.github.io/?https://github.com/GravityZzz/CSS/blob/master/src/Case/7-sidedRotation.html, "case")
- [7 个面](https://htmlpreview.github.io/?https://github.com/GravityZzz/CSS/blob/master/src/Case/7-sidedRotation.html, "case")
- [7 个面](https://htmlpreview.github.io/?https://github.com/GravityZzz/CSS/blob/master/src/Case/7-sidedRotation.html, "case")

## 16.弹性盒与布局

**(一)设置在父元素上**

1.  `display:flex;`将父元素设置成弹性盒  
    里面的子元素会在主轴方向不换行摆放,侧轴方向的大小不设置会当前行被默认拉伸。  
    主轴、侧轴方向可以改变,默认分别为水平和垂直,代表在父元素的摆放。

2.  `flex-direction:alt ⬇;️` 设置主轴方向  
    row 从左往右 row-reverse 从右往左  
    column 从上到下 column-reverse 从下往上
3.  `flex-wrap:alt ⬇;️` 设置子项目换行  
     nowrap 默认不换行 wrap 换行  
     wrap-reverse 换行反向 主轴水平时，上下反向，主轴垂直时，左右反向  

4.  `flex-flow:flex-direction||flex-wrap`

5.  `justify-content:alt ⬇;️` 设置子项目在主轴方向的对齐方式  
     *flex-start 默认在主轴的起点位置靠奇摆放  
     *flex-end 在主轴的终点位置靠奇摆放  
     *center 在主轴的中间位置靠奇摆放  
     *space-between 将主轴方向空白区域平分在子项目之间  
     \*space-around 将主轴方向空白区域环绕在子项目之间  

6.  `align-items:alt ⬇;️` 设置子项目在侧轴方向的对齐方式(当前行)  
     *stretch 若不设置子项目在侧轴方向的大小，会被默认拉伸  
     *flex-start 若设置子项目在侧轴的大小，会被默认摆放在侧轴起点位置  
     *flex-end 摆放在侧轴的终点位置  
     *center 摆放在侧轴的中间位置  
     \*baseline 子项目以基线对齐  

7.  `align-content:alt ⬇;️` 控制子项目在侧轴方向的对齐方式(换行)  
     *flex-start 默认在主轴的起点位置靠奇摆放  
     *flex-end 在主轴的终点位置靠奇摆放  
     *center 在主轴的中间位置靠奇摆放  
     *space-between 将主轴方向空白区域评分在子项目之间  
     \*space-around 将主轴方向空白区域环绕在子项目之间

**(二)设置在子元素上**

1.  `flex: 数值;` 设置子项目在主轴方向的比份

2.  `align-self: alt⬇️;` 设置单个子项目在（当前行）侧轴方向的对齐方式  
     *stretch 若不设置子项目在侧轴方向的大小，会被默认拉伸  
     *flex-start 若设置子项目在侧轴的大小，会被默认摆放在侧轴起点位置  
     *flex-end 摆放在侧轴的终点位置  
     *center 摆放在侧轴的中间位置  
     \*baseline 子项目以基线对齐

3.  `justify-self: alt⬇️;` 设置单个子项目在（当前行）主轴方向的对齐方式  
     *stretch 若不设置子项目在侧轴方向的大小，会被默认拉伸  
     *flex-start 若设置子项目在侧轴的大小，会被默认摆放在侧轴起点位置  
     *flex-end 摆放在侧轴的终点位置  
     *center 摆放在侧轴的中间位置  
     \*baseline 子项目以基线对齐  

4.  `order: 数值;` 设置子项目的显示顺序  
     设置了 order 会放在没设置 order 子项目后面  
     都设置了 order,数字越小越靠前  


## 17.布局

**(一)多列布局**

1.  `column-width` 每列的最小宽度
2.  `column-count` 最多的列数
3.  `column-gap` 列间距
4.  `column-rule` 列边框
5.  `column-span: alt⬇️;` 跨列  
    none 不跨列 all 横跨所有列

**(二)媒体查询**

布局视口 viewpoint:比实际屏幕尺寸大很多，保证页面完整显示，但是全局缩小后的页面。  
理想视口 viewpoint:meta 标签实现(meta:vp)（移动端一定要加这个）

width 控制 viewpoint 的宽度，可以是固定值，也可以是 device-width 设备宽度  
user-scalable:用户是否可以缩放  
initial-scale 控制初始化缩放比例，1.0 表示不可以缩放  
maximum-scale 最大缩放比例  
minimum-scale 最小缩放比例

媒体查询
1.@media screen and (条件){CSS 样式}
@media screen and(min-width:768px){
2.min-width 当页面宽度大于最小宽度，生效（从小写到大）
max-width 当页面宽度大于最小宽度，生效（从大写到小）
min_device-width [设备宽度] 设备改变宽度才生效
3.link[media="screen and (条件)"][href]

**(三)响应式布局**

1.  自适应布局
    元素的宽高自适应窗口或者子元素的大小，从而实现同一套页面适应  
    不同的窗口、分辨率以及设备。
2.  响应式布局（一般用在比较简单界面）
    相应不同的屏幕带下或者设备大小，对同一套页面的部分布局进行修改  
    但是大体上一致。一般用在比较简单界面。

```less
/*多栏布局*/
.box {
  column-width: 300px;
  column-count: 4;
  column-gap: 10px;
  column-rule: 2px solid #ccc;

  h2 {
    column-span: all;
    text-align: center;
  }
}

/*媒体查询*/
@media screen and (max-width: 1200px) {
}
@media screen and (max-width: 992px) {
}
@media screen and (max-width: 768px) {
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
