const Radio = {
    source: new Audio(),
    current_station: "teste",
    playing: false,
    volume: 0.7,

    getStationsJSON(callback) {
        const url = "https://api.jsonbin.io/b/5f9cfc939291173cbca625fd"
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

    setCurrentStation(request, sender, sendResponse) {

        if (request.name == "update_station") {
            console.log(`getCurrentStation(): Setting new selected Station. [${request.server}]`)
            Radio.current_station = request.server

            sendResponse('success')
        }

        return true
    }

}

const Chrome = {
    listen(event) {
        chrome.runtime.onMessage.addListener(event)
    }
}

Chrome.listen(Radio.getAllStations)
Chrome.listen(Radio.getCurrentStation)
Chrome.listen(Radio.setCurrentStation)

document.querySelector('body').appendChild(Radio.source)

