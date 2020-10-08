document.getElementById('dogs-list').childNodes.forEach((child) => {
    child.addEventListener('click', () => {
        alert(child.textContent);
    })
})