import { Dog } from '../shared/interfaces';

const dogs = new Array<Dog>();

main();

async function main() {
    await loadDogs();
    displayDogs();
}

async function loadDogs() {
    const response = await fetch('/api/dogs');
    const json = await response.json();
    for (const dog of json.dogs as Array<Dog>) {
        dogs.push(dog);
    }
}

function displayDogs() {
    for(const dog of dogs) {
        const dogUI = document.createElement('a');
        dogUI.href = '#';
        dogUI.classList.add('list-group-item');
        dogUI.classList.add('list-group-item-action');
        dogUI.innerText = dog.name;

        dogUI.addEventListener('click', () => {
            alert(dog.name);
        })

        document.getElementById('dogs-list').appendChild(dogUI);
    }
}
