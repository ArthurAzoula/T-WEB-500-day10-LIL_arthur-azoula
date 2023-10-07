// Error codes
const TYPE_NOT_ENOUGHT_CHARACTERS = 1;
const TYPE_TOO_MANY_CHARACTERS = 2;
const TYPE_NON_ALPHABETICAL_CHARACTERS = 3;

const BRAND_NOT_ENOUGHT_CHARACTERS = 4;
const BRAND_TOO_MANY_CHARACTERS = 5;
const BRAND_INVALID_CHARACTERS = 6;

const form = document.querySelector('form');
const type = document.querySelector('#type');
const brand = document.querySelector('#brand');
const resultat = document.querySelector('#resultat');
const ultype = document.querySelector('#check_type');
const ulbrand = document.querySelector('#check_brand');

const submitbutton = document.querySelector('div button');

let isTypeValid = false;
let isBrandValid = false;

type.addEventListener('keyup', (e) => {
    let typeValue = e.currentTarget.value;
    typeValue = typeValue.trim();
    if (typeValue.length > 0) {
        ultype.classList.remove('d-none');
    } else {
        ultype.classList.add('d-none');
    }
    const typeError = checkType(typeValue);
    if (typeError.includes(TYPE_NOT_ENOUGHT_CHARACTERS)) {
        ultype.children[0].classList.add('text-danger');
        ultype.children[0].classList.remove('text-success')
    } else {
        ultype.children[0].classList.remove('text-danger');
        ultype.children[0].classList.add('text-success');
    }
    if (typeError.includes(TYPE_TOO_MANY_CHARACTERS)) {
        ultype.children[1].classList.add('text-danger');
        ultype.children[1].classList.remove('text-success');
    } else {
        ultype.children[1].classList.remove('text-danger');
        ultype.children[1].classList.add('text-success');
    }
    if (typeError.includes(TYPE_NON_ALPHABETICAL_CHARACTERS)) {
        ultype.children[2].classList.add('text-danger');
        ultype.children[2].classList.remove('text-success');
    } else {
        ultype.children[2].classList.remove('text-danger');
        ultype.children[2].classList.add('text-success');
    }

    if (typeError.includes(TYPE_NOT_ENOUGHT_CHARACTERS) || typeError.includes(TYPE_TOO_MANY_CHARACTERS) || typeError.includes(TYPE_NON_ALPHABETICAL_CHARACTERS)) {
        isTypeValid = false;
    } else {
        isTypeValid = true;
    }

});

brand.addEventListener('keyup', (e) => {
    let brandValue = e.currentTarget.value;
    brandValue = brandValue.trim();
    if (brandValue.length > 0) {
        ulbrand.classList.remove('d-none');
    } else {
        ulbrand.classList.add('d-none');
    }
    const brandError = checkBrand(brandValue);
    if (brandError.includes(BRAND_NOT_ENOUGHT_CHARACTERS)) {
        ulbrand.children[0].classList.add('text-danger');
        ulbrand.children[0].classList.remove('text-success');
    } else {
        ulbrand.children[0].classList.remove('text-danger');
        ulbrand.children[0].classList.add('text-success');
    }
    if (brandError.includes(BRAND_TOO_MANY_CHARACTERS)) {
        ulbrand.children[1].classList.add('text-danger');
        ulbrand.children[1].classList.remove('text-sucess');
    } else {
        ulbrand.children[1].classList.remove('text-danger');
        ulbrand.children[1].classList.add('text-success');
    }
    if (brandError.includes(BRAND_INVALID_CHARACTERS)) {
        ulbrand.children[2].classList.add('text-danger');
        ulbrand.children[2].classList.remove('text-success');
    } else {
        ulbrand.children[2].classList.remove('text-danger');
        ulbrand.children[2].classList.add('text-success');
    }

    if (brandError.includes(BRAND_NOT_ENOUGHT_CHARACTERS) || brandError.includes(BRAND_TOO_MANY_CHARACTERS) || brandError.includes(BRAND_INVALID_CHARACTERS)) {
        isBrandValid = false;
    } else {
        isBrandValid = true;
    }

    
});


// Function to check if the "type" input is valid
const checkType = (typeValue) => {
    resErrors = [];
    if (typeValue.length < 3) {
         resErrors.push(TYPE_NOT_ENOUGHT_CHARACTERS);
    } else if (typeValue.length > 10) {
        resErrors.push(TYPE_TOO_MANY_CHARACTERS);
    } else if (!/^[a-zA-Z\-]+$/.test(typeValue)) {
        resErrors.push(TYPE_NON_ALPHABETICAL_CHARACTERS);
    }
    return resErrors; // Type is valid
};

// Function to check if the "brand" input is valid
const checkBrand = (brandValue) => {
    resErrors = [];
    if (brandValue.length < 2) {
        resErrors.push(BRAND_NOT_ENOUGHT_CHARACTERS);
    } else if (brandValue.length > 20) {
        resErrors.push(BRAND_TOO_MANY_CHARACTERS);
    } else if (!/^[a-zA-Z0-9\-&]+$/.test(brandValue)) {
        resErrors.push(BRAND_INVALID_CHARACTERS);
    }
    return resErrors; 
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isTypeValid && isBrandValid) {
        fetch(`task04.php?type=${type.value}&brand=${brand.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    resultat.textContent = 'Your data is valid';
                    resultat.classList.remove('alert-danger');
                    resultat.classList.add('alert-success');
                    resultat.classList.add('text-white');
                    brand.value = '';
                    type.value = '';
                    ulbrand.classList.add('d-none');
                    ultype.classList.add('d-none');
                } else {
                    resultat.textContent = result.error;
                    resultat.classList.remove('alert-success');
                    resultat.classList.add('alert-danger');
                    resultat.classList.add('text-white');
                }

            })
    } else {
        resultat.textContent = 'Your data is invalid, please check your inputs';
        resultat.classList.remove('alert-success');
        resultat.classList.add('alert-danger');
        resultat.classList.add('text-white');
    }
});

