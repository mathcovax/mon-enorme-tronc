<script setup lang="ts">
import { useNavigationItemForm } from "../composables/useNavigationItemForm";

const { NavigationItemForm } = useNavigationItemForm();
</script>

<template>
	<div class="w-full flex flex-col items-center p-6 gap-10">
		<NavigationItemForm class="max-w-[500px] w-[80%]" />
	</div>
</template>
