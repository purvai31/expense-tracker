document.addEventListener("DOMContentLoaded", function () {

    // Get saved expenses from localStorage (or empty array)
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;

    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const dateInput = document.getElementById("date");
    const expenseList = document.getElementById("expenseList");
    const totalSpan = document.getElementById("total");
    const addBtn = document.getElementById("addBtn");

    // Page load par existing data show karo
    renderExpenses();

    function addExpense() {
        const title = titleInput.value.trim();
        const amount = amountInput.value;
        const category = categoryInput.value;
        const date = dateInput.value;

        if (!title || !amount || !category || !date) {
            alert("Please fill all fields");
            return;
        }

        const expense = {
            id: Date.now(),
            title: title,
            amount: Number(amount),
            category: category,
            date: date
        };

        expenses.push(expense);
        saveToLocalStorage();
        renderExpenses();
        clearInputs();
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        total = 0;

        expenses.forEach(exp => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${exp.title}</td>
                <td>₹${exp.amount}</td>
                <td>${exp.category}</td>
                <td>${exp.date}</td>
                <td>
                    <button onclick="deleteExpense(${exp.id})">❌</button>
                </td>
            `;
            expenseList.appendChild(row);
            total += exp.amount;
        });

        totalSpan.innerText = total;
    }

    window.deleteExpense = function (id) {
        expenses = expenses.filter(exp => exp.id !== id);
        saveToLocalStorage();
        renderExpenses();
    };

    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function clearInputs() {
        titleInput.value = "";
        amountInput.value = "";
        categoryInput.value = "";
        dateInput.value = "";
    }

    // ✅ Laptop + Mobile BOTH
    addBtn.addEventListener("click", addExpense);
    addBtn.addEventListener("touchstart", addExpense);

});
