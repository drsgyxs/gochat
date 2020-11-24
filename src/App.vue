<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: inherit;
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: 0 0;
  border-radius: 5px;
  // background: #ddd;
}
::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 3px;
}

a {
  color: #0366d6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
