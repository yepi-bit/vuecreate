<template>
  <div class="leaflet-map">
    <div id="map"></div>
    <div class="flot-pop">
      <div class="ab gis-box" v-for="(item, index) in popData" :key="index">
        <div class="gis-title" v-if="isShowName" style="color: #fff;border: 1px solid;" @click="changeLayer(1)">
          {{reName}}
        </div>

        <div class="gis-title">
          {{ item.venueName }}
          <a :href="item.url + '?token=' + item.token">进入场馆平台→</a>
        </div>
        <div class="pass-info" v-for="(itm, idx) in item.commandGroupList" :key="idx">
          <p><span>{{ itm.personName }}</span><span>{{ itm.phone }}</span></p>
          <p><span>职务</span><span>{{ itm.rankType }}</span></p>
        </div>
      </div>
    </div>
    <el-dialog :title="dailogTitle" append-to-body :visible.sync="dialogVisible" width="600px">
      <div style="width:100%">
        内容
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  components: {},
  data() {
    return {
      map: null,
      centerGisData: [],
      imageLayer: null,
      BJlayerGroup: null,
      CGlayerGroup: null,
      popData: [{}],
      beijingJson: null,
      reName: "返回市局视图",
      isShowName: false,
      dailogTitle: '国家体育馆',
      dialogVisible:true
    }
  },
  mounted() {
    const _this = this
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map', {
        // crs:L.CRS.EPSG4326,
        minZoom: 9,
        maxZoom: 20,
        center: [40.2312709579888, 116.42829895019533],
        zoom: 9,
        zoomControl: false,
        attributionControl: false
      })

      this.tileLayer = L.tileLayer("http://10.10.12.110:8080/mapcache/gcj3857_dark/{z}/{x}/{y}.jpg", {
        TMS: false
      });
      var imageBounds = [
        [41.430371882652814, 114.4775390625],
        [41.47566020027821, 118.55346679687501],
        [39.07890809706475, 114.46105957031251]
      ]
      var imageUrl = require('../../assets/bj.png');
      this.imageLayer = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
      // this.map.on('click',function (evt) {
      //   debugger
      // })
      var _this = this
      this.CGlayerGroup = L.featureGroup().addTo(this.map);
      this.BJlayerGroup = L.featureGroup().addTo(this.map);

      this.CGlayerGroup.on('click', function (e) {
        if (e && e.stopPropagation)
            //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        else
            //否则，我们需要使用IE的方式来取消事件冒泡
          window.event.cancelBubble = true;

        if (e.layer) {
          var latlng = e.latlng
          _this.getCGTooltip(latlng, e.layer.options.item)
        }
      });
      // this.loadCGPoint();
      // this.initMapLayer();
      this.getAddressArea();
      this.getvenueList();
    },

    getAddressArea() {
      api.getRequest("/china/address/parentId/110000").then(res => {
        if (res.length > 0) {
          this.initMapLayer(res);
        }
      })
    },
    initMapLayer(data) {
      var beijingJson = '{"type": "FeatureCollection",';
      beijingJson += '"features": [';
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var type = "Polygon";
        if (item.name == "朝阳区") {
          var type = "MultiPolygon";
        }
        beijingJson += '{ "type": "Feature", "properties": { "id": "' + item.deptId + '", "name": "' + item.name + '"}, ';
        beijingJson += ' "geometry": { "type": "' + type + '", "coordinates":' + item.gis + '';
        beijingJson += '}}, ';
      }
      beijingJson = beijingJson.substring(0, beijingJson.lastIndexOf(','));
      beijingJson += ']}';

      var latlngs = JSON.parse(beijingJson);
      //加载市辖区
      const _this = this;
      var preta = null;
      this.BJlayerGroup.clearLayers();
      var layerBJ = L.geoJson(latlngs, {
        style: function (item) {
          var color = '#74b3ff';
          return {
            weight: 0.01,
            color: '#74b3ff',
            fillOpacity: 0.01,
            fillColor: color
          }
        },
        onEachFeature: function (feature, layer) {
          const attr = feature.properties
          layer.on({
            click: function (ta) {
              var tar = ta.target
              if (preta != null) {
                layerBJ.resetStyle(preta)
                preta = null
              }
              preta = tar;
              tar.setStyle({
                weight: 2,
                color: '#4afffc',
                fillOpacity: 0.1,
                fillColor: "#4afffc"
              });
              _this.changeLayer(2);
              _this.map.setView([ta.latlng.lat, ta.latlng.lng], 11);
              _this.isShowName = true;
            }
          })
        }
      }).addTo(this.BJlayerGroup);

    },
    changeLayer(type) {
      if (type == 1) {
        this.map.addLayer(this.imageLayer);
        this.map.removeLayer(this.tileLayer);
        this.isShowName = false;
        this.getAddressArea();
        this.localtion();
      }
      else {
        this.map.removeLayer(this.imageLayer);
        this.map.addLayer(this.tileLayer);
      }
    },
    //查询所有场馆列表--用于gis上图
    getvenueList() {
      api.getRequest("/situation/venueList").then(res => {
        if (res.length > 0) {
          this.loadCGPoint(res);
        }
      })
    },
    loadCGPoint(data) {
      // var videoList = [
      //   { latlngs: [40.46261, 115.983935], name: '延庆', id: '1438019946067099649', platformAddress: '/' },
      //   { latlngs: [39.926428, 116.449849], name: '朝阳', id: '1438019946067099649', platformAddress: '/' },
      //   { latlngs: [39.96593, 116.305294], name: '海淀', id: '1438019946067099649', platformAddress: '/' },
      //   { latlngs: [39.911051, 116.229693], name: '石景山', id: '1438019946067099649', platformAddress: '/' },
      // ];
      const _this = this;
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.gis != null) {
          if (item.isHolding == 1) {
            var icon = L.divIcon({
              html: '<div><img src=' + require('../../images/cg.png') + " style='width: 90px;height: 88px;' /></div><div style='color: #ffffff;font-weight:bold;width: 100px;text-align: center;margin-top: -35px;'>" + item.name + '</div>',
              className: 'qypopup_marker',
              iconSize: [90, 88]
            });
          }
          else {
            var icon = L.divIcon({
              html: '<div><img src=' + require('../../images/cg_lx.png') + " style='width: 90px;height: 88px;' /></div><div style='color: #ffffff;font-weight:bold;width: 100px;text-align: center;margin-top: -35px;'>" + item.name + '</div>',
              className: 'qypopup_marker',
              iconSize: [90, 88]
            });
          }
          var LatLng = item.gis.split(",");
          L.marker([LatLng[0], LatLng[1]], {
            icon: icon,
            item: item,
            id: item.id,
          }).bindTooltip(_this.getJLTooltip(item), { direction: 'top', className: "tooltip-top" }).addTo(this.CGlayerGroup)
        }
      }
    },

    async getCGTooltip(item, info) {
      if (info.venueDataList) {
        this.popData = info.venueDataList;
      }
    },
    getJLTooltip: function (item) {
      var tlHtml = `<div style='margin:5px;color: #fff;'>
    			<div style='margin:5px;'><span>场馆：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.deptName}</span></div>
    			<div style='margin:5px;'><span>所属地区名称：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.addressName}</span></div>
				<div style='margin:5px;'><span>详细地址：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.detailedAddress}℃</span></div>
				<div style='margin:5px;'><span>未处置警情数量：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.antiepidemicWarnCount}</span></div>
				<div style='margin:5px;'><span>感知预警：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.gzWarnCount}</span></div>
				<div style='margin:5px;'><span>人员预警：</span><span style='color:#3bc3fd;margin-left:5px;'>${item.personWarnCount}</span></div>
    		</div>`
      return tlHtml;
    },
    localtion() {
      this.map.setView(window.mapSettings.center, window.mapSettings.zoom);
    }
  }
}
</script>

<style lang="less" scoped>

.leaflet-map {
  // width: vw(1000);
  // height: vh(974);
  // position: absolute;
  // left: vw(777);
  width: calc(100% - vw(66));
  height: vh(974);
  position: absolute;
  left: vw(33);
  bottom: 0;
  z-index: 1;

  #map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #012f47;
    z-index: 1;
  }

  .flot-pop {
    max-height: vh(830);
    overflow-y: auto;
    position: absolute;
    top: vh(180);
    right: vw(50);
    z-index: 9;
  }
}
</style>
