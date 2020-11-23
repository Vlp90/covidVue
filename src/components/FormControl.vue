<template>
<div>
<h2>Form Control</h2>
    <Select v-model="value" placeholder="Select">
    <Option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </Option>
  </Select>
</div>
</template>

<script>

import { Select, Option } from 'element-ui';
import Vue from 'vue';
Vue.use(Select)
Vue.use(Option)



  export default {
    data() {
      return {
        options: [{
          value: 'Option10',
          label: 'Option10'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
      }
    }
  }
</script>

<style>
/* @import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css"); */


</style>