// Get saved expenses from localStorage (or empty array)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

// Page load par existing data show karo
renderExpenses();

function addExpense() {
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (title === "" || amount === "" || category === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    const expense = {
        id: Date.now(), // unique id
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
    const table = document.getElementById("expenseList");
    table.innerHTML = "";
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
        table.appendChild(row);
        total += exp.amount;
    });

    document.getElementById("total").innerText = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveToLocalStorage();
    renderExpenses();
}

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}