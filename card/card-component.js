class CardComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        if (this.shadowRoot.childNodes.length > 0) {
            return;
        }

        const template = document.getElementById("card-template");

        if (!template) {
            console.error("Шаблон card-template не найден!");
            return;
        }

        const templateContent = template.content.cloneNode(true);

        const style = document.createElement("style");

        style.textContent = `
            .card {
                width: 300px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
            }

            .card-header {
                background-color: #1c2d1b;
                color: white;
                padding: 15px;
            }

            .card-header h2 {
                margin: 0;
                font-size: 20px;
            }

            .card-content {
                padding: 15px;
                color: #100303;
                line-height: 1.5;
            }

            .card-content img {
                display: block;
                object-fit: cover;
                boz-siszing: border-box;
                margin-top: 10px;
                border-radius: 5px;
            }
        `;

        this.shadowRoot.appendChild(style);

        this.shadowRoot.appendChild(templateContent);
    }
}

customElements.define("card-component", CardComponent);