<template>
<form @submit.prevent @submit="$emit('dog-save', dog)">
    <div class="form-group">
        <label for="dog-name">Name:</label>
        <input type="text" autocomplete="off" minlength="3" maxlength="16" required
            class="form-control" id="dog-name" aria-describedby="name-help"
            v-model="dog.name">
        <small id="name-help" class="form-text text-muted">The name of the dog.</small>
    </div>
    <div class="form-group">
        <label for="dog-age">Age:</label>
        <input type="number" autocomplete="off" min="0" max="16" required
            class="form-control" id="dog-age" aria-describedby="age-help"
            v-model="dog.age">
        <small id="age-help" class="form-text text-muted">The name of the dog.</small>
    </div>
    <div class="form-group">
        <label for="dog-description">Description:</label>
        <textarea class="form-control" name="dog-description" id="dog-description"
            cols="15" rows="5" v-model="dog.description"></textarea>
        <small id="description-help" class="form-text text-muted">Describe the dog in a couple of sentences.</small>
    </div>
    <div>
        <button type="submit" class="btn btn-success">Save</button>
    </div>
</form>
</template>

<script lang="ts">
import { Dog } from "../shared/interfaces";
import { defineComponent, PropType } from "vue";
export default defineComponent({
    name: 'dog-form',
    props: {
        dog: {
            type: Object as PropType<Dog>,
            default: () => {
                return {
                    name: 'Default',
                    age: 0,
                    _id: 1,
                    description: 'Default description'
                }
            }
        }
    }
});
</script>

<style>
</style>