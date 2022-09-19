<template>
  <div>
    <div class="map" id="map-container"></div>
  </div>
</template>

<script>
//1、页面引入
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import defaultMark from '../../assets/bj.png'
export default {
  data() {
    return {
      map: null,
      defaultMark:'',
      latlng:[39.89854, 116.3347],
    };
  },
  //2、初始化地图
  mounted() {
    this.initMap();
  },
  methods: {

    initMap() {
      //1、定义图层样式
      var layer = L.tileLayer("http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}");
      //2、创建地图
      let map = L.map('map-container', {
        center: [39.89854, 116.3347],//中心坐标
        zoom: 10,//缩放级别
        minZoom: 3,
        maxZoom: 14,
        zoomControl: true, //缩放组件
        attributionControl: false, //去掉右下角logol
        layers: [layer],//图层
      });
      this.map = map; // data上需要挂载
      //3、点击事件
      this.map.on('click', i =>{
        console.log('我被点击了')
        // 点击获取地图上的经纬度
        console.log(i.latlng);
        this.latlng = i.latlng;
        this.map.setView(this.latlng);

        //4、点击时自定义弹框样式
        L.popup().setLatLng(this.latlng).setContent('<p>Hello world!<br />Yepi</p>').openOn(this.map);
      });

      //添加一个标记
      L.marker([36.09, 120.35]).addTo(map).bindPopup("Yepi<br>").openPopup();

      //5、设置ICON相关配置
      L.marker([39.885666, 116.12], {
        icon: new L.Icon({
          className: "lmap-icon",
          iconUrl:require('../../assets/bj.png'),
          iconSize: [24, 32],
          iconAnchor: [24, 32],
        })
      }).addTo(this.map);

      //6、自定义ICON图标
      let DefaultIcon2 = L.divIcon({
        className: "lmap-icon",
        html: `<div><span>标3</span><img src="${this.defaultMark}"/></div>`,// shadowUrl: iconShadow,
        iconSize: [24, 41], //  图标的大小    【值1，值2】 为具体你自定义图标的尺寸，比如我图标尺寸是32×52，表示该图标：宽度32像素，高度：52像素，那么值1:就是32，值2：就是52
        shadowSize: [41,41], //  影子的大小    【值1，值2】 为具体你自定义阴影图标的尺寸，比如我图标尺寸是41×41，表示该图标：宽度41像素，高度：41像素，那么值1:就是41，值2：就是41
        iconAnchor: [24, 41], //  图标将对应标记点的位置 这个是重点， 【值1，值2】，值1：为图标坐标第一个值(即32)的一半，值2：为图标坐标第二个值(即52)
        shadowAnchor: [4, 62], // 相同的影子
        popupAnchor: [1, -24] // 该点是相对于iconAnchor弹出信息的位置  这个是我手动调出来的，文档默认原始值是[-1，-76]，我是去一半值，取一半值调出来的
      });
      L.marker(this.latlng, {icon: DefaultIcon2}).addTo(this.map);
    },

  }
};
</script>

<style scoped>
/*注:一定要设置div宽高,否则地图没有空间显示*/
.map {
  margin: auto;
  width: 50vw;
  height: 50vh;
}

</style>
