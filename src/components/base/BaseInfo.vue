<template>
  <q-banner class="bg-orange-1">
    <div class="flex row items-center">
      <div class="col-auto q-mr-md avatar">
        <slot name="avatar">
          <q-icon size="sm" name="fas fa-info-circle" color="warning" />
        </slot>
      </div>
      <div class="col message">
        <slot></slot>
      </div>
    </div>
  </q-banner>
</template>
