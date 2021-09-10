<template>
  <div class="card">
    <h2 class="card-title">People</h2>
    <div class="card-body">
      <ul v-if="!loading" class="list-group">
        <li v-for="person in people" :key="person.id" class="list-group-item">
          <PersonItemList
            v-bind="person"
            v-on:updatePerson="updatedList($event)"
            v-on:deletePerson="deletedPerson($event)"
            v-on:errorMessage="displayError($event)"
          />
        </li>
        <li class="list-group-item">
          <PersonItemList
            v-bind="{ id: 'new' }"
            v-on:errorMessage="displayError($event)"
            v-on:updatePerson="updatedList($event)"
          />
        </li>
      </ul>
      <div v-if="loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Person from "@/models/person";
import { defineComponent } from "vue";
import { GetPeople } from "../services/people";
import PersonItemList from "./PersonItemList.vue";

export default defineComponent({
  name: "PeopleList",
  emits: ["message"],
  components: {
    PersonItemList,
  },
  data() {
    return { loading: true, people: [] as Person[] };
  },
  methods: {
    displayError(text: string) {
      this.$emit("message", { type: "error", text });
    },
    async getPeople() {
      try {
        this.people = await GetPeople();
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$emit("message", {
          type: "error",
          text: "Failed to retrieve people, retrying in 3 seconds...",
        });
        setTimeout(() => this.getPeople(), 3000);
      }
    },
    deletedPerson(id: string) {
      this.$emit("message", { type: "success", text: "Deleted person" });
      this.people = this.people.filter((p) => p.id !== id);
    },
    updatedList(obj: Person) {
      this.$emit("message", {
        type: "success",
        text: obj.id === "new" ? "Created person" : "Updated person",
      });
      if (obj.id === "new") {
        const id = this.people.length
          ? `${Number(this.people[this.people.length - 1].id) + 1}`
          : "1";
        this.people.push({ ...obj, id });
      } else {
        this.people = this.people.map((p: Person) =>
          p.id === obj.id ? obj : p
        );
      }
    },
  },
  created() {
    this.getPeople();
  },
});
</script>
