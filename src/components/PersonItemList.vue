<template>
  <div class="row">
    <div class="col-sm-11 row">
      <div class="mb-3 row col-lg-3 col-sm-6">
        <label :for="`name-${id}`" class="col-sm-5 col-form-label">Name:</label>
        <div class="col-sm-7">
          <input
            :id="`name-${id}`"
            class="form-control"
            placeholder="Name"
            :disabled="saving || (!editing && id !== 'new')"
            v-model="personObj.name"
          />
        </div>
      </div>
      <div class="mb-3 row col-lg-3 col-sm-6">
        <label :for="`lastname-${id}`" class="col-sm-5 col-form-label"
          >Lastname:</label
        >
        <div class="col-sm-7">
          <input
            placeholder="Lastname"
            :id="`lastname-${id}`"
            class="form-control"
            :disabled="saving || (!editing && id !== 'new')"
            v-model="personObj.lastName"
          />
        </div>
      </div>
      <div class="mb-3 row col-lg-3 col-sm-6">
        <label :for="`email-${id}`" class="col-sm-5 col-form-label"
          >Email:</label
        >
        <div class="col-sm-7">
          <input
            placeholder="Email"
            :id="`email-${id}`"
            class="form-control"
            type="email"
            :disabled="saving || (!editing && id !== 'new')"
            v-model="personObj.email"
          />
        </div>
      </div>
      <div class="mb-3 row col-lg-3 col-sm-6">
        <label :for="`phone-${id}`" class="col-sm-5 col-form-label"
          >Phone:</label
        >
        <div class="col-sm-7">
          <input
            placeholder="Phone"
            :id="`phone-${id}`"
            class="form-control"
            :disabled="saving || (!editing && id !== 'new')"
            type="number"
            v-model="personObj.phone"
          />
        </div>
      </div>
    </div>
    <div class="col-sm-1">
      <button
        title="Edit"
        class="btn btn-sm btn-primary"
        type="button"
        :disabled="saving"
        v-if="!editing && id !== 'new'"
        v-on:click="edit"
      >
        ✎
      </button>
      <button
        title="Delete"
        class="btn btn-sm btn-danger"
        type="button"
        :disabled="saving"
        v-if="!editing && id !== 'new'"
        v-on:click="deleteP"
      >
        ⌫
      </button>
      <button
        title="Create"
        class="btn btn-sm btn-success"
        type="button"
        :disabled="saving"
        v-if="id === 'new'"
        v-on:click="create"
      >
        +
      </button>
      <button
        title="Update"
        class="btn btn-sm btn-success"
        type="button"
        :disabled="saving"
        v-if="id !== 'new' && editing"
        v-on:click="update"
      >
        ✓
      </button>
      <button
        title="Cancel"
        class="btn btn-sm btn-danger"
        type="button"
        v-if="id !== 'new' && editing"
        :disabled="saving"
        v-on:click="edit"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Person from "@/models/person";
import { CreatePerson, DeletePerson, UpdatePerson } from "@/services/people";
import { defineComponent } from "vue";

// TODO: Add form validators
const parseForm = (formObj: Person): Person => {
  const finalPerson: Person = JSON.parse(JSON.stringify(formObj));
  finalPerson.phone =
    typeof finalPerson.phone === "number" ? finalPerson.phone : 0;
  return finalPerson;
};

export default defineComponent({
  name: "PersonItemList",
  emits: ["updatePerson", "deletePerson", "errorMessage"],
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
    async deleteP() {
      this.saving = true;
      try {
        await DeletePerson(String(this.id));
        this.$emit("deletePerson", this.id);
        this.saving = false;
      } catch (error) {
        this.$emit("errorMessage", "Failed to delete person");
        this.saving = false;
        console.log(error);
      }
    },
    async update() {
      this.saving = true;
      try {
        const formData = parseForm(this.personObj);
        await UpdatePerson(String(this.id), formData);
        this.$emit("updatePerson", {
          id: this.id,
          ...formData,
        });
        this.saving = false;
        this.editing = !this.editing;
      } catch (error) {
        this.$emit("errorMessage", "Failed to update person");
        this.saving = false;
        console.log(error);
      }
    },
    async create() {
      this.saving = true;
      try {
        const formData = parseForm(this.personObj);
        await CreatePerson(formData);
        this.$emit("updatePerson", {
          id: "new",
          ...formData,
        });
        this.saving = false;
        this.personObj.name = "";
        this.personObj.lastName = "";
        this.personObj.email = "";
        this.personObj.phone = 0;
      } catch (error) {
        this.$emit("errorMessage", "Failed to create person");
        this.saving = false;
        console.log(error.message);
      }
    },
  },
});
</script>
