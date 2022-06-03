
async function deleteExpenseHandler(event) {
    event.preventDefault();

    const id = event.target.id;
    console.log('post with ' + id + ' deleted')
    
    const response = await fetch(`/api/expense/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
     }
     
}

deleteButtons = document.getElementsByClassName("delete-post-btn");
for (var i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", deleteExpenseHandler)
};

//document.querySelector(`.delete-post-btn`).addEventListener('click', deleteExpenseHandler);