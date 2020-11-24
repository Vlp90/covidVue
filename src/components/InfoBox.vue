<template>
  <el-card  class="infoBox infoBox--selected ">
      <div @click="test">
    <h4 class='infoBox__title'>{{ title }}</h4>
    <h1 class='infoBox__cases' >{{evolution}}</h1>
    <h5 class='infoBox__total'><strong>Total:</strong> {{total}}</h5>
      </div>
  </el-card>
</template>

<script>


export default {
  props: ['title', 'evolution', 'total'],
    data(){
        return {

        }
    },
    methods: {
        test(e){
            console.log(e)
        }
    }
};
</script>

<style scoped>

.infoBox__title {
    color: #6c757d;
        font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
}
.infoBox {
    flex: 1;
    cursor: pointer;
}

.infoBox:not(:last-child) {
    margin-right: 15px;
}

@media (max-width: 500px) {
    .infoBox {
      margin-right: 0!important;
      
  
    }

    .infoBox:not(:last-child){
        margin-bottom: 15px;
    }
  }



/* .infoBox--selected {
    border-top: 10px solid greenyellow;
} */

.infoBox--red {
      border-top: 10px solid red;
}

.infoBox--black {
   border-top: 10px solid black;
}

.infoBox__cases {

    color: lightgreen !important;
    font-weight: 700;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
}

.infoBox__cases--red {
    color: #cc1034 !important;
}

.infoBox__cases--black {
    color: black !important;
}


.infoBox__total {
    color: #6c757d;
    font-weight: 400 !important;
    font-size: 0.8rem !important;
    margin-top: 15px !important;
}

</style>
