<template>
  <div v-if="!loading">
    <PersonItemList
      v-for="person in people"
      :key="person.id"
      v-bind="person"
      v-on:updatePerson="updatedList($event)"
      v-on:deletePerson="deletedPerson($event)"
    />
    <PersonItemList
      v-bind="{ id: 'new' }"
      v-on:updatePerson="updatedList($event)"
    />
  </div>
  <div v-if="loading">loading...</div>
</template>

<script lang="ts">
import Person from "@/models/person";
import { defineComponent } from "vue";
import { GetPeople } from "../services/people";
import PersonItemList from "./PersonItemList.vue";

export default defineComponent({
  name: "PeopleList",
  components: {
    PersonItemList,
  },
  data() {
    return { loading: true, people: [] as Person[] };
  },
  methods: {
    deletedPerson(id: string) {
      this.people = this.people.filter((p) => p.id !== id);
    },
    updatedList(obj: Person) {
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
    GetPeople()
      .then((data) => {
        this.loading = false;
        this.people = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>
