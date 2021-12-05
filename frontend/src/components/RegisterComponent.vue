<template>
    <section className="section-input">
        <form className="register-form">
            <h3>Register</h3>

            <div className="form-group">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
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
                Register
            </button>
        </form>
    </section>
</template>

<script>
import { ref } from 'vue';
import cogoToast from 'cogo-toast';
import axios from 'axios';
export default {
    name: 'RegisterComponent',
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
                firstName: ref(''),
                lastName: ref(''),
                password: ref(''),
                confirmPassword: ref(''),
            },
        };
    },
    methods: {
        validateFormData: function () {
            let isValid = false;
            if (
                this.formData.firstName === '' ||
                this.formData.lastName === '' ||
                this.formData.password === '' ||
                this.formData.email === '' ||
                this.formData.confirmPassword === ''
            ) {
                cogoToast.error('All fields should be filled in.');
                // } else if (!this.formData.email.match(regex_email)) {
                //     cogoToast.error('Email should have a proper format');
                // } else if (!this.formData.firstName.match(regex_name)) {
                //     cogoToast.error(
                //         'First name should contain only letters and start with a capital letter'
                //     );
                // } else if (!this.formData.lastName.match(regex_name)) {
                //     cogoToast.error(
                //         'Last name should contain only letters and start with a capital letter'
                //     );
            } else if (
                this.formData.password !== this.formData.confirmPassword
            ) {
                cogoToast.error("Passwords doesn't match");
            } else {
                isValid = true;
            }
            return isValid;
        },
        submitRegister: function () {
            if (this.validateFormData()) {
                let userData = { ...this.formData };
                delete userData.confirmPassword;
                axios
                    .post(process.env.VUE_APP_URL + '/auth/register', userData)
                    .then(() => {
                        cogoToast.success('Success! You can login now!');
                        this.$router.push('/auth/login');
                    })
                    .catch(err => {
                        cogoToast('Error! ' + err.message);
                    });
            }
        },
    },
};
</script>

<style scoped>
.formContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #afafaf;
    padding: 2%;
    min-height: 100vh;
}
.formHeading {
    font-size: 28px;
    font-family: 'Permanent Marker', cursive;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
    color: #64686b;
}
.registerBtn {
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #afafaf;
}
.formCard {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.formContainer .formCard .formInput {
    width: 50%;
    padding: 10px 10px 35px 10px !important;
}
</style>
