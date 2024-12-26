const jokeList = document.getElementById('jokeList')
const jokeBtn = document.getElementById('fetchJoke')
const deleteAll = document.getElementById('deleteAll')

let joke = ''

const fetchJoke = async () => {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const data = await response.json()
        joke = data.value
    } catch (error) {
        console.error('Fetch joke FAILED', error)
    }
}

const saveJokes = () => {
    const jokeList = JSON.parse(localStorage.getItem('jokeList')) || []

    if (joke) {
        jokeList.push(joke)
        localStorage.setItem('jokeList', JSON.stringify(jokeList))
    }
}

const deleteJoke = (e) => {
    const index = e.target.getAttribute('data-index')
    let jokes = JSON.parse(localStorage.getItem('jokeList'))
    jokes.splice(index, 1)
    localStorage.setItem('jokeList', JSON.stringify(jokes))
    showJokes()
}

deleteAll.addEventListener('click', () => {
    localStorage.clear()
    showJokes()
})

const showJokes = () => {
    const jokes = JSON.parse(localStorage.getItem('jokeList'))
    jokeList.innerHTML = ''

    jokes.forEach((element, index) => {
         const template = `
            <li>
                ${element}
                <button class='deleteBtn' data-index=${index}>Borrar</button>
            </li>
         `
         jokeList.innerHTML += template
    })

    const deleteBtns = document.querySelectorAll('.deleteBtn')
    deleteBtns.forEach(button => {
        button.addEventListener('click', (e)=> deleteJoke(e))
    })
}

jokeBtn.addEventListener('click', async () => {
    await fetchJoke()
    saveJokes()
    showJokes()
})

showJokes()