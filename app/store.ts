import { Dog } from '../shared/interfaces'

export default {
    getAll: async() => {
        const response = await fetch('/api/dogs');
        const json = await response.json();
        return json.dogs as Array<Dog>;
    },
    update: async(dog: Dog, originalName: string) => {
        await fetch(`/api/dogs/${originalName}`, {
            method: 'PUT',
            body: JSON.stringify(dog),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}