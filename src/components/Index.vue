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
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug, smoothie_id: smoothie.id } }">
                    <i class="material-icons">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Index',
    data() {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(payload) {
            db.collection('smoothies').doc(payload.id).delete().then(() => {
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id !== payload.id
                })
            })
        }
    },
    created() {
        // let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        db.collection('smoothies').get().then(snapshot => {
            snapshot.forEach(doc => {
                let smoothie = doc.data();
                smoothie.id = doc.id;
                this.smoothies.push(smoothie)
            })
        }).catch(err => {
            alert(err);
        })
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

@media screen and (min-width: 560px and max-width: 820px) {
    .index {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-top: 60px
    }
}

@media screen and (min-width: 240px and max-width: 559px) {
    .index {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px 0;
        margin-top: 60px
    }
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

.index .edit {
    position: absolute;
    top: 6px;
    right: 35px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}

.index .delete:hover,
.index .delete:active,
.index .edit:hover,
.index .edit:active {
    color: #444;
}

</style>