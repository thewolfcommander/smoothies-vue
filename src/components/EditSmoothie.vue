<template>

    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Edit smoothie - <span class="orange-text">{{ smoothie.title }}</span></h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title" placeholder="Enter the smoothie title ...">
                <small class="show-text">Adding Smoothie with name: <strong class="indigo-text">{{ smoothie.title }}</strong></small>
            </div>
            <div class="field ingredient" v-for="(ing, index) in smoothie.ingredients" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">remove_circle_outline</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" placeholder="Press tab to add an Ingredient" @keydown.tab.prevent="addIng" v-model="another">
                <i class="material-icons delete" @click="addIng">add_circle_outline</i>
            </div>
            <div class="field center-align">
                <p class="red-text" >{{ feedback }}</p>
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
    
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null,
            smoothie: null,
        }
    },
    created() {
        let smoothie_id = this.$route.params.smoothie_id
        db.collection('smoothies').doc(smoothie_id).get().then((snapshot) => {
            this.smoothie = snapshot.data()
        }).catch(erro => {
            console.log(err)
        })
    },
    methods: {
        editSmoothie() {
            if (this.title) {
                this.feedback = null
                // Creating a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // Adding the smoothie to the database
                db.collection('smoothies').add({
                    title: this.title,
                    slug: this.slug,
                    ingredients: this.ingredients
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(() => {
                    this.$router.push({ name: 'AddSmoothie'})
                })
            } else {
                this.feedback = 'Title cannot be empty'
            }
        },
        addIng() {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "Incredients cannot be empty"
            }
        },
        deleteIng(ing) {
            if (ing) {
                this.ingredients = this.ingredients.filter(ele => {
                    return ele !== ing
                })
            }
        }
    }
}
</script>

<style>

.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}

.add-smoothie .field {
    margin: 20px auto;
    position: relative;
}

.add-smoothie .delete,
.add-smoothie .add {
    position: absolute;
    right: 0px;
    bottom:20px;
    cursor: pointer;
    font-size: 1.4em;
    z-index: 1001;
    background: #fff;
    padding: 0 10px;
    color: #aaa;
}

.add-smoothie .delete:hover,
.add-smoothie .delete:active,
.add-smoothie .add:hover,
.add-smoothie .add:active {
    color: #444;
}


</style>