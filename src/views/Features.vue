<template>
  <v-container class="features">
    <div class="font-weight-thin display-1">List of functionalities:</div>
    <v-layout>
      <v-tooltip top>
        <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
          <v-icon left small>folder</v-icon>
          <span class="caption text-lowercase">By functionality name</span>
        </v-btn>
        <span>Sort functionalities by name</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn small flat color="grey" @click="sortBy('desc')" slot="activator">
          <v-icon left small>tab</v-icon>
          <span class="caption text-lowercase">By description</span>
        </v-btn>
        <span>Sort implementation by description</span>
      </v-tooltip>
    </v-layout>
    <v-card v-for="project in projects" :key="project.title">
      <v-layout row wrap :class="`pa-3 project ${project.status}`">
        <v-flex xs12 md4>
          <div class="caption grey--text">App functionalities</div>
          <div>{{project.title}}</div>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <div class="caption grey--text">Details</div>
          <div>{{project.desc}}</div>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <div class="right">
            <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: "Added map view with vector list",
          desc:
            "Created map view with popup window that contains list of drawn features",
          status: "implemented"
        },
        {
          title: "Integrated vector layer",
          desc:
            "Implemented view, zoom to extent and get feature properties on click",
          status: "implemented"
        },
        {
          title: "Added draw polygon interaction",
          desc:
            "Integrated ability to draw wild landfills with properties such as: name, description, location, recorded, date and automatic calculation of area",
          status: "implemented"
        },
        {
          title: "Added view interactions",
          desc:
            "Changed visuals of zoom in, zoom out, zoom to extent and hove view. Added ability to reset rotation if rotation is not 0 degrees",
          status: "implemented"
        },
        {
          title: "Added map controls",
          desc:
            "Added ability to show/hide additional map elements like attribution, coordinates, scalebar and minimap",
          status: "implemented"
        },
        {
          title: "Added measure feature",
          desc: "Implemented ability to measure area and length",
          status: "implemented"
        },
        {
          title: "Implemented viewing details on feature click",
          desc: "On vector click popup with additional information opens",
          status: "implemented"
        },
        {
          title: "Integrated basemap layers",
          desc:
            "Added several basemap layers wit added ability to change opacity",
          status: "implemented"
        },
        {
          title: "Added validation",
          desc:
            "Added validation foir input fields (Name, Location, Category Type) on saving drawn features",
          status: "implemented"
        },
        {
          title: "Add backend logic",
          desc:
            "Create backend logic for existing app. Create functionality for adding properties and vector geometries in db (SQL or PostgreSQL).Save and render geometry using .NET Core",
          status: "todo"
        },
        {
          title: "Modify",
          desc: "Add ability to modify drawn layers",
          status: "todo"
        },
        {
          title: "Graphs",
          desc: "Add ability to view wild landfills using graphs presentation ",
          status: "todo"
        },
        {
          title: "Filters",
          desc: "Add ability to implement filtering vectors by attributes",
          status: "todo"
        }
      ]
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.features {
  height: calc(100vh - 100px);
  overflow-y: scroll;
}

.project.implemented {
  border-left: 6px solid #3cd1c2;
}
.project.ongoing {
  border-left: 6px solid orange;
}
.project.todo {
  border-left: 6px solid tomato;
}
.v-chip.implemented {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.todo {
  background: tomato;
}
</style>