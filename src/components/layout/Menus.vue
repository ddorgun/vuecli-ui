<template>
  <div>
  <v-list :expand="true">
    <v-list-tile @click.stop="go('home')">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>Home</v-list-tile-title>
    </v-list-tile>

    <v-list-group prepend-icon="account_circle" :value="menuExpand">
      <v-list-tile slot="activator">
        <v-list-tile-title>Users</v-list-tile-title>
      </v-list-tile>

      <v-list-group no-action sub-group v-if="!miniValue">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-for="(admin, i) in admins" :key="i" @click.stop="go(admin[0])">
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

      <v-list-group sub-group no-action v-if="!miniValue">
        <v-list-tile slot="activator">
          <v-list-tile-title>Actions</v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-for="(crud, i) in cruds" :key="i" @click.stop="go(crud[0])">
          <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="crud[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list-group>

    <v-list-group prepend-icon="settings" :value="menuExpand">
      <v-list-tile slot="activator">
        <v-list-tile-title>Admin</v-list-tile-title>
      </v-list-tile>

      <v-list-group no-action sub-group v-if="!miniValue">
        <v-list-tile slot="activator">
          <v-list-tile-title>Admin</v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-for="(admin, i) in admins" :key="i" @click.stop="go(admin[0])">
          <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="admin[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>

      <v-list-group sub-group no-action v-if="!miniValue">
        <v-list-tile slot="activator">
          <v-list-tile-title>Actions</v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-for="(crud, i) in cruds" :key="i" @click.stop="go(crud[0])">
          <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
          <v-list-tile-action>
            <v-icon v-text="crud[1]"></v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list-group>
  </v-list>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  props: {
    miniValue: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    admins: [['Management', 'people_outline'], ['Settings', 'settings']],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete'],
    ],
    menuExpand: null,
  }),
  watch: {
    miniValue: function miniValue(val) {
      if (val) {
        this.menuExpand = !val;
        setTimeout(() => { this.menuExpand = null; }, 1000);
      }
    },
  },
  methods: {
    go(key) {
      /* eslint-disable no-console */
      console.log(`key=${key}`);
    },
  },
};
</script>
