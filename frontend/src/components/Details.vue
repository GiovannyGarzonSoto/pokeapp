<template>
    <div>
        <h1>{{pkmn}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pkmn: this.$route.params.pkmn
        }
    }
}
</script>