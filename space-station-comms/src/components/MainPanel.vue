<template>
  <div class="main-panel">
    <h3>Main Panel</h3>
    <div class="h-container h-60">
        <comms-console />
        <control-panel v-show="isReady"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import CommsConsole from '@/components/CommsConsole.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import store from '@/store'

@Component({
  components: {
    CommsConsole,
    ControlPanel
  }
})
export default class MainPanel extends Vue {
  get isReady (): boolean {
    return store.getters.isReady()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
