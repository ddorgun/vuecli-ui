<template>
  <v-toolbar :clipped-left="true" app absolute>
    <v-toolbar-side-icon
      @click.stop="slider"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Vuetify</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    expand: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    slider: function slider() {
      this.$emit('update:expand', this.expand);
    },
  },
};
</script>
