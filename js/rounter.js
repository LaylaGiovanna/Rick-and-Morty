/* 'use strict'

import { createPersonalInformation } from './personal-information.js'

const routes = {
    "/": "/home.html",
    '/': '/pages/',
    '/': '/pages/',
    '/': '/pages/'
}

export const route = async () => {
    window.event.preventDefault()
    window.history.pushState({}, "", window.event.target.href)
    // console.log(window.location.pathname);

    const path = window.location.pathname
    // console.log(path);
    const route = routes[path]

    const response = await fetch(route)
    const html = await response.text()

    // console.log(route);

    document.getElementById('root').innerHTML = html

    createPersonalInformation()
    if (path == '/sun') {
        loadSun()
    } else if (path == '/planets') {
        loadAllPlanets()
    } else if (path == '/selected-planet') {
        loadPlanet()
    }
}

window.route = route; */