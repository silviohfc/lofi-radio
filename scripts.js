import servers from './servers.js'

const Radio = {
    player: document.querySelector('#player'),
    select: document.querySelector('#server'),
    placeholder: document.querySelector('#placeholder'),
    radio: document.querySelector('#radio'),

    paused: true,
    volume: 0.7,

    playerControlsContainer: document.querySelector('.player-control'),
    playPauseButton: document.querySelector('.player-control i'),
    volumeController: document.querySelector('.player-control input'),
    
    getRadio(server) {
        const {value: serverUrl } = server
        if (!serverUrl) return

        this.placeholder.remove()

        
        this.load(() => {
            this.updateRadio(serverUrl)
        })

        this.radio.volume = this.volume
    },
    async updateRadio(serverUrl){
        const newRadio = new Audio()
        newRadio.src = serverUrl
        newRadio.id = "radio"
        
        await this.player.replaceChild(newRadio, this.radio)

        this.playPauseButton.classList.remove("fa-pause")
        this.playPauseButton.classList.add("fa-play")
        this.radio = newRadio
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
    },
    async load(callback) {
        this.playerControlsContainer.style.display = "none"
        document.querySelector("#loader").style.display = "block"
        await callback()
        
        setInterval(() => {
            document.querySelector("#loader").style.display = "none"
            this.playerControlsContainer.style.display = "flex"
        }, 1000);
    },
    playPause(event) {

        if (this.paused) {
            this.playPauseButton.classList.remove("fa-play")
            this.playPauseButton.classList.add("fa-pause")

            this.radio.play()
            this.paused = false
        } else {
            this.playPauseButton.classList.remove("fa-pause")
            this.playPauseButton.classList.add("fa-play")

            this.radio.pause()
            this.paused = true
        }
    },
    changeVolume(event) {
        let { value } = event.target
        value = value / 100
        
        this.volume = value
        this.radio.volume = this.volume
    }
}

Radio.getServers()

/* --------------------------------- EVENTS --------------------------------- */
document.querySelector('#server').addEventListener("change", event => Radio.getRadio(event.target))
document.querySelector('.player-control i').addEventListener("click", () => Radio.playPause())
document.querySelector('.player-control input').addEventListener("change", event => Radio.changeVolume(event))