<template>
  <div id="app">
    <nav
      class="navbar is-fixed-top has-background-info-dark noPrint"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- NAVBAR BRAND -->
      <div class="navbar-brand">
        <div class="title is-3 mx-2 has-text-white noPrint">
          Structural Sheets
        </div>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <!-- NAVBAR MENU -->
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <!-- NAVBAR START -->
        <div class="navbar-start is-hidden-tablet">
          <div class="navbar-item">
            <div class="is-flex">
              <button
                class="button mr-2 has-background-info-dark has-text-white"
                @click="toggle('about'), (showNav = !showNav)"
              >
                <span class="icon is-small">
                  <i class="fa fa-home"></i>
                </span>
              </button>
              <div class="control has-icons-left is-flex-grow-1">
                <input
                  type="text"
                  class="input mb-2 "
                  v-model="search"
                  placeholder="Search module"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="navbar-item">
            <button
              v-for="(module, i) in filteredModules"
              :key="i"
              class="button is-small is-fullwidth mb-1 is-success is-outlined noPrint"
              @click="toggle(module.name), (showNav = !showNav)"
            >
              {{ module.title }}
            </button>
          </div>
        </div>
        <!-- NAVBAR END -->
        <div class="navbar-end noPrint is-hidden-mobile">
          <div class="navbar-item">
            <button class="button has-background-info-dark" @click="print">
              <span class="icon is-small has-text-white">
                <i class="fa fa-print"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="container is-fluid">
      <div class="columns is-flex">
        <!-- ++++++++++++++++++++++++++++++++++ -->
        <!-- SIDEBAR -->
        <!-- ++++++++++++++++++++++++++++++++++ -->
        <aside class="column is-3 noPrint mt-4 is-hidden-touch">
          <div class="is-flex noPrint">
            <button
              class="button mr-2 has-background-info-dark has-text-white"
              @click="toggle('about')"
            >
              <span class="icon is-small">
                <i class="fa fa-home"></i>
              </span>
            </button>
            <div class="control has-icons-left is-flex-grow-1">
              <input
                type="text"
                class="input mb-2 "
                v-model="search"
                placeholder="Search module"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <button
            v-for="(module, i) in filteredModules"
            :key="i"
            class="button is-small is-fullwidth mb-1 is-success is-outlined noPrint"
            @click="toggle(module)"
          >
            {{ module.title }}
          </button>
        </aside>
        <!-- SIDEBAR COLUMN -->
        <!-- ++++++++++++++++++++++++++++++++++ -->
        <!-- COMPONENT -->
        <!-- ++++++++++++++++++++++++++++++++++ -->
        <div class="column is-centered onlyPrint mt-4">
          <keep-alive>
            <component v-bind:is="component" v-bind="currentProperties"/>
          </keep-alive>
        </div>
        <!-- COMPONENT COLUMN -->
      </div>
      <!-- COLUMNS -->
    </div>
    <!-- CONTAINER -->
  </div>
  <!-- APP -->
</template>

<script>
import About from "./components/About.vue";
import Home from "./components/Home.vue";
//ANALYSIS
import TemplateGrid from "./components/templates/TemplateGrid.vue";
//ANALYSIS
import SingleSimpleBeam from "./components/analysis/SingleSimpleBeam.vue";
import CantileverBeam from "./components/analysis/CantileverBeam.vue";
import FixedBeam from "./components/analysis/FixedBeam.vue";
import SingleOverhangBeam from "./components/analysis/SingleOverhangBeam.vue";
import LiveLoadReduction from "./components/analysis/LiveLoadReduction.vue";
//STEEL
import SteelShapeProperties from "./components/steel/SteelShapeProperties.vue";
import SteelShapeCapacity from "./components/steel/SteelShapeCapacity.vue";
import SteelBeamDesign from "./components/steel/SteelBeamDesign.vue";
import SteelLintelDesign from "./components/steel/SteelLintelDesign.vue";
//LOADS
import Gravity from "./components/loads/Gravity.vue";
//MASONRY
import Masonry from "./components/masonry/Masonry.vue";
import MasonryLapSplice from "./components/masonry/MasonryLapSplice.vue";
import MasonrySectionCapacity from "./components/masonry/MasonrySectionCapacity.vue";
import MasonryLintel from "./components/masonry/MasonryLintel.vue";
import MasonryPier from "./components/masonry/MasonryPier.vue";
import MasonryBearingWall from "./components/masonry/MasonryBearingWall.vue";
//CONCRETE
import ConcreteSectionCapacity from "./components/concrete/ConcreteSectionCapacity.vue";
//SNOW
import SnowDrift from "./components/snow/SnowDrift.vue";
import SnowFlatRoof from "./components/snow/SnowFlatRoof.vue";
//WIND
import WindPressure from "./components/wind/WindPressure.vue";
//SEISMIC
import SeismicBaseShear from "./components/seismic/SeismicBaseShear.vue";
import SeismicComponentForce from "./components/seismic/SeismicComponentForce.vue";
//WOOD
import WoodSpecies from "./components/wood/WoodSpecies.vue";
import WoodModificationFactors from "./components/wood/WoodModificationFactors.vue";

export default {
  name: "App",
  components: {
    About,
    Home,
    TemplateGrid,
    SingleSimpleBeam, CantileverBeam, FixedBeam, SingleOverhangBeam, LiveLoadReduction,
    SteelShapeProperties, SteelShapeCapacity, SteelBeamDesign, SteelLintelDesign,
    Gravity,
    Masonry, MasonryLapSplice, MasonrySectionCapacity, MasonryLintel, MasonryPier, MasonryBearingWall,
    ConcreteSectionCapacity,
    SnowDrift, SnowFlatRoof,
    WindPressure,
    SeismicBaseShear, SeismicComponentForce,
    WoodSpecies, WoodModificationFactors
  },
  data() {
    return {
      showNav: false,
      component: "About",
      search: "",
      modules: [
        { name: "TemplateGrid", path:"template", title: "Template Grid" },
        { name: "SingleSimpleBeam", path:"analysis", title: "Single Simple Beam" },
        { name: "CantileverBeam", path:"analysis", title: "Cantilever Beam" },
        { name: "FixedBeam", path:"analysis", title: "Fixed Beam" },
        { name: "SingleOverhangBeam", path:"analysis", title: "Single Overhang Beam" },
        { name: "LiveLoadReduction", path:"analysis", title: "Live Load Reduction" },
        { name: "SteelShapeProperties", path:"steel", title: "Steel Shape Properties" },
        { name: "SteelShapeCapacity", path:"steel", title: "Steel Shape Capacity" },
        { name: "SteelBeamDesign", path:"steel", title: "Steel Beam Design" },
        { name: "SteelLintelDesign", path:"steel", title: "Steel Lintel Design" },
        { name: "Gravity", path:"loads", title: "Gravity loads" },
        { name: "MasonrySectionCapacity", path:"masonry", title: "Masonry Section Capacity" },
        { name: "Masonry", path:"masonry", title: "Masonry" },
        { name: "MasonryLapSplice", path:"masonry", title: "Masonry Lap Splice" },
        { name: "MasonryLintel", path:"masonry", title: "Masonry Lintel" },
        { name: "MasonryPier", path:"masonry", title: "Masonry Pier" },
        { name: "MasonryBearingWall", path:"masonry", title: "Masonry Bearing Wall" },
        { name: "ConcreteSectionCapacity", path:"masonry", title: "Concrete Section Capacity" },
        { name: "SnowDrift", path:"snow", title: "Snow Drift" },
        { name: "SnowFlatRoof", path:"snow", title: "Snow Flat Roof" },
        { name: "WindPressure", path:"wind", title: "Wind Pressure" },
        { name: "SeismicBaseShear", path:"seismic", title: "Seismic Base Shear" },
        { name: "SeismicComponentForce", path:"seismic", title: "Seismic Component Force" },
        { name: "WoodSpecies", path:"wood", title: "Wood Species" },
        { name: "WoodModificationFactors", path:"wood", title: "Wood Modification Factors" }
      ]
    }; //RETURN
  }, //DATA
  computed: {
    filteredModules() {
      let searchText = this.search.toLowerCase();

      return this.search == ""
        ? this.modules
        : this.modules.filter(item => {
            let title = item.title.toLowerCase();
            return title.includes(searchText);
          });
    },// FILTERED MODULES
    currentProperties: function() {
      if (this.component === 'About') {
        return { modules: this.modules }
      }
    },//CURRENT PROPERTIES
  }, //COMPUTED
  methods: {
    toggle(item) {
      this.component = item.name;
    },
   
    print() {
      window.print();
    }
  } //METHODS
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.print-only {
  display: none;
}

@media screen {
}

@media print {
  body {
    margin: 0;
    color: #100;
    background-color: #fff;
  }

  header,
  footer,
  aside,
  nav,
  form,
  iframe,
  .menu,
  .hero,
  .adslot {
    display: none !important;
  }

  .no-print {
    display: none !important;
  }

  .print-only {
    display: block;
  }
}
</style>
