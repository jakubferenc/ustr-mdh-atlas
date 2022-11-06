<template lang="pug">
.task.task__audio.ui-widget
  .columns.is-multiline
    .column.buttons-container()
      a.button.audio-button.recording-button(
        @click="toggleRecording"
        :class="{'is-active': isRecording}"
        href="#"
      )
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>
      a.button.audio-button(
        v-if="isRecording"
        @click="toggleRecording"
        href="#"
      )
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
    .column.status-info(v-if="isRecording")
      h3 Nahrávám...
  .columns.is-multiline
    .column
      h2 Vaše nahrávky
      .recording-item(v-for="(recording, index) in audioRecordings" :key="index")
        .recording-item__player
          <audio controls>
            <source :src="recording.audioUrl" type="audio/mpeg">
            | Your browser does not support the audio tag.
          </audio>
        .recording-item__actions
          a.delete(href="#" @click="deleteRecording(index)") Odstranit nahrávku
</template>


<style lang="sass" scoped>
  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

  .recording-item
    margin-bottom: 1rem
  .recording-item__actions
    .delete
      color: indianred
  .status-info
    color: indianred
  .buttons-container
    display: flex
    justify-content: flex-start
    flex-direction: row
    column-gap: 2rem
  .button
    background-color: #efefef
    &, &:hover
      text-decoration: none
  .source
    font-style: italic
    font-size: .9rem

  .task__audio
    margin-top: 1rem

  .audio-button.button
    width: 100px
    height: 100px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

    &.is-active
      background-color: indianred

    svg
      width: 60%

</style>

<script>
export default {
  props: ['Id'],
  computed: {

  },

  data() {

    return {
      isRecording: false,
      audioChunks: {},
      currentMediaRecorder: null,
      timeLimit: 5000,
      audioRecordings: []
    }
  },
  mounted() {

  },

  computed: {

    mimeType() {


    }

  },
  watch: {

    audioRecordings(newVal, oldVal) {
      this.updateStore();
    }

  },
  methods: {

    deleteRecording(itemToRemoveIndex) {

      const confirm = confirm('Opravdu chcete nahrávku vymazat?');

      if (!confirm) return;

      this.audioRecordings = this.audioRecordings.filter((item, index) => index !== itemToRemoveIndex);
      return false;

    },
    toggleRecording() {
      if (!this.isRecording) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    },
    stopRecording() {

      this.currentMediaRecorder.stop();
      this.isRecording = false;

    },
    startRecording() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {

            this.isRecording = true;

            this.currentMediaRecorder = new MediaRecorder(stream);
            this.currentMediaRecorder.start();

            const chunkId = new Date().getUTCMilliseconds();
            this.audioChunks[chunkId] = [];
            this.currentMediaRecorder.addEventListener("dataavailable", event => {
              console.log("recorder recording");
              this.audioChunks[chunkId].push(event.data);
            });

            this.currentMediaRecorder.addEventListener("stop", () => {
              console.log("recorder stopped");
              const audioBlob = new Blob(this.audioChunks[chunkId], { type: "audio/mpeg" });
              const audioUrl = URL.createObjectURL(audioBlob);
              // const audioObject = new Audio(audioUrl);

              // const title = prompt('Zadejte pracovní název nahrávky');

              this.audioRecordings.push({
                // title,
                id: `${this.Id}_${this.audioRecordings.length+1}`,
                audioUrl,
                // audioObject,
              });
            });

          })
          // Error callback
          .catch((err) => {
            console.error(`The following getUserMedia error occurred: ${err}`);
          });

      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    },

    updateStore() {
      this.$store.dispatch("setNovyObjekt", {
        [this.Id]: [...this.audioRecordings],
      });
    },
  }

}
</script>
