<template>
<div>  
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

</div>
</template>

<script>


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
        value: 'Worlwide'
      }
    },
    methods: {
    
    }
  }


</script>

<style>
/* @import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css"); */


</style>