<template>
    <section className="section-input">
        <form>
            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>

            <button
                type="submit"
                className="btn-signin btn-dark btn-lg btn-block"
            >
                Login
            </button>
        </form>
    </section>
</template>

<script>
import { ref } from 'vue';
import cogoToast from 'cogo-toast';
import axios from 'axios';
export default {
    name: 'LoginComponent',
    setup() {
        return {
            isPwd: ref(true),
            isPwdConfirm: ref(true),
        };
    },
    data() {
        return {
            formData: {
                email: ref(''),
                password: ref(''),
            },
        };
    },
    methods: {
        validateFormData: function () {
            let isValid = false;
            if (this.formData.password === '' || this.formData.email === '') {
                cogoToast.error('All fields should be filled in.');
                // } else if (!this.formData.email.match(regex_email)) {
                //     cogoToast.error('Email should have a proper format');
            } else {
                isValid = true;
            }
            return isValid;
        },
        login: function () {
            if (this.validateFormData()) {
                let userData = { ...this.formData };
                delete userData.confirmPassword;
                axios
                    .post(process.env.VUE_APP_URL + '/auth/signin', userData)
                    .then(res => {
                        cogoToast.success('Success!');
                        localStorage.setItem('userToken', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        this.$router.push('/home');
                    })
                    .catch(err => {
                        cogoToast('Error! ' + err.message);
                    });
            }
        },
    },
};
</script>

<style>
* {
    box-sizing: border-box;
}

.section-input {
    min-height: 100vh;
    display: flex;
    flex-flow: column;
    font-weight: 400;
    font-family: sans-serif;
    /* background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
        url(../../Resources/Images/city.jpg); */
    height: 100vh;
    /*vh - > view height (all window height for the background img)*/
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: #fff !important;
    justify-content: center;
    align-items: center;
}

.section-input form {
    border-radius: 5%;
    padding: 70px 100px;
    background-color: rgb(153, 153, 153, 0.5);
}

.outer .form-control:focus {
    border-color: #167bff;
    box-shadow: none;
}

.outer h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
}

.custom-control-label {
    font-weight: 400;
}

.forgot-password {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #ffffff;
    margin: 0;
}

.link-login {
    color: #7300a8 !important;
}

.link-login:hover {
    color: #7300a8 !important;
    text-decoration: none !important;
}

.btn-signin {
    background-color: #7300a8 !important;
    transition: all 0.2s;
    border: #fff !important;
}

.btn-signin:hover {
    background-color: #480069 !important;
}

.register {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
