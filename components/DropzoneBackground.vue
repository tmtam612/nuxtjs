<script lang="ts" setup></script>

<template>
	<div class="dropzone-background">
		<div class="overlay">
			<slot />
		</div>
	</div>
</template>
<style>
.dropzone-background {
	position: relative;
	height: 100%;
	width: 100%;
}

.dropzone-background .overlay {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	pointer-events: none;
}
</style>
