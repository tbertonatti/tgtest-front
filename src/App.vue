<template>
  <PeopleList v-on:message="displayMessage($event)" />
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      id="liveToast"
      class="toast hide"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto text-white">Bootstrap</strong>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PeopleList from "./components/PeopleList.vue";
import MessageNotification from "./models/message";
import { Toast } from "bootstrap";
// eslint-disable-next-line
var toastEl: any;

export default defineComponent({
  name: "App",
  components: {
    PeopleList,
  },
  methods: {
    displayMessage(message: MessageNotification) {
      toastEl.hide();
      const toastDiv = document.querySelector(".toast");
      const toastTitle = toastDiv?.querySelector(".me-auto");
      const toastHeader = toastDiv?.querySelector(".toast-header");
      const toastBody = toastDiv?.querySelector(".toast-body");
      if (toastTitle) {
        toastTitle.innerHTML = message.type;
      }
      if (toastBody) {
        toastBody.innerHTML = message.text;
      }
      if (toastHeader) {
        toastHeader.classList.remove("bg-danger");
        toastHeader.classList.remove("bg-success");
        if (message.type === "error") {
          toastHeader.classList.add("bg-danger");
        } else {
          toastHeader.classList.add("bg-success");
        }
      }
      setTimeout(() => toastEl.show(), 600);
    },
  },
  mounted() {
    // eslint-disable-next-line
    const el: any = document.querySelector(".toast");
    toastEl = new Toast(el, { delay: 2000, autohide: true });
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
