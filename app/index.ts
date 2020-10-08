interface Dog {
    name: string;
    age: number;
}
const dogs: Array<Dog> = [
    { name: 'Sammy', age: 2 },
    { name: 'Dyson', age: 6 },
    { name: 'Roscoe', age: 15 },
];

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
