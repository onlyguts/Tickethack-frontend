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
                    console.log(travel[i])
                    document.querySelector('.result-lists').innerHTML += `
                      <li>
                                <div>${travel[i].departure} > ${travel[i].arrival}</div>
                                <div>${formatDate(travel[i].date)}</div>
                                <div>${travel[i].price}€</div>
                                <button>Book</button>
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

