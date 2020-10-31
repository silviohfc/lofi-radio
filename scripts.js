import servers from './servers.js'

const Radio = {
    player: document.querySelector('#player'),
    select: document.querySelector('#server'),
    placeholder: document.querySelector('#placeholder'),
    
    getRadio(server) {
        const {value: serverUrl } = server

        if (!serverUrl) return
        this.placeholder.remove()

        console.log(serverUrl)
    },
    createServer(server) {
        const option = document.createElement('option')
        option.innerHTML = server.name
        option.value = server.src
        
        return option
    },
    getServers() {
        servers.forEach(server => {
            const option = this.createServer(server)
            this.select.appendChild(option)
        })
    }
}

Radio.getServers()
document.querySelector('#server').addEventListener("change", event => Radio.getRadio(event.target))