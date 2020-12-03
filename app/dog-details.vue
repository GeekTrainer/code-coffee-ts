<template>
    <section class="row">
        <section class="col-3">
            <strong>Name:</strong>
        </section>
        <section class="col-9">
            {{ dog.name }}
        </section>
    </section>
    <section class="row">
        <section class="col-3">
            <strong>Age:</strong>
        </section>
        <section class="col-9">
            {{ dog.age }}
        </section>
    </section>
    <section class="row">
        <section class="col-3">
            <strong>Description:</strong>
        </section>
        <section class="col-9">
            {{ dog.description }}
        </section>
    </section>
</template>

<script lang="ts">
import { Dog } from '../shared/interfaces';
import Store from './store'
export default {
    data() {
        return {
            dog: {
                name: '',
                age: 0,
                description: ''
            } as Dog
        }
    },
    props: {
        name: {
            type: String,
            default: 'placeholder'
        }
    },
    async mounted() {
        // executes when this component is mounted or loaded with data
        this.dog = await Store.get(this.name);
    }
}
</script>

<style>

</style>