<template>
  <ul class="_Water_Box_" ref="_Water_Box_">
    <slot></slot>
    <div class="not_yet_box" v-if="isempty">
      <img src="./../notyet.svg" alt="" />
      <span>{{ emptyText }}</span>
    </div>
    <div class="note_txt" v-if="isPeriod" :style="baseLineStyle">
      <span>- {{ noMoreText }} -</span>
    </div>
  </ul>
</template>

<script>
export default {
  name: "Water",
  data() {
    return {
      baseLineStyle: {
        top: "0px",
        color: this.notMoreTextColor,
      },
      isempty: true,
      itemWidth: 0,
      isPeriod: false,
    };
  },
  props: {
    columns: {
      type: Number,
      default: 2,
    },
    noMoreText: {
      type: String,
      default: "我是有底线的",
    },
    notMoreTextColor: {
      type: String,
      default: "#aaa",
    },
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    offset: {
      type: Number,
      default: 5,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.ulDom = this.$refs._Water_Box_;
    this.scrollId = this.throttle(this.scrollCallback, 600, this.ulDom);
    this.ulDom.addEventListener("scroll", this.scrollId);
    this.itemWidth = (this.ulDom.offsetWidth - (this.columns - 1) * this.offset) / this.columns;
  },
  updated() {
    this.liDoms = [...this.ulDom.querySelectorAll("li")];
    this.setWater(this.columns, this.offset, this.liDoms, this.itemWidth);
  },
  beforeDestroy() {
    this.removeScrollCallback();
  },
  methods: {
    setWater(columns, offset, liDoms, itemWidth) {
      let array = [];
      this.isempty = false;
      for (let i = 0; i < liDoms.length; i++) {
        liDoms[i].style.width = itemWidth + "px";
        if (i < columns) {
          liDoms[i].style.top = 0 + "px";
          liDoms[i].style.left = i % columns == 0 ? itemWidth * i + "px" : itemWidth * i + offset * i + "px";
          array.push(liDoms[i].offsetHeight);
        } else {
          let minHeight = array[0];
          let index = 0;
          for (let j = 0; j < array.length; j++) {
            if (minHeight > array[j]) {
              minHeight = array[j];
              index = j;
            }
          }
          liDoms[i].style.top = array[index] + offset + "px";
          liDoms[i].style.left = liDoms[index].offsetLeft + "px";
          array[index] = array[index] + liDoms[i].offsetHeight + offset;
        }
      }
    },
    scrollCallback(waterbox) {
      if ( waterbox.clientHeight + parseInt(waterbox.scrollTop) + 10 >= waterbox.scrollHeight ) {
        if (this.liDoms.length >= this.total) {
          this.baseLineStyle.top = waterbox.scrollHeight + 16 + "px";
          this.isPeriod = true;
          this.removeScrollCallback();
        } else {
          this.$emit("bottomEvent",waterbox);
        }
      }
    },
    removeScrollCallback() {
      let ulDom = this.$refs._Water_Box_;
      ulDom.removeEventListener("scroll", this.scrollId);
    },
    throttle(func, wait, vdom) {
      let previous = 0,
        timer = null;
      return function anonymous() {
        let now = +new Date(),
          remaining = wait - (now - previous);
        if (remaining <= 0) {
          clearTimeout(timer);
          timer = null;
          previous = now;
          func.call(this, vdom);
        } else if (!timer) {
          timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            previous = +new Date();
            func.call(this, vdom);
          }, remaining);
        }
      };
    },
  },
};
</script>

<style scoped>
._Water_Box_ {
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}
._Water_Box_:hover {
  overflow-y: overlay;
}
._Water_Box_::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
._Water_Box_::-webkit-scrollbar-track-piece {
  background: transparent;
}
._Water_Box_::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: rgba(222,225,230,0.8);
}
._Water_Box_ ._Water_Cell_Box {
  list-style: none;
  border-radius: 3px;
  position: absolute;
  box-sizing: border-box;
  background-color: #f2f8fe;
  height: auto;
  padding: 0;
  margin: 0;
}

._Water_Box_ .note_txt {
  position: absolute;
  width: 100%;
  text-align: center;
  padding-bottom: 5px;
}
._Water_Box_ .not_yet_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #bbb;
  text-align: center;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}
</style>
>
