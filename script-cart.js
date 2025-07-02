
function formatDate(param) {
    const date = new Date(param)
    let hours = date.getHours()
    if (hours < 10) {
        hours = `0${hours}`;

    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`;

    }
    return hours + "h" + minutes
}


function apiCart() {
    fetch(`http://localhost:3000/cart/all`)
        .then(response => response.json())
        .then(data => {
            const cart = data.cart
            if (cart.length != 0) {
                for (let i = 0; i < cart.length; i++) {
                    console.log(cart[i])

                    document.querySelector('.list-ul').innerHTML += `
                    <li>
                            <div>${cart[i].da}</div>
                            <div>${formatDate(cart[i].date)}</div>
                            <div>${cart[i].price}</div>
                            <button class='delete-cart' id=${cart[i]._id}>X</button>
                        </li>
                `

                }
            } else {
                document.querySelector('.nobooking').style.display = 'block'
                document.querySelector('.yesbooking').style.display = 'none'
                document.querySelector('.yesbooking2').style.display = 'none'
            }


        });
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-cart')) {

        console.log(document.querySelector('.delete-cart').getAttribute('id'))
        fetch(`http://localhost:3000/cart/delete/${document.querySelector('.delete-cart').getAttribute('id')}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },


        })
            .then(response => response.json())
            .then(data => {
                document.querySelector('.list-ul').innerHTML = ''
                apiCart()
            });
    }

})


apiCart()


