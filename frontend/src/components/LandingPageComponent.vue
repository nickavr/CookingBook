<template>
    <q-page class="landingContainer flex-center">
        <div class="q-pa-md">
            <div class="row">
                <div class="landingLeft col">
                    <h1 class="topHeading">
                        The Pocket
                        <br />
                        CookingBook
                    </h1>
                    <div class="landingLeftSection">
                        <span class="shortDescription"
                            >Get your inspiration for new recipes, or help
                            others with your ideas
                        </span>
                        <div class="buttons">
                            <q-btn
                                @click="goToLogin"
                                class="loginBtn actionBtn"
                            >
                                Login
                            </q-btn>
                            <q-btn
                                @click="goToRegister"
                                class="registerBtn actionBtn"
                            >
                                Register
                            </q-btn>
                        </div>
                    </div>
                </div>
                <div class="col flex-center"></div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'LandingPage',
    methods: {
        goToRegister: function () {
            this.$router.push('/register');
        },
        goToLogin: function () {
            this.$router.push('/login');
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
.landingLeftSection {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
.shortDescription {
    font-size: 16px;
    margin-bottom: 15px;
    font-family: Helvetica, sans-serif;
    color: #000000c2;
    font-weight: bold;
}
.buttons {
}
.actionBtn {
    padding: 10px;
    border-radius: 8px;
    font-family: Helvetica;
    font-weight: 800;
    letter-spacing: 2px;
}
.registerBtn {
    background-color: #7300a8;
    color: white;
}
.loginBtn {
    border-style: solid;
    background-color: white;
    color: #7300a8;
    border-color: #7300a8;
}
.q-pa-md .col .landingImage {
    width: 600px !important;
    height: 600px !important;
}
</style>
