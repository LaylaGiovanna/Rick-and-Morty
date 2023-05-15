'use strict'

const { loadEpisodes } = require("./card-characters")
const { loadLocation } = require("./card-location")

const routes = {
    '/episodes': '/pages/episodes.html',
    '/locations': '/pages/location.html'
}

const route = async() => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)

    const path = window.location.pathname

    const route = routes[path]

    const response = await fetch(route)
    const html = await response.text()

    document.getElementById('root').innerHTML = html

    
    if(path == '/episodes'){
        loadEpisodes()
    } else if (path == '/locations'){
        loadLocation()
    } 

}

window.route = route