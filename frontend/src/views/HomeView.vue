<template>
    <link
        href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
    />
    <div class="container">
        <div class="addBtnContainer">
            <q-btn
                @click="openModal(recipeData)"
                class="registerBtn"
                style="width: 20%"
                text-color="white"
                label="Add recipe"
            />
        </div>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Preparation time</th>
                    <th>Ingredients</th>
                    <th>Instruction</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe in recipes" :key="recipe.id">
                    <td>{{ recipe.recipeName }}</td>
                    <td>{{ recipe.preparationTime }}</td>
                    <td>{{ recipe.ingredients }}</td>
                    <td>{{ recipe.instruction }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div>
        <Dialog
            header="Add new item"
            :visible="displayModalAddItem"
            position="right"
            :modal="true"
        >
            <p class="p-m-0">
                Fill the field below for adding a new item to your fridge!
            </p>
            <q-input
                class="formInput"
                label="Name"
                v-model="newItemData.recipeName"
                outlined
                type="text"
            />
            <q-input
                class="formInput"
                label="Preparation Time (min)"
                v-model="newItemData.preparationTime"
                outlined
                type="number"
            />
            <q-input
                class="formInput"
                label="Ingredients"
                v-model="newItemData.ingredients"
                outlined
                type="text"
            />
            <q-input
                class="formInput"
                label="Instruction"
                v-model="newItemData.instruction"
                outlined
                type="text"
            />
            <template #footer>
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    @click="closeModalAddItem"
                    class="p-button-text"
                />
                <Button
                    v-if="!isEdit"
                    label="Add"
                    icon="pi pi-check"
                    @click="addItemHandler"
                    autofocus
                />
                <Button
                    v-if="isEdit"
                    label="Update"
                    icon="pi pi-check"
                    @click="addItemHandler"
                    autofocus
                />
            </template>
        </Dialog>
    </div>
</template>
<script>
import axios from 'axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import cogoToast from 'cogo-toast';

export default {
    name: 'HomeView',
    components: {
        Button,
        Dialog,
    },

    data() {
        return {
            userId: localStorage.getItem('userId'),
            userToken: localStorage.getItem('userToken'),
            recipes: [],
            layout: 'grid',
            layoutMain: 'list',
            displayModalAddItem: false,
            newItemData: {
                recipeName: '',
                preparationTime: '',
                ingredients: [],
                instruction: '',
            },
            isEdit: false,
            activeItemId: '',
        };
    },
    beforeMount() {
        try {
            axios.get('http://localhost:5000/api' + '/recipes').then(res => {
                this.recipes = res.data.recipes;
            });
        } catch (err) {
            console.log('Error during retrieving recipes: ' + err.message);
        }
    },
    methods: {
        openModal: function (recipeData) {
            this.mode = 'Add';
            this.displayModalAddItem = true;
            this.activeRecipe = recipeData.id;
            this.isEdit = false;
        },
        openEditModal: function (itemData) {
            this.displayModalAddItem = true;
            this.newItemData = {
                recipeName: itemData.recipeName,
                preparationTime: itemData.preparationTime,
                ingredients: new Array(itemData.ingredients),
                instruction: itemData.instruction,
            };
            this.isEdit = true;
            this.activeItemId = itemData.id;
        },
        closeModalAddItem: function () {
            this.displayModalAddItem = false;
            this.newItemData = {
                recipeName: '',
                preparationTime: '',
                ingredients: [],
                instruction: '',
            };
        },
        validateFormData: function () {
            let isValid = false;
            if (
                this.newItemData.recipeName === '' ||
                this.newItemData.preparationTime === '' ||
                this.newItemData.instruction === ''
            ) {
                cogoToast.error('All fields should be filled in.');
            } else {
                isValid = true;
            }
            return isValid;
        },
        removeItem: function (itemData) {
            axios
                .delete(
                    process.env.VUE_APP_URL + '/recipes/delete/' + itemData.id,
                    {
                        headers: {
                            Authorization: `Bearer ${this.userToken}`,
                        },
                    }
                )
                .then(() => {
                    cogoToast.success('Removed!');
                    location.reload();
                })
                .catch(err => {
                    console.log('Error during removing item: ' + err);
                    cogoToast.error('Something went wrong!');
                });
        },
        onSortChange: function (event) {
            console.log(event);
            const value = event.value.value;
            const sortValue = event.value;
            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            } else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
        addItemHandler: function () {
            if (this.userId === null || this.userToken === null) {
                cogoToast.error('Session expired! Pleas log in again!');
                return;
            }
            if (this.validateFormData()) {
                if (this.isEdit) {
                    axios
                        .put(
                            process.env.VUE_APP_URL +
                                '/items/update/' +
                                this.activeItemId,
                            this.newItemData,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.userToken}`,
                                },
                            }
                        )
                        .then(() => {
                            cogoToast.success('Item updated!');
                            this.closeModalAddItem();
                            location.reload();
                        })
                        .catch(err => {
                            console.log('Error during updating item: ' + err);
                            cogoToast.error('Something went wrong!');
                        });
                } else {
                    axios
                        .post(
                            'http://localhost:5000/api' +
                                '/recipes/create/' +
                                this.userId,
                            this.newItemData,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.userToken}`,
                                },
                            }
                        )
                        .then(() => {
                            cogoToast.success('Item added!');
                            location.reload();
                            this.closeModalAddItem();
                        })
                        .catch(err => {
                            console.log('Error during adding item: ' + err);
                            cogoToast.error('Something went wrong!');
                        });
                }
            }
        },
    },
};
</script>

<style>
.homeContainer {
    width: 100%;
    background-color: #3773b8;
    padding: 2%;
    display: flex;
    justify-content: center;
    min-height: 100vh;
}
.cardTitle {
    width: 100%;
    background-color: #64686b;
    padding: 3%;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.addBtnContainer {
    padding: 3%;
}
.addBtnContainer .p-button {
    background-color: #3773b8 !important;
}
.p-card .p-card-body {
    padding: 0rem !important;
}
.fridgeCard {
    border-radius: 30px !important;
}
.addBtnContainer :hover {
    cursor: pointer;
    transform: scale(1.1);
}
.btnAction .pi {
    margin-right: 10px;
    font-weight: bold;
    font-size: 14px;
}
.formInput {
    margin-top: 20px;
}
.itemsListContainer {
    margin-bottom: 20px;
    list-style: none;
    background-color: #1b4c85;
    padding: 2%;
    color: #fff;
    border-radius: 10px;
}
.listItemHeader {
    display: flex;
    justify-content: space-between;
}
.itemName {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}
.itemPeriod {
    margin-bottom: 15px;
    font-size: 12px;
}
.itemPrice {
    font-weight: bold;
    color: #fff;
    font-size: 20px;
}
.itemDescription {
    font-size: 14px;
    margin-bottom: 15px;
}
.btnItemAction {
    font-size: 5px !important;
    margin: 5px !important;
    background-color: #64686b !important;
}
.btnItemAction .pi {
    font-size: 12px;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}
.card-section {
    width: 25%;
    margin: 20px;
    background-color: #1b4c85;
    padding: 2%;
    color: #fff;
    height: 40%;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    transition: all 0.2s ease-out;
}
.card-section:hover {
    transform: scale(1.1);
}
.p-dataview .p-dataview-content {
    background-color: #3773b8 !important;
}
.p-card-content .p-dataview {
    background-color: #fff;
}
.p-grid .grid-nogutter {
    background-color: #fff !important;
    justify-content: center;
    min-width: 100vh;
    min-height: 80vh;
}
.mainView {
    display: flex;
}
.p-paginator {
    margin-top: 50px;
    border-radius: 15px !important;
}
</style>
