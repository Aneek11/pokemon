<script setup>
import { computed } from "vue";

const props = defineProps({
  pokemon: Object,
});

const image = props.pokemon.sprites.other["official-artwork"].front_default;

const formatName = (name) => name[0].toUpperCase() + name.slice(1);

const statValue = (key) => {
  const stat = props.pokemon.stats.find((item) => item.stat.name === key);
  return stat ? stat.base_stat : 0;
};

const TYPE_COLORS = {
  grass: "#48BB78",
  fire: "	#ff5a00",
  water: "#4299E1",
  electric: "#ECC94B",
  ice: "#81E6D9",
  fighting: "#C53030",
  poison: "#9F7AEA",
  ground: "#D69E2E",
  flying: "#63B3ED",
  psychic: "#ED64A6",
  bug: "#9AE6B4",
  rock: "#B7791F",
  ghost: "#6B46C1",
  dragon: "#2C7A7B",
  dark: "#2D3748",
  steel: "#A0AEC0",
  fairy: "#FBB6CE",
  normal: "#A0AEC0",
};

const mainType = computed(
  () => props.pokemon.types?.[0]?.type?.name || "normal"
);

const mainColor = computed(() => TYPE_COLORS[mainType.value] || "#FB923C"); // fallback orange

const headerStyle = computed(() => ({
  backgroundColor: mainColor.value,
}));

const badgeStyle = computed(() => ({
  backgroundColor: mainColor.value,
}));
</script>

<template>
  <div
    class="w-64 bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
  >
    <div
      class="relative h-30 rounded-b-full pt-20 flex items-center justify-center"
      :style="headerStyle"
    >
      <span
        class="absolute top-3 right-3 bg-white text-xs px-3 py-1 rounded-full font-semibold"
      >
        HP {{ statValue("hp") }}
      </span>

      <img
        :src="image"
        :alt="pokemon.name"
        class="h-32 object-contain drop-shadow-xl"
      />
    </div>

    <div class="p-4 mt-7 text-center">
      <h2 class="text-lg font-bold mb-2">
        {{ formatName(pokemon.name) }}
      </h2>

      <span
        class="inline-block mb-4 px-4 py-1 text-xs text-white rounded-full"
        :style="badgeStyle"
      >
        {{ mainType }}
      </span>

      <div class="grid grid-cols-3 gap-2 text-sm mt-3">
        <div>
          <p class="font-bold">{{ statValue("attack") }}</p>
          <p class="text-xs text-gray-400">Attack</p>
        </div>

        <div>
          <p class="font-bold">{{ statValue("defense") }}</p>
          <p class="text-xs text-gray-400">Defense</p>
        </div>

        <div>
          <p class="font-bold">{{ statValue("speed") }}</p>
          <p class="text-xs text-gray-400">Speed</p>
        </div>
      </div>
    </div>
  </div>
</template>
