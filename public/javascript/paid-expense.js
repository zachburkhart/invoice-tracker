
async function paidExpenseHandler(event) {
    event.preventDefault();

    const id = event.target.id;
    console.log('post with ' + id + ' paid')
    
    const response = await fetch(`/api/expense/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
     }
     
}

paidButtons = document.getElementsByClassName("paid-post-btn");
for (var i = 0; i < paidButtons.length; i++){
    paidButtons[i].addEventListener("click", paidExpenseHandler)
};

//document.querySelector(`.paid-post-btn`).addEventListener('click', paidExpenseHandler);