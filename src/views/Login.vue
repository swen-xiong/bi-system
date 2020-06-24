<template>
    <div class="bi-login">
        <el-form :model="form" status-icon :rules="rules" ref="loginForm" label-width="80px" class="login-form">
            <el-form-item>
                <div class="login-title">业务分析系统</div>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="form.account" autocomplete="off" placeholder="请输入账号" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button native-type="submit" class="submit-btn" type="primary" size="medium" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { validateEmpty, validateLength } from '../utils/validate'
import store from '../store'
import router from '../router'

@Component({})
export default class Login extends Vue {
    private form = {
        account: '',
        password: ''
    }

    private rules = {
        account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        password: [
            {required: true, message: '密码必填', trigger: 'blur'}
        ]
    }

    private submitForm(formName: string): void {
        (this.$refs[formName] as any).validate((valid: boolean) => {
          if (valid) {
            store.commit('setToken', new Date().getTime().toString());
            if (this.$route.query.redirect) {
                this.$router.push({path: String(this.$route.query.redirect)})
            } else {
                this.$router.push({path: '/home'})
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
    }
}
</script>
<style lang="scss">
    .bi-login {
        width: 100%;
        height: 100%;
        background: url('~@/assets/images/login_bg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;

        .login-title {
            font-size: 30px;
            margin-bottom: 30px;
            color: #fff;
        }

        .login-form {
            width: 400px;
            padding-top: 10%;
            margin: 0 auto;

            .el-form-item__label {
                color: #fff;
            }

            .submit-btn {
                width: 100%;
            }
        }
    }
</style>