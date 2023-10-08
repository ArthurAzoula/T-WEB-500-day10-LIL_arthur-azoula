// Error codes
const TYPE_NOT_ENOUGHT_CHARACTERS = 1;
const TYPE_TOO_MANY_CHARACTERS = 2;
const TYPE_NON_ALPHABETICAL_CHARACTERS = 3;

const BRAND_NOT_ENOUGHT_CHARACTERS = 4;
const BRAND_TOO_MANY_CHARACTERS = 5;
const BRAND_INVALID_CHARACTERS = 6;

const PRICE_NOT_ENOUGHT_CHARACTERS = 7;
const PRICE_TOO_MANY_CHARACTERS = 8;
const PRICE_INVALID_CHARACTERS = 9;

const NUMBER_NOT_POSITIVE = 10;

const form = document.querySelector('form');
const type = document.querySelector('#type');
const brand = document.querySelector('#brand');
const price = document.querySelector('#price');
const number = document.querySelector('#number');
const resultat = document.querySelector('#resultat');
const ultype = document.querySelector('#check_type');
const ulbrand = document.querySelector('#check_brand');
const ulprice = document.querySelector('#check_price');
const ulnumber = document.querySelector('#check_number');

const submitbutton = document.querySelector('div button');

// reset
type.value = '';
brand.value = '';
price.value = '';
number.value = '';

let isTypeValid = false;
let isBrandValid = false;
let isPriceValid = false;
let isNumberValid = false;

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
        ultype.children[0].classList.remove('text-success');

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
        ulbrand.children[1].classList.remove('text-success');
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

price.addEventListener('keyup', (e) => {
    let priceValue = e.currentTarget.value;
    priceValue = priceValue.trim();
    if (priceValue.length > 0) {
        ulprice.classList.remove('d-none');
    } else {
        ulprice.classList.add('d-none');
    }
    const priceError = checkPrice(priceValue);
    if (priceError.includes(PRICE_NOT_ENOUGHT_CHARACTERS)) {
        ulprice.children[0].classList.add('text-danger');
        ulprice.children[0].classList.remove('text-success');
    } else {
        ulprice.children[0].classList.remove('text-danger');
        ulprice.children[0].classList.add('text-success');
    }
    if (priceError.includes(PRICE_TOO_MANY_CHARACTERS)) {
        ulprice.children[1].classList.add('text-danger');
        ulprice.children[1].classList.remove('text-success');
    } else {
        ulprice.children[1].classList.remove('text-danger');
        ulprice.children[1].classList.add('text-success');
    }
    if (priceError.includes(PRICE_INVALID_CHARACTERS)) {
        ulprice.children[2].classList.add('text-danger');
        ulprice.children[2].classList.remove('text-success');
    } else {
        ulprice.children[2].classList.remove('text-danger');
        ulprice.children[2].classList.add('text-success');
    }

    if (priceError.includes(PRICE_NOT_ENOUGHT_CHARACTERS) || priceError.includes(PRICE_TOO_MANY_CHARACTERS) || priceError.includes(PRICE_INVALID_CHARACTERS)) {
        isPriceValid = false;
    } else {
        isPriceValid = true;
    }
});

number.addEventListener('keyup', (e) => {
    let numberValue = e.currentTarget.value;
    numberValue = numberValue.trim();
    if (numberValue.length > 0) {
        ulnumber.classList.remove('d-none');
    } else {
        ulnumber.classList.add('d-none');
    }
    const numberError = checkNumber(numberValue);
    if (numberError.includes(NUMBER_NOT_POSITIVE)) {
        ulnumber.children[0].classList.add('text-danger');
        ulnumber.children[0].classList.remove('text-success');
        isNumberValid = false;
    } else {
        ulnumber.children[0].classList.remove('text-danger');
        ulnumber.children[0].classList.add('text-success');
        isNumberValid = true;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isTypeValid && isBrandValid && isPriceValid && isNumberValid) {
        fetch(`task05.php?type=${type.value}&brand=${brand.value}&price=${price.value}&number=${number.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const product = data[0][0];
                    resultat.innerHTML = `
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Number</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${product.type}</td>
                                    <td>${product.brand}</td>
                                    <td>${product.price}</td>
                                    <td>${number.value}</td>
                                    <td>${product.stock}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                    resultat.classList.remove('alert-danger');
                    resultat.classList.add('alert-success');
                    resultat.classList.add('text-white');
                } else {
                    resultat.textContent = data.error;
                    resultat.classList.remove('alert-success');
                    resultat.classList.add('alert-danger');
                    resultat.classList.add('text-white');
                }
            })
            .catch(error => {
                console.error(error);
            }); // Fetch the data from the server
    } else {
        resultat.textContent = 'Your data is invalid';
        resultat.classList.remove('alert-success');
        resultat.classList.add('alert-danger');
        resultat.classList.add('text-white');
    }
});

const checkType = (typeValue) => {
    const errors = [];
    if (typeValue.length < 3) {
        errors.push(TYPE_NOT_ENOUGHT_CHARACTERS);
    }
    if (typeValue.length > 10) {
        errors.push(TYPE_TOO_MANY_CHARACTERS);
    }
    if (!/^[a-zA-Z\-]+$/.test(typeValue)) {
        errors.push(TYPE_NON_ALPHABETICAL_CHARACTERS);
    }
    return errors;
};

const checkBrand = (brandValue) => {
    const errors = [];
    if (brandValue.length < 2) {
        errors.push(BRAND_NOT_ENOUGHT_CHARACTERS);
    }
    if (brandValue.length > 20) {
        errors.push(BRAND_TOO_MANY_CHARACTERS);
    }
    if (!/^[a-zA-Z0-9\-&]+$/.test(brandValue)) {
        errors.push(BRAND_INVALID_CHARACTERS);
    }
    return errors;
};

const checkPrice = (priceValue) => {
    const errors = [];
    if (priceValue.length < 2) {
        errors.push(PRICE_NOT_ENOUGHT_CHARACTERS);
    }
    if (priceValue.length > 5) {
        errors.push(PRICE_TOO_MANY_CHARACTERS);
    }
    if (!/^[><=][0-9]+$/.test(priceValue)) {
        errors.push(PRICE_INVALID_CHARACTERS);
    }
    return errors;
};

const checkNumber = (numberValue) => {
    const errors = [];
    if (!/^[0-9]+$/.test(numberValue)) {
        errors.push(NUMBER_NOT_POSITIVE);
    }
    return errors;
};