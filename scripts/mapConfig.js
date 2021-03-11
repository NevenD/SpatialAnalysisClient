import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";
import Attribution from "ol/control/Attribution";
import ScaleLine from "ol/control/ScaleLine";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import DragZoom from 'ol/interaction/DragZoom';
import { always } from 'ol/events/condition';
import { defaults as defaultInteractions } from "ol/interaction";
import OverviewMap from "ol/control/OverviewMap";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import { fromLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Snap from "ol/interaction/Snap";
import GeoJSON from "ol/format/GeoJSON";
import WKT from "ol/format/WKT";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import { getArea, getLength } from "ol/sphere";
import BingMaps from "ol/source/BingMaps";


//#region RASTER LAYERS
let dguDofCro = new TileLayer({
  source: new TileWMS({
    url: "http://geoportal.dgu.hr/wms?",
    params: {
      LAYERS: "DOF",
      FORMAT: "image/png",
      TRANSPARENT: true
    },
    attributions: [],
    name: "DOF_CRO"
  })
});

let bingMap = new TileLayer({
  source: new BingMaps({
    key: process.env.VUE_APP_BING,
    imagerySet: "Aerial",
    culture: "en-us"
  })
});

let mapboxMap = new TileLayer({
  source: new XYZ({
    url: "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=" + process.env.VUE_APP_MAPBOX
  })
});

// weather map
// air temperature at height of 2 meters
// in free plan we can use Weather maps 1.0
let tempMap = new TileLayer({
  source: new XYZ({
    url: "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=" + process.env.VUE_APP_WEATHER
  })
});

let dguCadastral = new TileLayer({
  source: new TileWMS({
    url: "https://oss.uredjenazemlja.hr/OssWebServices/inspireService/wms?token=" + process.env.VUE_APP_CADASTRE_RH,
    params: {
      LAYERS: "CP.CadastralZoning,CP.CadastralParcel",
      FORMAT: "image/png",
      TRANSPARENT: true
    },
    zIndex: 9999
  })
});

let dguDofCro2016 = new TileLayer({
  source: new TileWMS({
    url: "http://geoportal.dgu.hr/services/inspire/orthophoto_2014-2016/wms",
    params: {
      LAYERS: "OI.OrthoImagery",
      FORMAT: "image/png",
      TRANSPARENT: true
    },
    attributions: []
  })
});

let corineCro = new TileLayer({
  source: new TileWMS({
    url: "http://servisi.azo.hr/tlo/wms?",
    params: {
      LAYERS: "clc2018",
      FORMAT: "image/png",
      TRANSPARENT: true
    },
    attributions: []
  })
});

let dguTK25Cro = new TileLayer({
  source: new TileWMS({
    url: "http://geoportal.dgu.hr/wms?",
    params: {
      LAYERS: "TK25",
      FORMAT: "image/png",
      TRANSPARENT: true
    },
    attributions: []
  })
});

let openTopoMap = new TileLayer({
  source: new XYZ({
    url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attributions: []
  })
});

let tileOSMMap = new TileLayer({
  source: new XYZ({
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attributions: []
  })
});
//#endregion



//#region DRAW LAYERS

let styleAfterDraw = new Style({
  fill: new Fill({
    color: "#5df184ab",
  }),
  stroke: new Stroke({
    color: "#fff",
    width: 2
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: "#5df184ab"
    }),
    stroke: new Stroke({
      color: "#fbfdff",
      width: 2
    })
  })
});
let styleDuringDraw = new Style({
  fill: new Fill({
    color: "#5df184ab",
  }),
  stroke: new Stroke({
    color: "#fff",
    width: 2,
    lineCap: "square",
    lineDash: [10, 10],
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: "#5df184ab"
    }),
    stroke: new Stroke({
      color: "#fbfdff",
      width: 2
    })
  })
});

let vectordrawSource = new VectorSource();
let vectorDrawLayer = new Vector({
  source: vectordrawSource,
  zIndex: 9998,
  style: styleAfterDraw
});

let drawInteractionPolygon = new Draw({
  type: "Polygon",
  source: vectorDrawLayer.getSource(),
  style: styleDuringDraw
});

let snapVectorDraw = new Snap({
  source: vectorDrawLayer.getSource()
});

//#endregion

//#region VECTOR LAYERS
let sourceGeojson = new VectorSource({
  url: "geojson/odlagalista_otpada.geojson",
  format: new GeoJSON()
});

let vectorCroFields = new Vector({
  source: sourceGeojson,
  style: new Style({
    fill: new Fill({
      color: "#38888099"
    }),
    stroke: new Stroke({
      color: "#fdffff",
      width: 3
    })
  }),
  zIndex: 9998,
  layer_name: "fields"
});

//#endregion

//#region VECTOR LAYER INTERACTION

let geojson = new GeoJSON();

let style = new Style({
  fill: new Fill({
    color: "#5df184ab",
    width: 2
  }),
  stroke: new Stroke({
    color: "#fff",
    width: 2
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: "#5df184ab"
    }),
    stroke: new Stroke({
      color: "#fbfdff",
      width: 2
    })
  })
});

let styleShapes = new Style({
  fill: new Fill({
    color: "#e23812ba",
    width: 2
  }),
  stroke: new Stroke({
    color: "#fff",
    width: 2
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: "#e23812"
    }),
    stroke: new Stroke({
      color: "#fbfdff",
      width: 2
    })
  })
});

let source = new VectorSource();
let vector = new Vector({
  source: source,
  zIndex: 9998,
  style: style
});

let vectorShape = new VectorSource({ wrapX: false });
let vectorShapes = new Vector({
  source: vectorShape,
  style: styleShapes,
  zIndex: 9998
});

let drawArea = new Draw({
  type: "Polygon",
  source: vectorCroFields.getSource(),
  style: style
});

let drawPoint = new Draw({
  type: "Point",
  source: vector.getSource()
});


let snap = new Snap({
  source: vector.getSource()
});

let dragZoom = new DragZoom({
  duration: 500,
  condition: always
});
//#endregion

//#region MEASURE

let sourceMeasure = new VectorSource();
let vectorMeasure = new Vector({
  source: sourceMeasure,
  style: new Style({
    fill: new Fill({
      color: "rgb(255,255,255,0.3)"
    }),
    stroke: new Stroke({
      color: "#f44336",
      lineCap: "square",
      lineDash: [10, 10],
      width: 3
    })
  }),
  zIndex: 99999
});

let styleMeasureArea = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.3)"
  }),
  stroke: new Stroke({
    color: "#f44336",
    lineCap: "square",
    lineDash: [10, 10],
    width: 2
  }),
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)"
    }),
    stroke: new Stroke({
      color: "#f44336"
    })
  })
});

let drawMeasureArea = new Draw({
  source: vectorMeasure.getSource(),
  type: "Polygon",
  style: styleMeasureArea
});

let drawMeasureLength = new Draw({
  source: vectorMeasure.getSource(),
  type: "LineString",
  style: styleMeasureArea
});

let formatArea = function (polygon) {
  let area = getArea(polygon);

  let output;
  let supValue = "2";
  if (area > 50000) {
    output = Math.round((area / 1000000) * 100) / 100 + " " + "km" + supValue.sup();
  } else {
    output = Math.round(area * 100) / 100 + " " + "m" + supValue.sup();
  }
  return output;
};

let formatLength = function (line) {
  let length = getLength(line);
  let output;
  if (length > 1000) {
    output = Math.round((length / 1000) * 100) / 100 + " " + "km";
  } else {
    output = Math.round(length * 100) / 100 + " " + "m";
  }
  return output;
};

//#endregion

//#region MAP SETTINGS

let attributionControl = new Attribution({
  collapsible: false,
  collapsed: false
});

let miniMap = new OverviewMap({
  className: "ol-overviewmap ol-custom-overviewmap",
  collapsed: false,
  collapsible: false
});

let scaleLine = new ScaleLine({
  className: "ol-scale-line-vue"
});

let coords = document.getElementById("cords");
let mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: "EPSG:4326",
  target: coords,
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: "ol-mouse-position",
  undefinedHTML: "...outside map..."
});

let homeViewMap = fromLonLat([16.207458, 44.652329]);
//#endregion


//#region MAP WITH VIEW
let map = new Map({
  interactions: defaultInteractions({
    mouseWheelZoom: false,
    doubleClickZoom: false,
    snapVectorDraw
  }).extend([
    new MouseWheelZoom({
      duration: 750
    })
  ]),
  layers: [dguDofCro, vectorCroFields, vectorShapes, vectorMeasure],
  controls: []
});
let view = new View({
  center: homeViewMap,
  zoom: 8,
  projection: "EPSG:3857"
});

//#endregion

//#region  ADDING OVERLAY
let vectorOverlayCro = new Vector({
  source: new VectorSource(),
  map: map,
  style: new Style({
    fill: new Fill({
      color: "#4caf508f"
    }),
    stroke: new Stroke({
      color: "#fff",
      width: 2
    })
  })
});

//#endregion

export { map, view, homeViewMap, vectorDrawLayer, drawInteractionPolygon, snapVectorDraw, dguDofCro, dguCadastral, bingMap, mapboxMap, tempMap, openTopoMap, tileOSMMap, dguDofCro2016, dguTK25Cro, corineCro, attributionControl, miniMap, scaleLine, mousePositionControl, source, geojson, vector, vectorShapes, drawArea, drawPoint, snap, drawMeasureArea, drawMeasureLength, formatArea, formatLength, vectorMeasure, vectorCroFields, vectorOverlayCro, dragZoom };
