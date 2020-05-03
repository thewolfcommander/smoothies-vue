<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteSmoothie(smoothie)">delete</i>
                <h2 class="card-title indigo-text">
                    {{ smoothie.title }}
                </h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            smoothies: [
                {title: 'Banana Milkshake', slug: 'banana-milkshake', ingredients: ['banana', 'milk', 'almonds', 'pistachio'], id: '1'},
                {title: 'Mango Milkshake', slug: 'mango-milkshake', ingredients: ['mango', 'milk', 'almonds', 'cashew', 'lime', 'juice'], id: '2'},
            ]
        }
    },
    methods: {
        deleteSmoothie(payload) {
            this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id !== payload.id
            })
        }
    }
}
</script>

<style>

.index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px
}

.index h2 {
    text-align: center;
    margin-top: 0;
}

.index ul.ingredients {
    margin: 30px auto;
}

.index ul.ingredients li {
    display: inline-block;
    margin: 2px 5px;
}

.index .delete {
    position: absolute;
    top: 6px;
    right: 6px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}

.index .delete:hover,
.index .delete:active {
    color: #444;
}

</style>