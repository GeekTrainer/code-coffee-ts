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
    // register modal for dogs
    dogUI.setAttribute('data-toggle', 'modal');
    dogUI.setAttribute('data-target', '#register-modal');
    dogUI.innerText = dog.name;

    dogUI.addEventListener('click', async () => {
        // load the dog from the server
        const result = await fetch(`/api/dogs/${dog.name}`);
        const serverDog = await result.json();
        (document.getElementById('dog-name') as HTMLInputElement).value = serverDog.name;
        (document.getElementById('dog-age') as HTMLInputElement).value = serverDog.age.toString();
        (document.getElementById('dog-description') as HTMLInputElement).value = serverDog.description;
    });

    document.getElementById('dogs-list')!.appendChild(dogUI);
}

document.getElementById('dog-form')!.addEventListener('submit', async (e) => {
    e.preventDefault(); // don't submit
    // get the control/element
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) return; // if not valid, stop

    // load data from form
    const formDog: Dog = {
        name: (document.getElementById('dog-name') as HTMLInputElement).value,
        age: Number.parseInt((document.getElementById('dog-age')  as HTMLInputElement).value),
        description: (document.getElementById('dog-description')  as HTMLInputElement).value,
    };

    // find the dog in our array
    const localDog = dogs.find(d => d.name === formDog.name);

    if(localDog) {
        // found existing item
        // Perform a PUT to update dog
        const serverResponse = await fetch(`/api/dogs/${name}`, {
            method: 'PUT',
            body: JSON.stringify(formDog),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // retrieve JSON response
        const serverDog = await serverResponse.json() as Dog;
        // display new dog in our list
        // to come later
    } else {
        // call server to POST new dog
        const serverResponse = await fetch('/api/dogs', {
            method: 'POST',
            body: JSON.stringify(formDog),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // retrieve JSON response
        const serverDog = await serverResponse.json() as Dog;
        // Add dog to array
        dogs.push(serverDog);
        // display new dog in our list
        displayDog(serverDog);
    }

    // clear the form
    (document.getElementById('dog-name') as HTMLInputElement).value = '';
    (document.getElementById('dog-age') as HTMLInputElement).value = '';
    (document.getElementById('dog-description') as HTMLInputElement).value = '';
});
