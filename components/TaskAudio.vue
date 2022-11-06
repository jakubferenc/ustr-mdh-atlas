<template lang="pug">
.task.task__audio.ui-widget
  .columns.is-multiline
    .column.buttons-container()
      a.button.audio-button.recording-button(
        @click="toggleRecording"
        :class="{'is-active': isRecording}"
        href="#"
      )
        i(class="fa-solid fa-microphone")
      a.button.audio-button(
        v-if="isRecording"
        @click="toggleRecording"
        href="#"
      )
        i(
          class="fa-solid fa-stop"
        )
    .column.status-info(v-if="isRecording")
      h3 Nahrávám...
  .columns.is-multiline
    .column
      h2 Vaše nahrávky
      .recording-item(v-for="(recording, index) in audioRecordings" :key="index")
        .recording-item__player
          <audio controls>
            <source :src="recording.audioUrl" type="audio/ogg">
            | Your browser does not support the audio tag.
          </audio>
        .recording-item__actions
          a.delete(href="#" @click="deleteRecording(index)") Odstranit nahrávku
</template>


<style lang="sass" scoped>

  @import "~/assets/scss/bulma"
  @import "~/assets/scss/variables"

  $fa-font-path : "~@fortawesome/fontawesome-free/webfonts"
  @import "~@fortawesome/fontawesome-free/scss/fontawesome.scss"
  @import "~@fortawesome/fontawesome-free/scss/solid"
  @import "~@fortawesome/fontawesome-free/scss/regular"

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

    i
      color: #000
      font-size: 4rem

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

  },
  watch: {

    audioRecordings(newVal, oldVal) {
      this.updateStore();
    }

  },
  methods: {

    deleteRecording(itemToRemoveIndex) {

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
              const audioBlob = new Blob(this.audioChunks[chunkId], { type: "audio/ogg; codecs=opus" });
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
