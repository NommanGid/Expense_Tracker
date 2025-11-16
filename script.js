// DOM Elements
        const expenseForm = document.getElementById('expense-form');
        const itemNameInput = document.getElementById('item-name');
        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');
        const expenseList = document.getElementById('expense-list');
        const totalExpensesElement = document.getElementById('total-expenses');
        const expensesCountElement = document.getElementById('expenses-count');
        
        // Initialize expenses array from localStorage or empty array
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        
        // Function to save expenses to localStorage
        function saveExpenses() {
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
        
        // Function to add a new expense
        function addExpense(e) {
            e.preventDefault();
            
            const expense = {
                id: Date.now(),
                itemName: itemNameInput.value,
                amount: parseFloat(amountInput.value),
                category: categorySelect.value,
                date: new Date().toISOString()
            };
            
            expenses.push(expense);
            saveExpenses();
            renderExpenses();
            updateSummary();
            
            // Reset form
            expenseForm.reset();
        }
        
        // Function to delete an expense
        function deleteExpense(id) {
            expenses = expenses.filter(expense => expense.id !== id);
            saveExpenses();
            renderExpenses();
            updateSummary();
        }
        
        // Function to update the summary
        function updateSummary() {
            const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            totalExpensesElement.textContent = `$${total.toFixed(2)}`;
            expensesCountElement.textContent = expenses.length;
        }
        
        // Function to render the expense list
        function renderExpenses() {
            if (expenses.length === 0) {
                expenseList.innerHTML = '<div class="empty-state">No expenses recorded yet. Add your first expense above!</div>';
                return;
            }
            
            // Sort expenses by date (newest first)
            const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            expenseList.innerHTML = sortedExpenses.map(expense => `
                <div class="expense-item">
                    <div class="expense-details">
                        <div>
                            <span class="expense-category">${expense.category}</span>
                            <span>${expense.itemName}</span>
                        </div>
                        <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                </div>
            `).join('');
        }
        
        // Event Listeners
        expenseForm.addEventListener('submit', addExpense);
        
        // Initial render
        renderExpenses();
        updateSummary();