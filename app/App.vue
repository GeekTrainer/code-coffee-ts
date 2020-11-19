<template>
  <section class="row">
    <section class="list-group col">
        <a href="#" class="list-group-item list-group-item-action"
                v-for="dog of dogs" :key="dog._id" @click="editDogClick(dog)">
            {{ dog.name }}
        </a>
    </section>
    <section class="col">
        <dog-form :dog="{...editDog}" @dog-save="saveDog"></dog-form>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Dog } from '../shared/interfaces';
import Store from './store';
import DogForm from './dog-form.vue';
export default defineComponent({
    name: 'App',
    data() {
        return {
            dogs: [] as Array<Dog>,
            editDog: {
                name: 'Component',
                age: 6,
                description: 'Default dog'
            } as Dog
        }
    },
    async created() {
        for (const dog of await Store.getAll()) {
            this.dogs.push(dog);
        }
    },
    components: {
        DogForm
    },
    methods: {
        editDogClick(dog: Dog) {
            this.editDog = {...dog};
        },
        async saveDog(dog: Dog) {
            await Store.update(dog, this.editDog.name);
            const dogIndex = this.dogs.findIndex(d => d._id === dog._id);
            this.dogs[dogIndex] = {...dog};
        }
    }
});
</script>

<style>
</style>