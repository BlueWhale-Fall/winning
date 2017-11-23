<template>
  <init
    :zooms="zooms"
  ></init>
</template>

<script>
  import init from '@/components/Init.vue'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        zooms: 'init/zooms'
      })
    },
    watch: {},
    methods: {},
    beforeCreate() {
      this.$store.dispatch('init/fetchZoomData')
    },
    mounted() {
      console.log('Component mounted');
    },
    components: {
      init
    }
  }
</script>

<style scoped>

</style>
