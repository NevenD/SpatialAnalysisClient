<template>
  <v-dialog v-model="DialogLayers" hide-overlay width="450">
    <v-card>
      <v-img :src="urlCardimg" height="200px"></v-img>
      <v-card-title primary-title></v-card-title>
      <v-card-text>
        <v-layout row wrap align-center>
          <v-expansion-panel light popout v-model="panel" expand focusable>
            <v-expansion-panel-content>
              <v-icon slot="actions" color="success">$vuetify.icons.expand</v-icon>
              <div slot="header">Vector Layers</div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-layout row>
                    <v-flex md6>
                      <v-switch v-model="vectorLandFills" color="success" id="vectorField" @change="onchangeVectorFields" label="Wild landfills"></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.vector" color="green" append-icon="opacity" v-model="VectorOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel light popout>
            <v-expansion-panel-content>
              <v-icon slot="actions" color="success">$vuetify.icons.expand</v-icon>
              <div slot="header">Croatia Base Maps</div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <span class="grey--text">Zoom to map to enable cadastre layer</span>
                  <br />
                  <v-layout row>
                    <v-flex md6>
                      <v-switch v-model="dguDOFSwitch" color="success" id="dof" @change="onChangeDof" label="DOF"></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.dof" color="green" append-icon="opacity" v-model="DOFOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="dof2016" @change="onChangeDof2016" label="DOF/16"></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.dof2016" color="green" append-icon="opacity" v-model="DOF2016Opacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="tk" @change="onChangeTK" label="TK25"></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.tk" color="green" append-icon="opacity" v-model="TKOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <div v-if="CadastreLayerVisibility">
                    <v-divider></v-divider>
                    <v-layout row>
                      <v-flex md6>
                        <v-switch color="success" id="cadastral" @change="onChangeCadastre" label="Cadastral  "></v-switch>
                      </v-flex>
                      <v-flex md6>
                        <v-slider :inverse-label="true" :disabled="slider.cadastre" color="green" append-icon="opacity" v-model="CadastreOpacity" thumb-label></v-slider>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel light popout>
            <v-expansion-panel-content>
              <v-icon slot="actions" color="success">$vuetify.icons.expand</v-icon>
              <div slot="header">World Base Maps</div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="bing" @change="onChangeMapbox" label="Mapbox layer  "></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.mapbox" color="green" append-icon="opacity" v-model="MapboxOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="bing" @change="onChangeBing" label="Bing map  "></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.bing" color="green" append-icon="opacity" v-model="BingOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="topoosm" @change="onChangeTopoOSM" label="Topographic layer  "></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.topoOSM" color="green" append-icon="opacity" v-model="TopoOSMOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row>
                    <v-flex md6>
                      <v-switch color="success" id="osm" @change="onChangeOSM" label="OpenStreet Map  "></v-switch>
                    </v-flex>
                    <v-flex md6>
                      <v-slider :inverse-label="true" :disabled="slider.osm" color="green" append-icon="opacity" v-model="OSMOpacity" thumb-label></v-slider>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import dof_rh from "@/assets/images/dof.jpg";
import tk_rh from "@/assets/images/tk.jpg";
import mapbox from "@/assets/images/mapbox.png";
export default {
  data() {
    {
      return {
        panel: [true],
        geoTIFFLayer: false,
        shapeFileLayer: false,
        dguDOFSwitch: true,
        vectorLandFills: true,
        DOFOpacity: 100,
        CadastreOpacity: 100,
        DOF2016Opacity: 100,
        TKOpacity: 100,
        BingOpacity: 100,
        TopoOSMOpacity: 100,
        OSMOpacity: 100,
        MapboxOpacity: 100,
        VectorOpacity: 100,
        VECTOR_LIST: null,
        url: {
          default: mapbox,
          dof: dof_rh,
          tk: tk_rh
        },
        slider: {
          dof: false,
          dof2016: true,
          cadastre: true,
          tk: true,
          vector: false,
          topoOSM: true,
          osm: true,
          mapbox: false,
          bing: true
        },
        urlCardimg: "",
        dispatch: this.$store.dispatch,
        get: this.$store.getters
      };
    }
  },
  methods: {
    onchangeVectorFields(event) {
      if (event) {
        this.slider.vector = false;

        this.get.olMap.addLayer(this.get._GEOJSON_CRO_FIELDS);
        var that = this;
        setTimeout(() => {
          // show vector layer list fab
          this.dispatch("_UpdateVectorListFAB_", true);
          // source.forEachFeature

          this.dispatch("_UpdateVectorListFAB_", true);

          this.dispatch("_UpdateDrawVectorFAB_", true);

          var source = that.get._GEOJSON_CRO_FIELDS.getSource();
          // update vector value features to vuex store
          that.dispatch("_UPDATE_VECTOR_LIST", source.getFeatures());
        }, 500);
      } else {
        // show vector layer list fab
        this.dispatch("_UpdateVectorListFAB_", false);
        this.dispatch("_UpdateDrawVectorFAB_", false);

        // delete vector value features to vuex store
        this.dispatch("_UPDATE_VECTOR_LIST", null);
        this.slider.vector = true;
        this.VECTOR_LIST = null;
        this.VectorOpacity = 100;
        this.get.olMap.removeLayer(this.get._GEOJSON_CRO_FIELDS);
      }
    },
    onChangeDof(event) {
      if (event == true) {
        this.slider.dof = false;
        this.urlCardimg = this.url.dof;
        this.get.olMap.addLayer(this.get._DGU_DOF);

        let dguValue =
          "Digitalna ortofoto karta (DOF5) je službena državna karta i izrađuje se u mjerilu 1:5 000 za cjelokupno područje Republike Hrvatske. Podaci ustupljeni od strange DGU-a";
        this.dispatch("_UPDATE_DOF_ATTRIBUTIONS_", dguValue);
      } else {
        this.slider.dof = true;

        this.dispatch("_UPDATE_DOF_ATTRIBUTIONS_", null);

        var checkBoxTK = document.getElementById("tk");

        if (checkBoxTK.checked == true) {
          this.urlCardimg = this.url.tk;
        } else {
          this.urlCardimg = this.url.default;
        }

        this.DOFOpacity = 100;
        this.get.olMap.removeLayer(this.get._DGU_DOF);
      }
    },
    onChangeDof2016(event) {
      if (event) {
        this.slider.dof2016 = false;
        this.urlCardimg = this.url.dof;
        this.get.olMap.addLayer(this.get._DGU_DOF_2016);
      } else {
        this.slider.dof2016 = true;

        this.dispatch("_UPDATE_DOF_ATTRIBUTIONS_", null);

        var checkBoxTK = document.getElementById("tk");

        if (checkBoxTK.checked == true) {
          this.urlCardimg = this.url.tk;
        } else {
          this.urlCardimg = this.url.default;
        }

        this.DOF2016Opacity = 100;
        this.get.olMap.removeLayer(this.get._DGU_DOF_2016);
      }
    },
    onChangeTK(event) {
      if (event == true) {
        this.slider.tk = false;
        this.urlCardimg = this.url.tk;
        this.get.olMap.addLayer(this.get._DGU_TK25);

        let tkValue =
          "Topografska karta (TK25) je osnovna službena državna karta i izrađuje se u mjerilu 1:25000. Službena državna karta kodirana je slika prirodnih i izgrađenih objekata zemljine površine koja se izrađuje za cjelokupno područje Republike Hrvatske. Podaci ustupljeni od strange DGU-a";
        this.dispatch("_UPDATE_TK_ATTRIBUTIONS_", tkValue);
      } else {
        this.slider.tk = true;

        this.dispatch("_UPDATE_TK_ATTRIBUTIONS_", null);

        var checkBoxDOF = document.getElementById("dof");

        if (checkBoxDOF.checked == true) {
          this.urlCardimg = this.url.dof;
        } else {
          this.urlCardimg = this.url.default;
        }
        this.TKOpacity = 100;
        this.get.olMap.removeLayer(this.get._DGU_TK25);
      }
    },
    onChangeCorine(event) {
      if (event == true) {
        this.slider.corine = false;
        this.urlCardimg = this.url.corine;

        this.dispatch("_UpdateCorineFAB_", true);
        this.get.olMap.addLayer(this.get._CORINE);

        let corine =
          "CLC Hrvatska predstavlja digitalnu bazu podataka o stanju i promjenama zemljišnog pokrova Republike Hrvatske. Podaci ustupljeni od Hrvatske agencije za zaštitu okoliša";
        this.dispatch("_UPDATE_CORINE_ATTRIBUTIONS_", corine);
      } else {
        this.slider.corine = true;
        this.dispatch("_UpdateCorineFAB_", false);
        this.dispatch("_UPDATE_CORINE_ATTRIBUTIONS_", null);
        var checkBoxDOF = document.getElementById("dof");
        var checkBoxTK = document.getElementById("tk");

        if (checkBoxDOF.checked == true) {
          this.urlCardimg = this.url.dof;
        } else if (checkBoxTK.checked == true) {
          this.urlCardimg = this.url.tk;
        } else {
          this.urlCardimg = this.url.default;
        }
        this.CorineOpacity = 100;
        this.get.olMap.removeLayer(this.get._CORINE);
      }
    },
    onChangeMapbox(event) {
      if (event == true) {
        this.slider.mapbox = false;
        this.get.olMap.addLayer(this.get._MAPBOX);
      } else {
        this.slider.mapbox = true;
        this.MapboxOpacity = 100;
        this.get.olMap.removeLayer(this.get._MAPBOX);
      }
    },
    onChangeBing(event) {
      if (event == true) {
        this.slider.bing = false;

        let bingValue = "© Microsoft Maps - Aerial";
        this.get.olMap.addLayer(this.get._BING);
        this.dispatch("_UPDATE_BING_ATTRIBUTIONS_", bingValue);
      } else {
        this.slider.bing = true;

        this.dispatch("_UPDATE_BING_ATTRIBUTIONS_", null);

        this.BingOpacity = 100;
        this.get.olMap.removeLayer(this.get._BING);
      }
    },
    onChangeTopoOSM(event) {
      if (event == true) {
        this.slider.topoOSM = false;
        this.get.olMap.addLayer(this.get._OPENTOPO_MAP);
      } else {
        this.slider.topoOSM = true;
        this.TopoOSMOpacity = 100;
        this.get.olMap.removeLayer(this.get._OPENTOPO_MAP);
      }
    },
    onChangeOSM(event) {
      if (event == true) {
        this.slider.osm = false;
        this.get.olMap.addLayer(this.get._OSM_MAP);
      } else {
        this.slider.osm = true;
        this.OSMOpacity = 100;
        this.get.olMap.removeLayer(this.get._OSM_MAP);
      }
    },
    onChangeCadastre(event) {
      if (event == true) {
        this.slider.cadastre = false;
        this.get.olMap.addLayer(this.get._DGU_CADASTRAL);
      } else {
        this.slider.cadastre = true;
        this.CadastreOpacity = 100;
        this.get.olMap.removeLayer(this.get._DGU_CADASTRAL);
      }
    }
  },
  computed: {
    DialogLayers: {
      get: function() {
        return this.get.dialogLayers;
      },
      set: function() {
        this.dispatch("_UpdateDialogLayers_", false);
      }
    },
    CadastreLayerVisibility() {
      // get current zoom number of map
      let cadastreLayerVisibility = this.get.olMap.getView().getZoom();

      // if layer zoom is greater than 14 show layer
      if (cadastreLayerVisibility > 14) {
        return true;
      } else {
        // remove layer if if zoom out
        this.get.olMap.removeLayer(this.get._DGU_CADASTRAL);
        // reset opacity to 100
        this.CadastreOpacity = 100;
        // disable slider
        this.slider.cadastre = true;
        return false;
      }
    }
  },
  watch: {
    DOFOpacity() {
      this.get._DGU_DOF.setOpacity(this.DOFOpacity / 100);
    },
    DOF2016Opacity() {
      this.get._DGU_DOF_2016.setOpacity(this.DOF2016Opacity / 100);
    },
    TKOpacity() {
      this.get._DGU_TK25.setOpacity(this.TKOpacity / 100);
    },
    CadastreOpacity() {
      this.get._DGU_CADASTRAL.setOpacity(this.CadastreOpacity / 100);
    },
    VectorOpacity() {
      this.get._GEOJSON_CRO_FIELDS.setOpacity(this.VectorOpacity / 100);
    },
    MapboxOpacity() {
      this.get._MAPBOX.setOpacity(this.MapboxOpacity / 100);
    },
    BingOpacity: function() {
      this.get._BING.setOpacity(this.BingOpacity / 100);
    },
    TopoOSMOpacity() {
      this.get._OPENTOPO_MAP.setOpacity(this.TopoOSMOpacity / 100);
    },
    OSMOpacity() {
      this.get._OSM_MAP.setOpacity(this.OSMOpacity / 100);
    }
  },
  mounted() {
    this.$nextTick(() => {
      // show osm image on layers card
      this.urlCardimg = this.url.default;
    });
  }
};
</script>
<style>
</style>
