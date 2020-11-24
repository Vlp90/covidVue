<template>
<div>  
  <el-select @change="handleChange" v-model="value" placeholder="Select">
    <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
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
    props:["title"],
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
    computed() {
    // console.log(this.value)
    },

    methods: {
      handleChange(e) {
        // if(e.target.options.selectedIndex > -1) {
        //     console.log(e.target.options[e.target.options.selectedIndex].dataset.foo)
        // }
    // }
    console.log(e)
    }
    
  }
    }



</script>

<style>

</style>