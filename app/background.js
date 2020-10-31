const Radio = {
    source: new Audio(),
    current_station: "teste",
    playing: false,
    volume: 0.7,

    getStationsJSON(callback) {
        const url = "https://api.jsonbin.io/b/5f9cfc939291173cbca625fd/1"
        const key = "$2b$10$vL2iVgaGSD1nDzeXCXvNwuEet42VwhI66XDDHmDg/Ye.KEn0Bv2xO"

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                return callback(xhr.response)
            }
        }
        
        xhr.responseType = "json"
        xhr.open("GET", url, true)
        xhr.setRequestHeader("secret-key", key)
        xhr.send()

    },
    getAllStations(request, sender, sendResponse) {
        
        if (request.name == "all_stations") {
            Radio.getStationsJSON(results => {
                console.log(`getAllStations(): Getting all station list.`)

                return sendResponse(results)
            })
        }
        

        return true
    },
    getCurrentStation(request, sender, sendResponse) {
        
        if (request.name == "current_station") {
            console.log(`getCurrentStation(): Getting the current selected Station. [${Radio.current_station}]`)
            
            sendResponse(Radio.current_station)
        }

        return true
    },
    getPlayingStatus(request, sender, sendResponse) {
        
        if (request.name == "playing_status") {
            console.log(`getPlayingStatus(): Getting the current playing status. [${Radio.playing}]`)
            
            sendResponse(Radio.playing)
        }

        return true
    },
    getVolume(request, sender, sendResponse) {
        
        if (request.name == "volume") {
            console.log(`getVolume(): Getting the current volume. [${Radio.volume}]`)
            
            sendResponse(Radio.volume)
        }

        return true
    },

    setCurrentStation(request, sender, sendResponse) {

        if (request.name == "update_station") {
            console.log(`setCurrentStation(): Setting new selected Station. [${request.server}]`)
            Radio.current_station = request.server

            Radio.source.src = Radio.current_station
            sendResponse('success')
        }

        return true
    },
    setPlayingStatus(request, sender, sendResponse) {

        if (request.name == "update_playing_status") {
            console.log(`setPlayingStatus(): Setting new playing status. [${request.status}]`)
            
            Radio.playing = request.status
            
            if (Radio.playing == true) {
                Radio.source.play()
            } else {
                Radio.source.pause()
            }

            sendResponse('Success')
        }

        return true
    },
    setVolume(request, sender, sendResponse) {
        if (request.name == "update_volume") {
            console.log(`setVolume(): Setting new volume. [${request.volume}]`)
            
            Radio.volume = request.volume
            Radio.source.volume = request.volume / 100

            sendResponse('Success')
        }
    }

}

const Chrome = {
    listen(event) {
        chrome.runtime.onMessage.addListener(event)
    }
}

Chrome.listen(Radio.getAllStations)
Chrome.listen(Radio.getCurrentStation)
Chrome.listen(Radio.getPlayingStatus)
Chrome.listen(Radio.getVolume)

Chrome.listen(Radio.setCurrentStation)
Chrome.listen(Radio.setPlayingStatus)
Chrome.listen(Radio.setVolume)

document.querySelector('body').appendChild(Radio.source)

