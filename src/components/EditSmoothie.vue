<template>

    <div class="edit-smoothie container">
        <h2 class="center-align indigo-text" v-if="smoothie">Edit smoothie - <span class="orange-text">{{ smoothie.title }}</span></h2>
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
            another: null,
            feedback: null,
            smoothie: null,
        }
    },
    created() {
        let smoothie_id = this.$route.params.smoothie_id
        db.collection('smoothies').doc(smoothie_id).get().then((snapshot) => {
            this.smoothie = snapshot.data()
            this.smoothie.id = snapshot.id
            console.log(this.smoothie.id)
        }).catch(erro => {
            console.log(err)
        })
    },
    methods: {
        editSmoothie() {
            if (this.smoothie.title) {
                this.feedback = null
                // Creating a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // Adding the smoothie to the database
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: this.smoothie.slug,
                    ingredients: this.smoothie.ingredients
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(() => {
                    console.log("Something happened wrong")
                    this.$router.push({ name: 'EditSmoothie', smoothie_id: this.smoothie.id, smoothie_slug: this.smoothie.slug})
                })
            } else {
                this.feedback = 'Title cannot be empty'
            }
        },
        addIng() {
            if (this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = "Incredients cannot be empty"
            }
        },
        deleteIng(ing) {
            if (ing) {
                this.smoothie.ingredients = this.smoothie.ingredients.filter(ele => {
                    return ele !== ing
                })
            }
        }
    }
}
</script>

<style>

.edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

.edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}

.edit-smoothie .field {
    margin: 20px auto;
    position: relative;
}

.edit-smoothie .delete,
.edit-smoothie .add {
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

.edit-smoothie .delete:hover,
.edit-smoothie .delete:active,
.edit-smoothie .add:hover,
.edit-smoothie .add:active {
    color: #444;
}


</style>