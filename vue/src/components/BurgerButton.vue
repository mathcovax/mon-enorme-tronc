<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['isActive']);

const isActive = ref(false);

const toggleMenu = () => {
	isActive.value = !isActive.value;
	emit('isActive', isActive.value);
};
</script>

<template>
	<button @click="toggleMenu" class="lg:hidden relative w-7 h-7">
		<div
			class="flex flex-col justify-between w-7 h-7 transform transition-all duration-300 origin-center overflow-hidden">
			<div class="bg-black h-1 w-7 transform transition-all duration-300 origin-left"
				:class="{ 'translate-x-10': isActive }"></div>
			<div class="bg-black h-1 w-7 rounded transform transition-all duration-300 delay-75"
				:class="{ 'translate-x-10': isActive }"></div>
			<div class="bg-black h-1 w-7 transform transition-all duration-300 origin-left delay-150"
				:class="{ 'translate-x-10': isActive }"></div>

			<div class="absolute items-center justify-between transform transition-all duration-500 top-3.5 -translate-x-10 flex w-0"
				:class="{ 'translate-x-0 w-12': isActive }">
				<div class="absolute bg-black h-1 w-7 transform transition-all duration-500 rotate-0 delay-300"
					:class="{ 'rotate-45': isActive }"></div>
				<div class="absolute bg-black h-1 w-7 transform transition-all duration-500 -rotate-0 delay-300"
					:class="{ '-rotate-45': isActive }"></div>
			</div>
		</div>
	</button>
</template>
