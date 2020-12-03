<template>
  <section class="list-group col">
    <router-link href="#" class="list-group-item list-group-item-action"
      v-for="dog of dogs" :key="dog._id"
      :to="{ name: 'details', params: { name: dog.name }}"
    >
      {{ dog.name }}
    </router-link>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Dog } from '../shared/interfaces';
import Store from './store';
import DogForm from './dog-form.vue';
export default defineComponent({
    name: 'dog-list',
    data() {
        return {
            dogs: [] as Array<Dog>,
        }
    },
    async created() {
        for (const dog of await Store.getAll()) {
            this.dogs.push(dog);
        }
    },
});
</script>

<style>
</style>