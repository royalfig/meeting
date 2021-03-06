<template>
  <header class="header" :class="{ 'header--scrolled': pageScrolled }">
    <div class="header__left">
      <MenuToggle v-if="menuToggle" />
      <Logo :color="logoColor" />
    </div>
    <nav class="nav">
      <ThemeSwitch v-on:theme-change="updateLogo" />
    </nav>
  </header>
</template>

<script>
import ThemeSwitch from "~/components/ThemeSwitch.vue";
import MenuToggle from "~/components/MenuToggle.vue";
import Logo from "~/components/Logo.vue";
import throttle from "lodash/throttle";

export default {
  components: {
    ThemeSwitch,
    MenuToggle,
    Logo,
  },
  props: {
    menuToggle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pageScrolled: false,
      logoColor: "bright",
    };
  },
  methods: {
    updateLogo: function() {
      this.logoColor = this.logoColor == "dark" ? "bright" : "dark";
    },
    headerScroll: function() {
      let fromTop = window.scrollY;

      if (
        (fromTop > 40 && this.pageScrolled == false) ||
        (fromTop <= 40 && this.pageScrolled == true)
      ) {
        this.pageScrolled = !this.pageScrolled;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.headerScroll);

    if (process.isClient) {
      this.logoColor = localStorage.getItem("theme");
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: -12px;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  border-bottom: 1px solid transparent;
  transition: padding 0.15s linear, background 0.15s linear,
    border-color 0.15s linear;
  will-change: padding, background;

  @include respond-above(sm) {
    padding: 30px;
  }

  &--scrolled {
    // @include respond-below(sm) {
    padding: 15px 30px;

    .dark & {
      background: $sidebarDark;
      border-color: shade($sidebarDark, 40%);
    }

    .bright & {
      background: $sidebarBright;
      border-color: shade($sidebarBright, 10%);
    }
    // }
  }

  &__left {
    display: flex;
  }
}

nav {
  display: flex;
}
</style>
