<template>
  <div class="theme-block">
    <div class="title-theme">
      {{ indexFrom }}
    </div>
  </div>
</template>

<script>


export default {
  props: ['index'],
  data () {
    return {
      indexFrom: this.index
    }
  }
}
</script>

<style lang="sass" scoped> 

    @import './ThemeBlock.sass'
    
</style>

