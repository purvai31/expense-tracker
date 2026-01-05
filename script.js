document.addEventListener("DOMContentLoaded", function() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const dateInput = document.getElementById("date");
    const expenseList = document.getElementById("expenseList");
    const totalSpan = document.getElementById("total");
    const addBtn = document.getElementById("addBtn");

    function renderExpenses() {
        expenseList.innerHTML = "";
        let total = 0;
        expenses.forEach(exp => {
            expenseList.innerHTML += `
                <tr>
                    <td>${exp.title}</td>
                    <td>₹${exp.amount}</td>
                    <td>${exp.category}</td>
                    <td>${exp.date}</td>
                </tr>`;
            total += exp.amount;
        });
        totalSpan.textContent = total;
    }

    addBtn.addEventListener("click", function() {
        const title = titleInput.value.trim();
        const amount = amountInput.value;
        const category = categoryInput.value;
        const date = dateInput.value;

        if (!title || !amount || !category || !date) {
            alert("Please fill all fields");
            return;
        }

        expenses.push({ id: Date.now(), title, amount: Number(amount), category, date });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();

        // Clear inputs and hide keyboard
        titleInput.value = "";
        amountInput.value = "";
        categoryInput.value = "";
        dateInput.value = "";
        document.activeElement.blur();
    });

    // Mobile Date Fix: Click karte hi calendar khulega
    dateInput.addEventListener("click", () => {
        if (dateInput.showPicker) dateInput.showPicker();
    });

    renderExpenses();
});
