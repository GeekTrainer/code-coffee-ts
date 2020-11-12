import { Dog } from '../shared/interfaces.d';

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
        displayDog(dog);
    }
}

function displayDog(dog: Dog) {
    const dogUI = document.createElement('a');
    dogUI.href = '#';
    dogUI.classList.add('list-group-item');
    dogUI.classList.add('list-group-item-action');
    dogUI.innerText = dog.name;

    dogUI.addEventListener('click', () => {
        alert(dog.name);
    });

    document.getElementById('dogs-list').appendChild(dogUI);
}

document.getElementById('dog-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // don't submit

    // get the control/element
    const form = e.target as HTMLFormElement;

    if (!form.checkValidity()) return; // if not valid, stop
    // load data from form
    const clientDog = {
        name: (document.getElementById('dog-name') as HTMLInputElement).value,
        age: (document.getElementById('dog-age')  as HTMLInputElement).value
    };

    console.log(clientDog);

    // call server to POST new dog
    const serverResponse = await fetch('/api/dogs', {
        method: 'POST',
        body: JSON.stringify(clientDog),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // retrieve JSON response
    const serverDog = await serverResponse.json() as Dog;

    // clear the form
    (document.getElementById('dog-name') as HTMLInputElement).value = '';
    (document.getElementById('dog-age') as HTMLInputElement).value = '';

    // display new dog in our list
    displayDog(serverDog);
});
