const template = document.getElementById("contact-card");

const contactsContainer = document.getElementById("contacts");

const contacts = [
    {
        name: "Михаил Мишин",
        email: "mishin@gmail.com",
        phone: "+7 (999) 058-62-91",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWbUvfFPo0NtYBgaWuMJMxFkOpWjadCicjfuXbxA1BEg&s=10"
    },
    {
        name: "Артем Ли",
        email: "li@gmail.com",
        phone: "+7 (987) 345-74-14",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41pLqsNvsk8w8BQCE6D7LjRhRPdfhJANtoC0Lv2jCIA&s=10"
    },
    {
        name: "Татьяна Ким",
        email: "kim@gmail.com",
        phone: "+7 (968) 498-02-29",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIs4wqhhLYRN7gu1vBp5jR9p3UZTy8NbUZTxzBk1ZuRQ&s=10"
    },
    {
        name: "Иван Хан",
        email: "khan@gmail.com",
        phone: "+7 (984) 834-54-01",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLalLof-ZFhlByRuko2vYuMYEeicvBou3yICZNEo456g&s=10"
    }
];

contacts.forEach(contact => {

    const card = template.content.cloneNode(true);

    const image = card.querySelector(".contact-image");
    const name = card.querySelector(".contact-name");
    const email = card.querySelector(".contact-email");
    const phone = card.querySelector(".contact-phone");

    image.src = contact.image;
    image.alt = `Фото ${contact.name}`;

    name.textContent = contact.name;
    email.textContent = contact.email;
    phone.textContent = contact.phone;

    contactsContainer.appendChild(card);
});