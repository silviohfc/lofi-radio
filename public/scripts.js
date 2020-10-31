const Popup = {
    selectElement: document.querySelector('#server'),
    placeholderOption: document.querySelector('#placeholder'),
    playerElement: document.querySelector('.player-control'),

    play_pause_button: document.querySelector('.player-control i'),
    volume_slider: document.querySelector('#volume'),
    loader: document.querySelector('.loader'),

    initialize() {
        Popup.loading(true)
        Popup.hidePlayerElement()
        Popup.requestAllStations()
        Popup.requestVolume()
    },

    requestAllStations() {
        chrome.runtime.sendMessage({type: 'GET', name: 'all_stations'}, stations => {
            
            stations.forEach(station => {
                const option = Popup.createStationElement(station)
                Popup.selectElement.appendChild(option)
                Popup.selectElement.style.display = "flex"
            })

            Popup.requestCurrentStation()
        })
    },
    requestCurrentStation() {
        chrome.runtime.sendMessage({type: 'GET', name: 'current_station'}, station => {
            const selectedStation = Array.from(Popup.selectElement.childNodes).filter(option => option.value == station)

            if (selectedStation) {
                const selectedStationElement = document.querySelector(`option[value="${selectedStation[0].value}"]`)
                selectedStationElement.setAttribute('selected', true)

                Popup.loading(false)
                Popup.showPlayerElement()
                Popup.requestPlayingStatus()
            }
        })
    },
    requestPlayingStatus() {
        chrome.runtime.sendMessage({type: 'GET', name: 'playing_status'}, status => {
            if (status == true) {
                Popup.play_pause_button.classList.remove('fa-play')
                Popup.play_pause_button.classList.add('fa-pause')
            } else {
                Popup.play_pause_button.classList.remove('fa-pause')
                Popup.play_pause_button.classList.add('fa-play')
            }
        })
    },
    requestVolume() {
        chrome.runtime.sendMessage({type: 'GET', name: 'volume'}, value => {
            Popup.volume_slider.value = value
        })
    },

    updateSelectedStation(station) {
        Popup.updatePlayingStatus(false)
        Popup.hidePlayerElement()
        Popup.loading(true)

        const { value: server } = station
        chrome.runtime.sendMessage({type: 'PUT', name: 'update_station', server}, status => {
            setTimeout(() => {
                Popup.requestPlayingStatus()
                Popup.showPlayerElement()
                Popup.loading(false)
            }, 1000)
        })
    },
    updatePlayingStatus(status) {
        chrome.runtime.sendMessage({type: 'PUT', name: 'update_playing_status', status})
    },
    updateVolume(volume) {
        chrome.runtime.sendMessage({type: 'PUT', name: 'update_volume', volume})
    },



    createStationElement(station) {
        const option = document.createElement('option')
        option.value = station.src
        option.innerHTML = station.name

        return option
    },

    showPlayerElement() {
        Popup.playerElement.style.display = "flex"
    },

    hidePlayerElement() {
        Popup.playerElement.style.display = "none"
    },

    playPauseButtonEvent(button) {
        if (button.classList.contains('fa-play')) {
            button.classList.remove('fa-play')
            button.classList.add('fa-pause')

            Popup.updatePlayingStatus(true)
        } else {
            button.classList.remove('fa-pause')
            button.classList.add('fa-play')

            Popup.updatePlayingStatus(false)
        }
    },

    loading(status) {
        if (status == true) {
            Popup.loader.style.display = "block"
        } else {
            Popup.loader.style.display = "none"
        }
    }

}

Popup.initialize()

/* --------------------------------- EVENTS --------------------------------- */
document.querySelector('#server').addEventListener("change", event => Popup.updateSelectedStation(event.target))
document.querySelector('.player-control i').addEventListener("click", event => Popup.playPauseButtonEvent(event.target))
document.querySelector('.player-control input').addEventListener("change", event => Popup.updateVolume(event.target.value))