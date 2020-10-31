const Popup = {
    selectElement: document.querySelector('#server'),
    placeholderOption: document.querySelector('#placeholder'),
    stationsCache: [],

    initialize() {
        Popup.requestAllStations()
    },

    requestAllStations() {
        chrome.runtime.sendMessage({type: 'GET', name: 'all_stations'}, stations => {
            
            stations.forEach(station => {
                const option = Popup.createStationElement(station)
                Popup.selectElement.appendChild(option)
                Popup.selectElement.style.display = "flex"

                Popup.stationsCache.push(station)
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
            }
        })
    },

    updateSelectedStation(station) {
        const { value: server } = station
        chrome.runtime.sendMessage({type: 'PUT', name: 'update_station', server})
    },



    createStationElement(station) {
        const option = document.createElement('option')
        option.value = station.src
        option.innerHTML = station.name

        return option
    }

}

Popup.initialize()

/* --------------------------------- EVENTS --------------------------------- */
document.querySelector('#server').addEventListener("change", event => Popup.updateSelectedStation(event.target))
// document.querySelector('.player-control i').addEventListener("click", () => Radio.playPause())
// document.querySelector('.player-control input').addEventListener("change", event => Radio.changeVolume(event))