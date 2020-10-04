<template>
  <q-page class="flex flex-center">
    This page is blank, content is currently being developed.
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    console.func('pages/BlankPage:mounted()', arguments)
    this.$core.events.$emit('page_update', { title: { sub: [{ text: 'Blank Page' }] } })
  }
}
</script>
