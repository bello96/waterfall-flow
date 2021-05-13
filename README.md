
---

> ##### 说明
- 这是一个基于vue实现的不定内容宽高触底加载更多瀑布流
- 使用时需要给定父容器宽高

> ##### 使用示例
```
<div id="waterBox">
  <water
    columns="2"
    offset="5"
    noMoreText="暂无更多"
    notMoreTextColor="#aaa"
    emptyText="暂无数据"
    @bottomEvent="bottomEvent"
    total="100"
  >
    <water-cell v-for="(item, index) in waterList" :key="index">
        ...
        ...
        ...
    </water-cell>
  </water>
<div>
```

> ##### 参数说明

**columns** : 列数（默认：2）

**offset** : 元素之间间距（默认：5）

**noMoreText** : 暂无更多提示文本（默认：暂无更多）

**notMoreTextColor** : 暂无更多提示文本颜色（默认：#aaa）

**emptyText** : 暂无数据提示文本（默认：暂无数据）

**total** : 总条数

**bottomEvent** : 触底回调函数

---