const API_URL = "http://localhost:8080/api/expenses";

const expenseForm = document.getElementById("expense-form");
const expenseIdInput = document.getElementById("expense-id");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const submitButton = document.getElementById("submit-btn");
const expenseListContainer = document.getElementById("expense-list");
const totalSummary = document.getElementById("total-summary");
const categorySummary = document.getElementById("category-summary");
const monthlyTrend = document.getElementById("monthly-trend");
const filterStartDateInput = document.getElementById("filter-start-date");
const filterEndDateInput = document.getElementById("filter-end-date");
const filterCategoryInput = document.getElementById("filter-category");
const applyFilterButton = document.getElementById("apply-filter-btn");
const clearFilterButton = document.getElementById("clear-filter-btn");

let cachedExpenses = []; // keep latest server data in memory

function toNumber(value) {
    // convert amount values to number type
    if (typeof value === "number") {
        return value; // already numeric
    }
    return Number.parseFloat(value);
}

function resetFormState() {
    // reset form fields and switch to add mode
    expenseForm.reset();
    expenseIdInput.value = "";
    submitButton.textContent = "Add Expense";
}

function getActiveFilters() {
    // read active filter values
    return {
        startDate: filterStartDateInput.value,
        endDate: filterEndDateInput.value,
        category: filterCategoryInput.value,
    };
}

function applyFilters(expenses) {
    // filter by category and date range
    const { startDate, endDate, category } = getActiveFilters();
    return expenses.filter((expense) => {
        // apply all filter rules
        const matchedCategory = !category || expense.category === category;
        const matchedStart = !startDate || expense.expenseDate >= startDate;
        const matchedEnd = !endDate || expense.expenseDate <= endDate;
        return matchedCategory && matchedStart && matchedEnd;
    });
}

function renderMonthlyTrend(expenses) {
    // render monthly total trend
    if (expenses.length === 0) {
        // check if theres any expense record
        monthlyTrend.innerHTML = '<p style="color: gray;">No data for monthly trend.</p>';
        return;
    }

    const monthTotals = expenses.reduce((acc, expense) => {
        // group by month key
        const monthKey = expense.expenseDate.slice(0, 7);
        const amount = toNumber(expense.amount);
        acc[monthKey] = (acc[monthKey] || 0) + amount;
        return acc;
    }, {});

    const monthEntries = Object.entries(monthTotals).sort(([a], [b]) => a.localeCompare(b)); // sort by month asc
    monthlyTrend.innerHTML = monthEntries
        // render each trend row
        .map(
            ([month, amount]) =>
                `<div class="trend-item"><strong>${month}</strong><span>$${amount.toFixed(2)}</span></div>`
        )
        .join("");
}

function renderAll(expenses) {
    // render all visible sections together
    renderExpenses(expenses);
    renderSummary(expenses);
    renderMonthlyTrend(expenses);
}

function renderSummary(expenses) {
    // render total and category summary
    const total = expenses.reduce((sum, expense) => sum + toNumber(expense.amount), 0);
    totalSummary.textContent = `Total Expenses: $${total.toFixed(2)}`;

    if (expenses.length === 0) {
        // check if theres any expense record
        categorySummary.innerHTML = "";
        return;
    }

    const categoryTotals = expenses.reduce((acc, expense) => {
        // group by category
        const amount = toNumber(expense.amount);
        acc[expense.category] = (acc[expense.category] || 0) + amount;
        return acc;
    }, {});

    categorySummary.innerHTML = Object.entries(categoryTotals)
        // render category lines
        .map(([category, amount]) => `<div>${category}: $${amount.toFixed(2)}</div>`)
        .join("");
}

function renderExpenses(expenses) {
    // render expense history cards
    if (expenses.length === 0) {
        // check if theres any expense record
        expenseListContainer.innerHTML =
            '<p style="text-align: center; color:gray;">No expenses recorded, Lets start tracking your expenses!</p>';
        return;
    }

    expenseListContainer.innerHTML = "";
    expenses.forEach((expense) => {
        // build one card for each expense
        const itemDiv = document.createElement("div");
        itemDiv.style.cssText =
            "border: 1px solid var(--border-color); padding: 15px; border-radius: 5px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; background-color: white;";

        itemDiv.innerHTML = `
        <div>
            <strong>${expense.title}</strong>
            <span style="color: gray; font-size: 14px; background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${expense.category}</span><br>
            <small>${expense.expenseDate} | ${expense.description || ""}</small>
        </div>
        <div style="text-align: right;">
            <span style="font-weight: bold; color: var(--danger-color); font-size: 18px;">$${toNumber(expense.amount).toFixed(2)}</span><br>
            <button onclick="editExpense(${expense.id})" style="padding: 5px 10px; font-size: 12px; margin-top: 5px; background-color: #ffc107; color: black; border: none; border-radius: 3px; cursor: pointer;">Edit</button>
            <button onclick="deleteExpense(${expense.id})" class="btn-danger" style="padding: 5px 10px; font-size: 12px; margin-top: 5px;">Delete</button>
        </div>`;
        expenseListContainer.appendChild(itemDiv);
    });
}

async function fetchAndRenderExpenses() {
    // fetch expenses and render with active filters
    try {
        expenseListContainer.innerHTML = '<p style="text-align: center; color: gray;"> Loading data....</p>';
        const response = await fetch(API_URL);
        if (!response.ok) {
            // check api request success
            throw new Error(`Failed to connect server, status code: ${response.status}`);
        }
        cachedExpenses = await response.json();
        renderAll(applyFilters(cachedExpenses)); // keep ui state with filters
    } catch (error) {
        console.error("Failed to fetch data:", error);
        expenseListContainer.innerHTML =
            '<p style="text-align: center; color: var(--danger-color);">Failed to load data. Please check backend server.</p>';
    }
}

function fillFormForEdit(expense) {
    // fill form inputs for edit mode
    expenseIdInput.value = expense.id;
    titleInput.value = expense.title;
    categoryInput.value = expense.category;
    amountInput.value = toNumber(expense.amount);
    dateInput.value = expense.expenseDate;
    descriptionInput.value = expense.description || "";
    submitButton.textContent = "Update Expense";
}

function applyCurrentFilters() {
    // validate filter values and rerender
    if (
        filterStartDateInput.value &&
        filterEndDateInput.value &&
        filterStartDateInput.value > filterEndDateInput.value
    ) {
        // check date range validity
        window.alert("Start date cannot be later than end date.");
        return;
    }
    renderAll(applyFilters(cachedExpenses));
}

async function handleFormSubmit(event) {
    // submit create or update request
    event.preventDefault();

    const payload = {
        // build request payload
        title: titleInput.value.trim(),
        category: categoryInput.value,
        amount: Number.parseFloat(amountInput.value),
        expenseDate: dateInput.value,
        description: descriptionInput.value.trim(),
    };

    const isUpdate = Boolean(expenseIdInput.value);
    const requestUrl = isUpdate ? `${API_URL}/${expenseIdInput.value}` : API_URL;
    const requestMethod = isUpdate ? "PUT" : "POST"; // choose method by mode

    const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // check save request success
        const message = await response.text();
        throw new Error(message || `Request failed with status ${response.status}`);
    }

    resetFormState();
    await fetchAndRenderExpenses();
}

async function doDeleteExpense(id) {
    // delete expense after confirmation
    const shouldDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!shouldDelete) {
        // check user delete confirmation
        return;
    }

    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
        // check delete request success
        const message = await response.text();
        throw new Error(message || `Delete failed with status ${response.status}`);
    }

    await fetchAndRenderExpenses();
}

function editExpense(id) {
    // switch form to edit selected expense
    const expense = cachedExpenses.find((item) => item.id === id);
    if (!expense) {
        // check selected record exists
        window.alert("Cannot find this expense. Please refresh and try again.");
        return;
    }
    fillFormForEdit(expense);
}

expenseForm.addEventListener("submit", async (event) => {
    // handle form submit event
    try {
        await handleFormSubmit(event);
    } catch (error) {
        // handle save failure at ui layer
        console.error("Failed to submit form:", error);
        window.alert(error.message || "Failed to save expense.");
    }
});

// expose edit handler for inline edit buttons
window.editExpense = editExpense;
window.deleteExpense = async (id) => {
    // expose delete handler for inline delete buttons
    // handle inline delete click event
    try {
        await doDeleteExpense(id);
    } catch (error) {
        // handle delete failure at ui layer
        console.error("Failed to delete expense:", error);
        window.alert(error.message || "Failed to delete expense.");
    }
};

applyFilterButton.addEventListener("click", applyCurrentFilters); // apply selected filters
clearFilterButton.addEventListener("click", () => {
    // clear filters and rerender full cached data
    filterStartDateInput.value = "";
    filterEndDateInput.value = "";
    filterCategoryInput.value = "";
    renderAll(cachedExpenses); // render all cached data after reset
});

document.addEventListener("DOMContentLoaded", fetchAndRenderExpenses);
