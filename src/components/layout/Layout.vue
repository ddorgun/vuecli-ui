<template>
  <v-app :dark="dark">
    <v-progress-linear v-if="getRouterLoader"
      :indeterminate="true" class="progress"></v-progress-linear>
    <tool-bar :expand="primaryDrawer.mini" @update:expand="toggle"></tool-bar>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      clipped
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <menus :mini-value="primaryDrawer.mini"></menus>
    </v-navigation-drawer>
    <v-content>
      <transition>
       <router-view></router-view>
      </transition>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 md6>
                    <span>Scheme</span>
                    1111{{getRouterLoader}}
                    <v-switch v-model="dark" primary label="Dark"></v-switch>
                  </v-flex>
                  <v-flex xs12 md6>
                    <span>Drawer</span>
                    <v-radio-group v-model="primaryDrawer.type" column>
                      <v-radio
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                    <v-switch v-model="primaryDrawer.clipped" label="Clipped" primary></v-switch>
                    <v-switch v-model="primaryDrawer.floating" label="Floating" primary></v-switch>
                    <v-switch v-model="primaryDrawer.mini" label="Mini" primary></v-switch>
                    <v-btn @click="login">login</v-btn>
                  </v-flex>
                  <v-flex xs12 md6>
                    <span>Footer</span>
                    <v-switch v-model="footer.inset" label="Inset" primary></v-switch>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat>Cancel</v-btn>
                <v-btn flat color="primary">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ToolBar from './ToolBar.vue';
import Menus from './Menus.vue';

export default {
  components: {
    ToolBar,
    Menus,
  },
  computed: {
    ...mapGetters('store', ['getRouterLoader']),
  },
  data: () => ({
    dark: true,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    footer: {
      inset: false,
    },
  }),
  methods: {
    toggle() {
      this.primaryDrawer.mini = !this.primaryDrawer.mini;
    },
    ...mapActions('auth', ['login', 'logout']),
  },
};
</script>

<style scoped>
.progress {
  z-index: 10;
  margin: 0;
  position: absolute;
}
</style>
