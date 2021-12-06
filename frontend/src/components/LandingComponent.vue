<template>
    <q-page class="landingContainer flex-center">
        <div class="q-pa-md">
            <div class="row">
                <div class="landingPageContent">
                    <h1 class="topHeading">
                        The pocket
                        <br />
                        CookingBook
                    </h1>
                    <div class="landingLeftSection">
                        <span class="shortDescription"
                            >Get inspiration or inspire others with your
                            recipes.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style></style>

<script>
export default {
    name: 'LandingComponent',
    methods: {
        goToRegister: function () {
            this.$router.push('/auth/register');
        },
    },
};
</script>

<style>
.landingContainer {
}
.topHeading {
    color: #000000c2;
    font-size: 125px;
}
.landingLeft {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.landingPageContent {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
.shortDescription {
    font-size: 18px;
    margin-bottom: 15px;
    font-family: Helvetica, sans-serif;
    color: #000000c2;
    font-weight: bold;
}
.q-pa-md .col .landingImage {
    width: 600px !important;
    height: 600px !important;
}
</style>
