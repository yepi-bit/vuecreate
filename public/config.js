window.urlconfig = {
    //apiUrl: "http://74.30.10.15:10000", //打包后的ip地址
    apiUrl: "http://10.10.12.216:8001", //打包后的ip地址
    vedioUrl: "http://10.10.12.190:20000", //打包后的ip地址
    imgUrl: "http://74.30.10.11/", //文件服务器地址
    md5Url: "http://74.30.10.22/idimage/",
}
window.configs = {
    title : "Yepi-bit"
}
// 大屏模块相关配置
window.mapSettings = {
    minZoom: 9,
    maxZoom: 20,
    center: [40.2312709579888, 116.42829895019533],
    zoom: 9,
    // tileUrl: 'http://39.101.195.215:8002/map/mapcache/gcj3857_dark/{z}/{x}/{y}.jpg'
    tileUrl: 'http://10.10.12.110:8080/mapcache/gcj3857_dark/{z}/{x}/{y}.jpg'
};
