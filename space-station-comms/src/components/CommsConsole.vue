<template>
  <div class="comms-console">
    <p>{{ data.title }}</p>
    <div class="console">
      <textarea readonly="true"
        v-model="data.consoleText"/>
      <div class="input-bar">
        <input type="text"
          autocomplete="false"
          autofocus="true"
          v-model="data.inputText"
          v-on:keyup="handleKey"/>
          <div class="submit"
            id="send"
            @click="sendMessage">
            Send
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CommsConsole extends Vue {
  @Prop() private spaceStationCommsText!: string;

  private data = {
    title: 'Space Station Comms Link:',
    inputText: '',
    consoleText: `--! Channel opened @${new Date().toUTCString()}...\n\n`
  }

  private sendMessage () {
    this.insertText(this.data.inputText)
  }

  private handleKey (e: KeyboardEvent) {
    if (e.code === 'Enter') {
      this.sendMessage()
    }
  }

  private insertText (data: string, user = 'MCH') {
    if (data.length) {
      this.data.consoleText += `${user}$ ${data}\n`
      this.data.inputText = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
