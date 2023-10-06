const form = document.querySelector('form');
const type = document.querySelector('#type');
const brand = document.querySelector('#brand');
const resultat = document.querySelector('#resultat');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`task04.php?type=${type.value}&brand=${brand.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.success) {
                resultat.innerHTML = 'Created successfully';
                resultat.classList.remove('alert-danger');
                resultat.classList.add('alert-success');
                resultat.classList.add('text-white');
            } else {
                resultat.innerHTML = 'Error creating';
                resultat.classList.remove('alert-success');
                resultat.classList.add('alert-danger');
                resultat.classList.add('text-white');
            }

    })
});
