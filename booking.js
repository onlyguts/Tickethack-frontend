console.log('loaded')

function travelTime(infos) {
    const departure = '2021/11/23 08:00:00';
    const arrival = infos;
    let result = "";
    let time = (new Date(arrival).getTime() - new Date().getTime()) / 1000 / 60;
    var totalMinutes = time
    var hours = Math.floor(time / 60);
    var minutes = time % 60;
    result = `${ hours } Hours and ${ minutes.toFixed(0) }`;
    return result

}


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
            console.log(data)
            if (cart.length != 0) {
                for (let i = 0; i < cart.length; i++) {
                    console.log(cart[i])

                    document.querySelector('.booking-list').innerHTML += `
                    <li>
                        <div>${cart[i].da}</div>
                        <div>${formatDate(cart[i].date)}</div>
                        <div>${cart[i].price}</div>
                       <div>Departure in ${travelTime(cart[i].date)} minutes</div>
                    </li>
                `
                }
            }


        });
}

 apiCart()