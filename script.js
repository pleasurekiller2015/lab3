function openMenu() {
    document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
    document.getElementById("sideMenu").classList.remove("open");
}

const translations = {
    ua: {
        contact: "Наші контакти",
        contactus: "Зв'яжіться з нами",
        catalogText: "Каталог",
        num: "Телефон:",
        adr: "Адреса:",
        namef: "Ваше ім'я",
        emailf: "Ваш email",
        mess: "Повідомлення",
        sendmess: "Надіслати повідомлення",
        cartText: "Кошик",
        infoLink: "Інформація",
        street1: "м. Київ, вул. Прикладна, 12",
        heroLink: "Головна",
        searchPlaceholder: "Я шукаю...",
        searchButton: "Знайти",
        cartTitle: "Кошик",
        copyright: "2024 Магазин Гаджетів. Всі права захищено.",
        checkoutButton: "Оформити замовлення",
        constr: "Ми завжди раді допомогти вам! Заповніть форму або зв'яжіться з нами за наведеними контактами.",
        productsTitle: "Наші продукти",
        product1Title: "Смартфон",
        product2Title: "Ноутбук",
        product3Title: "Планшет",
        addToCartButton1: "Додати до кошика",
        addToCartButton2: "Додати до кошика",
        addToCartButton3: "Додати до кошика",
        heroTitle: "Знайдіть ваш ідеальний гаджет сьогодні",
        heroDescription: "Від смартфонів до ноутбуків, знайдіть найновіші гаджети за вигідними цінами",
        catalogLinkButton: "Переглянути каталог",
        aboutTitle: "Про нас",
        missionTitle: "Наша місія",
        missionText: "Ми прагнемо забезпечити клієнтів найсучаснішими гаджетами за найкращими цінами...",
        whyChooseUsTitle: "Чому обирають нас?",
        contactUsBtn: "Зв'язатися з нами",
        totalcart: "Всього:",
        whyChooseUsList: [
            "Широкий вибір сучасних гаджетів",
            "гарантія якості на всі продукти",
            "безкоштовна доставка по Україні"
        ],
        contactsLink: "Контакти",
        phone: "Телефон:",
        email: "Email:",
        address: "Адреса:",
    },
    en: {
        whyChooseUsTitle: "Why Choose Us?",
        whyChooseUsList: [
            "Wide selection of modern gadgets.",
            "Quality guarantee on all products.",
            "Free delivery across the country."
        ],
        contact: "Our contacts",
        copyright: "2024 Gadget Store. All rights reserved.",
        infoLink: "Info",
        contactus: "Contact us",
        totalcart: "In all:",
        num: "Phone:",
        adr: "Address:",
        namef: "Your name",
        emailf: "Your email",
        mess: "Message",
        sendmess: "Send message",
        heroLink: "Main",
        catalogText: "Catalog",
        street1: "Kyiv, str. Applied, 12",
        cartText: "Cart",
        searchPlaceholder: "I'm looking for...",
        searchButton: "Search",
        cartTitle: "Cart",
        checkoutButton: "Checkout",
        constr: "We are always happy to help you! Fill out the form or contact us using the given contacts.",
        productsTitle: "Our Products",
        product1Title: "Smartphone",
        product2Title: "Laptop",
        product3Title: "Tablet",
        addToCartButton1: "Add to Cart",
        addToCartButton2: "Add to Cart",
        addToCartButton3: "Add to Cart",
        heroTitle: "Find Your Perfect Gadget Today",
        heroDescription: "From smartphones to laptops, find the latest gadgets at great prices",
        catalogLinkButton: "Browse Catalog",
        aboutTitle: "About Us",
        missionTitle: "Our Mission",
        missionText: "We strive to provide customers with the most modern gadgets at the best prices...",
        contactsLink: "Contacts",
        phone: "Phone:",
        email: "Email:",
        address: "Address:",
    }
};

function translateContent(language) {
    const selectedTranslations = translations[language];
    Object.entries(selectedTranslations).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'searchPlaceholder') {
                element.placeholder = text; 
            } else {
                element.textContent = text; 
            }
        }
    });
    localStorage.setItem('selectedLanguage', language); 
}


function switchLanguage() {
    const language = document.getElementById("language").value;
    translateContent(language);
}


document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ua';
    document.getElementById('language').value = savedLanguage;
    switchLanguage(); 
});


const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceContainer = document.querySelector('.total-price');
let totalPrice = 0;


function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.forEach(item => {
        addCartItem(item.name, item.price);
    });
}

function addCartItem(productName, productPrice) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item'); 
    cartItem.innerHTML = `
        <span>${productName} - ₴${productPrice.toFixed(2)}</span>
        <button class="remove-item-btn">×</button>
    `;
    cartItemsContainer.appendChild(cartItem);

    totalPrice += productPrice;
    totalPriceContainer.innerText = `₴${totalPrice.toFixed(2)}`;

    const removeButton = cartItem.querySelector('.remove-item-btn');
    removeButton.addEventListener('click', () => {
        removeCartItem(productName, productPrice);
    });
}


function removeCartItem(productName, productPrice) {
    totalPrice -= productPrice; 
    totalPriceContainer.innerText = `₴${totalPrice.toFixed(2)}`;


    const cartItems = Array.from(cartItemsContainer.children);
    const itemToRemove = cartItems.find(item => item.innerText.includes(productName));
    if (itemToRemove) {
        cartItemsContainer.removeChild(itemToRemove);
    }


    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').innerText;
        const productPrice = parseFloat(productCard.querySelector('.price').innerText.replace('₴', '').replace(',', ''));

        addCartItem(productName, productPrice);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name: productName, price: productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});


loadCart();


const closeCartBtn = document.querySelector('.close-cart-btn');
const globalCart = document.querySelector('.global-cart');

closeCartBtn.addEventListener('click', () => {
    globalCart.style.display = 'none'; 
});


const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('click', () => {
    globalCart.style.display = 'block';
});

document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchPlaceholder').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').innerText.toLowerCase();


        if (productName.includes(searchTerm)) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none'; 
        }
    });
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
};


scrollToTopBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
};
