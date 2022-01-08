<template>
  <div class="network-error">
    <h1>Uh-oh!</h1>

    <h3>
      It looks like you're experiencing some network issue, please take a breath
      and <a href="#" @click="$router.go(-1)">Click Here</a> to try again.
    </h3>
  </div>
</template>
