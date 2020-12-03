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
    },
    get: async(name: string): Promise<Dog> => {
        const response = await fetch(`/api/dogs/${name}`);
        const json = await response.json();
        return json as Dog;
    }
}