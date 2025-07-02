console.log('loaded')


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

document.querySelector('.btn-search').addEventListener('click', function () {
    // console.log(document.querySelector('.date').value)
    //     console.log(document.querySelector('.text1').value)
    //         console.log(document.querySelector('.text').value)
    if (!document.querySelector('.text1').value || !document.querySelector('.text').value || !document.querySelector('.date').value) {
        console.log('not found ')
        document.querySelector('.result-list').style.display = 'none'
        document.querySelector('.itstime').style.display = 'block'

        document.querySelector('.imageitstime').src = './images/notfound.png'
        document.querySelector('.pitstime').textContent = 'not found'
    } else {
        document.querySelector('.result-list').style.display = 'block'
        document.querySelector('.itstime').style.display = 'none'
    }

    fetch(`http://localhost:3000/travel/search/${document.querySelector('.text1').value}/${document.querySelector('.text').value}/${document.querySelector('.date').value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.result)
            if (data.result === true) {
                document.querySelector('.result-lists').innerHTML = ''
                const travel = data.travel
                for (let i = 0; i < travel.length; i++) {
                    console.log('date', travel[i].date)
                    document.querySelector('.result-lists').innerHTML += `
                      <li>
                                <div class='result-lists-departure'>${travel[i].departure} > ${travel[i].arrival}</div>
                                <div class='result-lists-date' id=${travel[i].date}>${formatDate(travel[i].date)}</div>
                                <div class='result-lists-price'>${travel[i].price}€</div>
                                <button class='btn-add-api'>Book</button>
                            </li>
                  `
                }
            } else {
                document.querySelector('.result-list').style.display = 'none'
                document.querySelector('.itstime').style.display = 'block'

                document.querySelector('.imageitstime').src = './images/notfound.png'
                document.querySelector('.pitstime').textContent = 'not found'
            }

        });


})

// document.addEventListener('click', function (e) {
//     if (e.target && e.target.classList.contains('btn-add-api')) {
//         console.log(e.target.parentNode.textContent)
//         console.log(e.target.getAttribute('id'))
//         console.log(e.target.textContent)

// const data = {
//     da: document.querySelector('.result-lists-departure').textContent,
//     date: document.querySelector('.result-lists-date').getAttribute('id'),
//     price: document.querySelector('.result-lists-price').textContent,
// }

//         fetch('http://localhost:3000/cart/create', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)

//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 console.log('added')
//             });
//     }
// });


// FF 
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-add-api')) {



        const li = e.target.closest('li');
        const departure = li.querySelector('.result-lists-departure')?.textContent.trim();
        const date = li.querySelector('.result-lists-date')?.getAttribute('id');
        const price = li.querySelector('.result-lists-price')?.textContent.trim();

        console.log('Départ:', departure);
        console.log('Date:', date);
        console.log('Prix:', price);

        const data = {
            da: departure,
            date: date,
            price: price,
        }

        fetch('http://localhost:3000/cart/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log('Ajouté :', res));
    }
});
