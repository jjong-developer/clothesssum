<template>
    <header class="header-wrap">
        <nav class="nav-wrap">
<!--            <div class="logo">-->
<!--                <a href="/">-->
<!--                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"-->
<!--                         width="100px" height="100px" viewBox="0 0 52.75 41.5" enable-background="new 0 0 52.75 41.5" xml:space="preserve">-->
<!--                        <text transform="matrix(1 0 0 1 2.7505 16.583)" font-family="'Batang'" font-size="17" fill="#fff">옷</text>-->
<!--                        <text transform="matrix(1 0 0 1 7.7505 36.583)" font-family="'Batang'" font-size="17" fill="#fff">썸</text>-->
<!--                        <text transform="matrix(1 0 0 1 19.2505 17.083)" font-family="'Batang'" font-size="9" fill="#fff">과</text>-->
<!--                        <text transform="matrix(1 0 0 1 28.25 17.083)" font-family="'Batang'" font-size="17" fill="#fff"> </text>-->
<!--                        <text transform="matrix(1 0 0 1 23.2505 36.8643)" font-family="'Batang'" font-size="9" fill="#fff">탈래?</text>-->
<!--                    </svg>-->
<!--                </a>-->
<!--            </div>-->
            <div class="cart">
                <router-link class="cart-total" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1V4H2V2h3a1 1 0 0 1 1 1v6zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(255,255,255,1)"/></svg>
                    <span>(0)</span>
                </router-link>
            </div>
            <div class="menu-list-wrap">
                <div class="my-info-wrap">
                    <ul v-if="isUser === null || isUser.emailVerified === false">
                        <li>
                            <router-link to="/Member/Login">login</router-link>
                        </li>
                        <li>
                            <router-link to="/Member/Join">join</router-link>
                        </li>
                    </ul>
                    <ul v-else>
                        <li>
                            <router-link to="" @click.native="logout();">logout</router-link>
                        </li>
                        <li v-if="superAdmin.includes(isUser.email)">
                            <router-link to="/Admin/Adminmaster" target="_blank">admin</router-link>
                        </li>
                        <li>
                            <router-link to="/Member/MyInfo">my info</router-link>
                        </li>
                    </ul>
                </div>
                <div class="product-menu-wrap">
                    <ul>
                        <li>
                            <router-link :to='"/Shop/Outer/AllProduct?productListFilter=" + category'>outer</router-link>
                        </li>
                        <li>
                            <router-link :to='"/Shop/Top/AllProduct?productListFilter=" + category'>top</router-link>
                        </li>
                        <li>
                            <router-link :to='"/Shop/Bottom/AllProduct?productListFilter=" + category'>bottom</router-link>
                        </li>
                        <li>
                            <router-link :to='"/Shop/Acc/AllProduct?productListFilter=" + category'>acc</router-link>
                        </li>
                    </ul>
                </div>
                <div class="communication-wrap">
                    <ul>
                        <li>
                            <router-link to="/Board/Notice/List">notice</router-link>
                        </li>
                        <li>
                            <router-link to="/Board/Qa/List">q&a</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sns-wrap">
                <a href="tel:010-6595-2468">
                    <img src="@/assets/img/common/call_center.png" alt="" />
                </a>
                <a href="mailto:jongwook2.kim@gmail.com">
                    <img src="@/assets/img/common/mail.png" alt="" />
                </a>
            </div>
            <div class="search-wrap">
                <div class="search-main">
                    <input type="text" placeholder="찾으시는 상품을 검색해주세요." />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(255,255,255,1)"/></svg>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import {siteReload, superAdmin} from "@/assets/js/common.js";
import {dbAuth} from "@/plugins/firebase.js";
import {isUser} from "@/main.js";

export default {
	name: "Header",

	components: {

    },

	data() {
		return {
            isUser,
            superAdmin,
            category: 'all',
        }
	},

    mounted() {
	    console.log(isUser);
    },

    methods: {
	    logout() {
            dbAuth.signOut();
            siteReload('/');
        },
	},
};
</script>

<style lang="scss" scoped>

</style>
