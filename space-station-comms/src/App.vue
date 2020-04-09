<template>
  <div id="app">
    <header>
      <div>
        <img :alt="header.logo.alt" src="./assets/nasa.png" />
        <h1>{{ header.title }}</h1>
      </div>
    </header>
    <main>
      <main-panel />
    </main>
    <footer>
      <p>
        Remember
        <span>{{ footer.msg }}</span>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MainPanel from '@/components/MainPanel.vue'
import store from '@/store'

@Component({
  components: {
    MainPanel
  }
})
export default class App extends Vue {
  constructor () {
    super()
    store.dispatch('fetchCrewData')
  }

  private header = {
    title: 'MCH - Mission Control Hub',
    logo: {
      src: './assets/nasa.png',
      alt: 'Agency logo'
    }
  };

  private footer = {
    msg: 'Never leave a man behind!'
  };
}
</script>

<style lang="scss">
@import './styles/global.scss';
</style>
