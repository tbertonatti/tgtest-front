<template>
  <div v-if="!editing && id !== 'new'">
    <span>ID: {{ id }}</span>
    <span>Name: {{ name }}</span>
    <span>Lastname: {{ lastName }}</span>
    <span>Email: {{ email }}</span>
    <span>Phone: {{ phone }}</span>
    <button :disabled="saving" v-if="!editing" v-on:click="edit">edit</button>
    <button :disabled="saving" v-if="!editing" v-on:click="deleteP">
      delete
    </button>
  </div>
  <div v-if="editing || id === 'new'">
    <div>
      <label>Name:</label>
      <input :disabled="saving" v-model="personObj.name" />
    </div>
    <div>
      <label>Lastname:</label>
      <input :disabled="saving" v-model="personObj.lastName" />
    </div>
    <div>
      <label>Email:</label>
      <input :disabled="saving" v-model="personObj.email" />
    </div>
    <div>
      <label>Phone:</label>
      <input :disabled="saving" type="number" v-model="personObj.phone" />
    </div>
    <button v-if="id !== 'new'" :disabled="saving" v-on:click="edit">
      Cancel
    </button>
    <button :disabled="saving" v-if="id === 'new'" v-on:click="create">
      create
    </button>
    <button :disabled="saving" v-if="id !== 'new'" v-on:click="update">
      update
    </button>
  </div>
</template>

<script lang="ts">
import Person from "@/models/person";
import { CreatePerson, DeletePerson, UpdatePerson } from "@/services/people";
import { defineComponent } from "vue";

const parseForm = (formObj: Person) => JSON.parse(JSON.stringify(formObj));

export default defineComponent({
  name: "PersonItemList",
  emits: ["updatePerson", "deletePerson"],
  props: {
    id: String,
    name: String,
    lastName: String,
    email: String,
    phone: Number,
  },
  data() {
    return {
      personObj: {
        name: this.name || "",
        lastName: this.lastName || "",
        email: this.email || "",
        phone: this.phone || 0,
      },
      editing: false,
      saving: false,
    };
  },
  methods: {
    edit() {
      this.editing = !this.editing;
    },
    deleteP() {
      this.saving = true;
      DeletePerson(String(this.id))
        .then(() => {
          this.$emit("deletePerson", this.id);
          this.saving = false;
        })
        .catch(() => {
          this.saving = false;
        });
    },
    update() {
      this.saving = true;
      UpdatePerson(String(this.id), parseForm(this.personObj))
        .then(() => {
          this.$emit("updatePerson", {
            id: this.id,
            ...parseForm(this.personObj),
          });
          this.saving = false;
          this.editing = !this.editing;
        })
        .catch(() => {
          this.saving = false;
        });
    },
    create() {
      this.saving = true;
      CreatePerson(parseForm(this.personObj))
        .then(() => {
          this.$emit("updatePerson", {
            id: "new",
            ...parseForm(this.personObj),
          });
          this.saving = false;
          this.personObj.name = "";
          this.personObj.lastName = "";
          this.personObj.email = "";
          this.personObj.phone = 0;
        })
        .catch(() => {
          this.saving = false;
        });
    },
  },
});
</script>
