async function newExpenseHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="expense-title"]').value;
    const description = document.querySelector('input[name="expense-description"]').value;
    const expense_value = document.querySelector('input[name="expense-amount"]').value;
    const date_due = document.querySelector('input[name="expense-due"]').value;

    const response = await fetch('/api/expense', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            expense_value,
            date_due
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-expense-form').addEventListener('submit', newExpenseHandler);