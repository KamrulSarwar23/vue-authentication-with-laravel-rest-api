<template>
  <div class="shimmer-wrapper">
    <div class="shimmer"></div>
  </div>
</template>

<style scoped>
.shimmer-wrapper {
  height: 20px;
  width: 100%;
  background: #f6f7f8;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
}

.shimmer {
  height: 100%;
  width: 50%;
  background: linear-gradient(to right, #f6f7f8 0%, #e0e0e0 50%, #f6f7f8 100%);
  animation: shimmer 1.5s infinite;
  position: absolute;
  top: 0;
  left: -50%;
}

@keyframes shimmer {
  100% {
    left: 100%;
  }
}
</style>
