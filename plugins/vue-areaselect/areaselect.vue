<template>
  <div class="areaselect">
    <el-select v-model="areaVal.provinceScore" placeholder="选择省份" @change="prochange()">
      <el-option v-for="i in prov" :key="i.id" :label="i.name" :value="i.id">
      </el-option>
    </el-select>
    <el-select v-model="areaVal.cityScore" placeholder="选择城市">
      <el-option v-for="i in city" :key="i.id" :label="i.name" :value="i.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { area_data } from './area_data.js'

export default {
  data: () => ({
    prov: "",
    city: "",
    area: {},
    area_data: area_data
  }),
  mounted() {
    this.getarea()
  },
  methods: {
    async getarea() {
      this.area = area_data
      this.prov = this.area.prov.map(({ id, name }) => ({
        id: id,
        name: unescape(name.replace(/\\/g, "%"))
      }))
    },
    prochange() {
      if (typeof this.area.prov == 'undefined') {
        promise (() => {
          this.area = area_data
          this.prov = this.area.prov.map(({ id, name }) => ({
            id: id,
            name: unescape(name.replace(/\\/g, "%"))
          }))
        }).then(() => {
          this.getcity()
        })
      } else {
        this.getcity()
      }
    },
    getcity() {
      if (this.areaVal.provinceScore != '') {
        this.city = this.area.city[this.areaVal.provinceScore].length != 0 ? 
        this.area.city[this.areaVal.provinceScore].map(({ id, name }) => ({
          id: id,
          name: unescape(name.replace(/\\/g, "%"))
        })) : [{
          id: this.areaVal.provinceScore,
          name: `${this.prov.find((a) => a.id == this.areaVal.provinceScore)['name']}`
        }]
        if (this.areaVal.cityScore.substr(0, 2) != this.areaVal.provinceScore.substr(0, 2))
          this.areaVal.cityScore = this.city[0]['id']
      }
    }
  },
  props: ['areaVal']
}
</script>

<style lang="scss">
.areaselect {
  .el-select {
    width: 46%;
    &:first-child {
      margin-right: 5%;
    }
  }
}
</style>