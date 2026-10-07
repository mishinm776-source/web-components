class FinanceCalculator extends HTMLElement {
    static get observedAttributes() {
        return ["amount", "rate", "term"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("Компонент создан");
        this.render();
    }

    connectedCallback() {
        console.log("Компонент добавлен на страницу");
        this.addEventListeners();
        this.calculate();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log(`Компонент обновлен: ${name}`);
            if (this.shadowRoot) {
                this.calculate();
            }
        }
    }

    disconnectedCallback() {
        console.log("Компонент удален");
    }

    get amount() {
        return Number(this.getAttribute("amount")) || 0;
    }

    set amount(value) {
        this.setAttribute("amount", value);
    }

    get rate() {
        return Number(this.getAttribute("rate")) || 0;
    }

    set rate(value) {
        this.setAttribute("rate", value);
    }

    get term() {
        return Number(this.getAttribute("term")) || 0;
    }

    set term(value) {
        this.setAttribute("term", value);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .calculator {
                    max-width: 500px;
                    margin: 30px auto;
                    padding: 25px;
                    border-radius: 15px;
                    background: white;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                    font-family: Arial, sans-serif;
                }

                h2 {
                    margin-top: 0;
                    text-align: center;
                }

                label {
                    display: block;
                    margin-top: 15px;
                    margin-bottom: 5px;
                }

                input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 7px;
                    font-size: 16px;
                }

                button {
                    width: 100%;
                    margin-top: 20px;
                    padding: 12px;
                    border: none;
                    border-radius: 7px;
                    background: #222;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }

                button:hover {
                    background: #444;
                }

                .error {
                    color: #d00;
                    margin-top: 15px;
                }

                .result {
                    margin-top: 20px;
                    padding: 15px;
                    background: #f3f3f3;
                    border-radius: 10px;
                }

                .result p {
                    margin: 8px 0;
                }
            </style>

            <div class="calculator">
                <h2>Финансовый калькулятор</h2>

                <label>Сумма кредита:</label>
                <input id="amount" type="number" min="1"
                       placeholder="Например: 500000"
                       value="${this.amount || ""}">

                <label>Процентная ставка (% годовых):</label>
                <input id="rate" type="number" min="0" step="0.01"
                       placeholder="Например: 12"
                       value="${this.rate || ""}">

                <label>Срок кредита (месяцев):</label>
                <input id="term" type="number" min="1"
                       placeholder="Например: 36"
                       value="${this.term || ""}">

                <button id="calculateButton">Рассчитать</button>

                <div id="error" class="error"></div>

                <div id="result" class="result">
                    <p>Ежемесячный платеж: <b id="monthly">—</b></p>
                    <p>Общая сумма: <b id="total">—</b></p>
                    <p>Общий процент: <b id="interest">—</b></p>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const button = this.shadowRoot.querySelector("#calculateButton");

        button.addEventListener("click", () => {
            const amount = this.shadowRoot.querySelector("#amount").value;
            const rate = this.shadowRoot.querySelector("#rate").value;
            const term = this.shadowRoot.querySelector("#term").value;

            this.amount = amount;
            this.rate = rate;
            this.term = term;

            this.calculate();
        });
    }

    calculate() {
        const amount = this.amount;
        const annualRate = this.rate;
        const term = this.term;

        const error = this.shadowRoot.querySelector("#error");
        error.textContent = "";

        if (
            amount <= 0 ||
            term <= 0 ||
            annualRate < 0 ||
            !Number.isFinite(amount) ||
            !Number.isFinite(annualRate) ||
            !Number.isFinite(term)
        ) {
            error.textContent = "Введите корректные значения.";
            this.clearResults();
            return;
        }

        const monthlyRate = annualRate / 100 / 12;

        let monthlyPayment;

        if (monthlyRate === 0) {
            monthlyPayment = amount / term;
        } else {
            monthlyPayment =
                amount *
                (monthlyRate * Math.pow(1 + monthlyRate, term)) /
                (Math.pow(1 + monthlyRate, term) - 1);
        }

        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - amount;

        this.shadowRoot.querySelector("#monthly").textContent =
            this.formatMoney(monthlyPayment);

        this.shadowRoot.querySelector("#total").textContent =
            this.formatMoney(totalPayment);

        this.shadowRoot.querySelector("#interest").textContent =
            this.formatMoney(totalInterest);
    }

    clearResults() {
        this.shadowRoot.querySelector("#monthly").textContent = "—";
        this.shadowRoot.querySelector("#total").textContent = "—";
        this.shadowRoot.querySelector("#interest").textContent = "—";
    }

    formatMoney(value) {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB"
        }).format(value);
    }
}

customElements.define("finance-calculator", FinanceCalculator);
