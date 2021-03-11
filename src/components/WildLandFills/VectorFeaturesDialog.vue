   <template>
  <v-dialog hide-overlay v-model="VectorFeaturesFields" max-width="450px">
    <v-card>
      <v-img :src="headerImg" height="200px">
        <v-layout column fill-height>
          <v-card-title class="white--text pl-5 pt-5">
            <div class="display-1 pl-5 pt-5 font-weight-light">{{FieldName}}</div>
          </v-card-title>
        </v-layout>
      </v-img>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="gray">subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>Location: </b>{{FieldLocation}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="gray">subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>Description: </b>{{FieldDesc}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="gray">subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>Category Type: </b>{{FieldCategoryType}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="gray">subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>Area:</b>
              {{FieldArea}}
              <span> m<sup>2</sup>
              </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="gray">subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <b>Recorded date:</b>
              {{FieldDate}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import header_img from "@/assets/images/field_header.jpg";

export default {
  data() {
    return {
      headerImg: header_img,
      get: this.$store.getters,
      dispatch: this.$store.dispatch
    };
  },
  computed: {
    VectorFeaturesFields: {
      get: function() {
        return this.get.dialogFeatures;
      },
      set: function() {
        this.dispatch("_UpdateDialogFeatures_", false);
      }
    },
    FieldName() {
      return this.get._PROPERTY_NAME;
    },
    FieldDesc() {
      return this.get._PROPERTY_DESC;
    },
    FieldArea() {
      if (this.get._PROPERTY_AREA != null) {
        return this.get._PROPERTY_AREA.toFixed(2);
      } else {
        return this.get._PROPERTY_AREA;
      }
    },
    FieldLocation() {
      return this.get._PROPERTY_LOCATION;
    },
    FieldCategoryType() {
      return this.get._PROPERTY_CATEGORY_TYPE;
    },
    FieldDate() {
      return this.get._PROPERTY_DATE;
    }
  }
};
</script>
