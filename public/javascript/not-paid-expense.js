async function notPaidExpenseHandler(event) {
    event.preventDefault();

    const id = event.target.id;
    var expense = event.target.attributes.data.value; 
    var title = expense.title;
    var description = expense.description;
    var expense_value = expense.expense_value
    var date_due = expense.date_due
    var is_paid = 1;
    var date_paid = Date.now();
    const response = await fetch(`/api/expense/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            expense_value,
            date_due,
            is_paid,
            date_paid
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log(response)
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
     }
     
}

paidButtons = document.getElementsByClassName("notpaid-post-btn");
for (var i = 0; i < paidButtons.length; i++){
    paidButtons[i].addEventListener("click", notPaidExpenseHandler)
};

//document.querySelector(`.paid-post-btn`).addEventListener('click', paidExpenseHandler);