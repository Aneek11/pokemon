<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import PokemonCard from "./components/PokemonCard.vue";

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const pokemons = ref([]);
const loading = ref(false);
const err = ref("");

const limit = 12;
const offset = ref(0);
const next = ref(null);

const bottomRef = ref(null);
let io = null;

const loadMore = async () => {
  if (loading.value) return;

  loading.value = true;
  err.value = "";

  try {
    const url =
      next.value || `${baseUrl}?limit=${limit}&offset=${offset.value}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("List API error: " + res.status);

    const data = await res.json();
    next.value = data.next;

    const detailList = await Promise.all(
      data.results.map(async (item) => {
        const r = await fetch(item.url);
        if (!r.ok) throw new Error("Detail API error: " + r.status);
        return r.json();
      })
    );

    pokemons.value.push(...detailList);
    offset.value += limit;
  } catch (e) {
    err.value = e?.message || "Something broke ";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadMore();

  io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && next.value) {
        loadMore();
      }
    },
    { rootMargin: "400px" }
  );

  if (bottomRef.value) io.observe(bottomRef.value);
});

onBeforeUnmount(() => {
  if (io && bottomRef.value) io.unobserve(bottomRef.value);
});
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <main class="max-w-6xl mx-auto px-4 py-6">
      <p class="text-slate-600 mb-6"></p>

      <div
        v-if="err"
        class="mb-6 p-4 rounded-lg bg-red-100 border border-red-300 text-red-700"
      >
        {{ err }}
      </div>

      <section
        class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center"
      >
        <PokemonCard v-for="p in pokemons" :key="p.id" :pokemon="p" />
      </section>

      <div ref="bottomRef" class="h-10"></div>

      <div
        v-if="!next && !loading"
        class="py-8 text-center text-slate-400"
      ></div>
    </main>
  </div>
</template>
