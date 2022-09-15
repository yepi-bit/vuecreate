let watermark = {}

let setWatermark = (text, sourceBody) => {
    let id = Math.random()*10000+'-'+Math.random()*10000+'/'+Math.random()*10000

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    can.width = 150
    can.height = 120

    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '15px Vedana'
    cans.fillStyle = 'rgba(0, 0, 0, .5)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(text, can.width / 20, can.height )

    let water_div = document.createElement('div')
    water_div.id = id
    water_div.style.pointerEvents = 'none'
    water_div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    if(sourceBody){
        water_div.style.width = '100%'
        water_div.style.height = '100%'
        sourceBody.appendChild(water_div)
    }else{
        water_div.style.top = '3px'
        water_div.style.left = '0px'
        water_div.style.position = 'fixed'
        water_div.style.zIndex = '100000'
        water_div.style.width = document.documentElement.clientWidth  + 'px'
        water_div.style.height = document.documentElement.clientHeight  + 'px'
        document.body.appendChild(water_div)
    }

    return id
}

/**
 *  该方法只允许调用一次
 *  @param:
 *  @text == 水印内容
 *  @sourceBody == 水印添加在哪里，不传就是body
 * */
watermark.set = (text, sourceBody) => {
    let id = setWatermark(text, sourceBody)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(text, sourceBody)
        }
    }, 2000)
    window.onresize = () => {
        setWatermark(text, sourceBody)
    }
}

export default watermark
