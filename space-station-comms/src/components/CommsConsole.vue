<template>
  <div class="comms-console">
    <p>{{ data.title }}</p>
    <div class="console">
      <textarea ref="textArea"
        readonly="true"
        v-model="data.consoleText"
        @change="autoScroll"/>
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
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'

interface Buffers {
  user: string[];
  sim: string[];
}

@Component
export default class CommsConsole extends Vue {
  constructor () {
    super()
    store.commit('openCommsChannel', this.handleMessage)
  }

  private busy = false
  private buffers: Buffers = {
    user: [],
    sim: []
  }

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

  private addLetter = (i: number, data: string, pauseDuration: number, callback: () => void) => {
    if (i < data.length) {
      this.data.consoleText += data[i]
      setTimeout(this.addLetter, pauseDuration,
        i + 1,
        data,
        pauseDuration,
        callback
      )
    } else {
      callback()
    }
  }

  private insertText = (data: string, user = 'MCH') => {
    if (this.busy) {
      const bufferType = (user === 'MCH') ? 'user' : 'sim'
      this.buffers[bufferType].push(data)
    } else {
      this.insertLine(data, user)
    }
  }

  private insertLine = (data: string | undefined, user = 'MCH') => {
    this.busy = true
    if (data !== undefined && data.length) {
      this.data.consoleText += `<${user}>\t`
      this.addLetter(0, data, 10, () => {
        this.data.consoleText += '\n'
        if (user === 'MCH') {
          this.data.inputText = ''
        }
        setTimeout(this.autoScroll, 0)
        // check if there's user input waiting, if not then is there sim input waiting?
        const nextBuffer = (this.buffers.user.length) ? 'user' : 'sim'
        // if we have lines waiting to be written to the console then we should write those next
        if (this.buffers[nextBuffer].length) {
          const nextLine = this.buffers[nextBuffer].shift()
          this.insertLine(nextLine, (nextBuffer === 'user') ? 'MCH' : 'ISS')
        } else {
          this.busy = false
        }
      })
    }
  }

  private autoScroll () {
    const textArea = document.querySelector('textarea') as HTMLElement | null
    if (textArea !== null) {
      textArea.scrollTop = textArea.scrollHeight
    }
  }

  private handleMessage (msg: string) {
    this.insertText(msg, 'ISS')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
