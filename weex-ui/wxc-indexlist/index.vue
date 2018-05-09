<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/02. -->
<!-- Update by Tw93 on 17/10/13. -->
<!--A index list. -->

<template>
<div>
  <main id="indexlistScrollDom" class="absolute top0 bottom0 width100 scroll-y height100" style="z-index: 100">
    <section v-for="(v,i) in formatList" :key="i" :ref="'index-item-title-' + v.title">
      <div v-if="!onlyShowList" class="lineheight20" style="padding: 12px 15px 8px 15px">{{v.title}}</div>
      <div v-if="v.type && v.type === 'group' && !onlyShowList" class="ts-bgcolor-white" style="padding: 11px 50px 11px 15px">
        <checker v-for="(group,index) in v.data" :key="index" default-item-class="keywordOption">
          <checker-item v-for="(item,j) in group" :key="j" :value="item.name" @click.native="itemClicked(item)">{{item.name}}</checker-item>
        </checker>
      </div>
      <checker v-if="v.type ==='list'" class="ts-bgcolor-white" style="padding: 11px 50px 11px 15px" default-item-class="keywordOption">
        <checker-item v-for="(item,j) in v.data" :key="j" :value="item.name" @click.native="itemClicked(item)">{{item.name}}</checker-item>
      </checker>
    </section>
  </main>
  <nav v-if="showIndex && !onlyShowList" class="fixed right0 translateY paddingX5 textAlignCenter the-color-blue fontsize-2" style="z-index: 101">
    <li v-for="(item,index) in formatList" :key="index" @click="go2Key(item.title)">{{item.title}}</li>
  </nav>
</div>
</template>

<script>
import * as Format from './format';
import { Checker, CheckerItem } from 'vux'
export default {
  components: {
    Checker,
    CheckerItem
  },
  props: {
    normalList: {
      type: Array,
      default: () => ([])
    },
    onlyShowList: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    hotListConfig: {
      type: Object,
      default: () => ({})
    },
    // 城市选择子组件 特殊情况支持
    cityLocationConfig: {
      type: Object,
      default: () => ({})
    },
    headerStyle: {
      type: Object,
      default: () => ({})
    },
    navStyle: {
      type: Object,
      default: () => ({})
    },
    navTextStyle: {
      type: Object,
      default: () => ({})
    },
    popStyle: {
      type: Object,
      default: () => ({})
    },
    popTextStyle: {
      type: Object,
      default: () => ({})
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    itemTextStyle: {
      type: Object,
      default: () => ({})
    },
    itemDescStyle: {
      type: Object,
      default: () => ({})
    },
    groupWrapStyle: {
      type: Object,
      default: () => ({})
    },
    groupItemStyle:{
      type: Object,
      default: () => ({})
    },
    groupItemTextStyle:{
      type: Object,
      default: () => ({})
    },
    groupItemDescStyle:{
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formatList () {
      const { normalList, hotListConfig, cityLocationConfig } = this;
      return Format.totalList(normalList, hotListConfig, cityLocationConfig);
    }
  },
  data: () => ({
  }),
  methods: {
    itemClicked (item) {
      this.$emit('wxcIndexlistItemClicked', item);
    },
    go2Key (key) {
      const keyEl = this.$refs['index-item-title-' + key][0];
      if(keyEl) {
        // let heightDiff = keyEl.offsetTop - document.getElementById('indexlistScrollDom').clientHeight - keyEl.clientHeight - 10
        // if(heightDiff > 0) {
        //   let cssText = 'padding-bottom: ' + heightDiff + 'px'
        //   document.getElementById('indexlistScrollDom').setAttribute('style', cssText)
        // } else {
        //   let cssText = 'padding-bottom: 0'
        //   document.getElementById('indexlistScrollDom').setAttribute('style', cssText)
        // }
        this.$vux.toast.show({
          type: 'text',
          text: key,
          position: 'middle',
          width: '3.5em'
        })
        document.getElementById('indexlistScrollDom').scrollTop = keyEl.offsetTop
      }
    }
  }
}
</script>
