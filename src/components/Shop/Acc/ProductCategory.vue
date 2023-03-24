<template>
    <div>
        <div class="category-wrap">
            <div class="category">
                <ul>
                    <li :class="{active: this.category === 'all'}" @click="categoryLink('all')">all</li>
                    <li :class="{active: this.category === 'shoes'}" @click="categoryLink('shoes')">shoes</li>
                    <li :class="{active: this.category === 'belt'}" @click="categoryLink('belt')">belt</li>
                    <li :class="{active: this.category === 'bag'}" @click="categoryLink('bag')">bag</li>
                    <li :class="{active: this.category === 'socks'}" @click="categoryLink('socks')">socks</li>
                    <li :class="{active: this.category === 'watch'}" @click="categoryLink('watch')">watch</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { siteReload } from "@/assets/js/common.js";

export default {
    name: "ProductCategory",
    components: {

    },
    props: {

    },
    data() {
        return {
            category: '',
        }
    },
    mounted() {
        let uri = window.location.search;
        let uriAry = uri.split('?');
        let andAry = uriAry[1].split('&');
        for (let k in andAry) {
            if (andAry[k].indexOf('productListFilter=') != -1) {
                this.category = andAry[k].split('=')[1];
            }
        }
        console.log(this.category);
    },
    methods: {
        categoryLink(type) {
            switch (type) {
                case 'all':
                    this.category = 'all';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
                case 'shoes':
                    this.category = 'shoes';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
                case 'belt':
                    this.category = 'belt';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
                case 'bag':
                    this.category = 'bag';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
                case 'socks':
                    this.category = 'socks';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
                case 'watch':
                    this.category = 'watch';
                    this.$router.push({
                        path: '/Shop/Acc/AllProduct',
                        name: 'Query',
                        query: { productListFilter: this.category },
                        props: true,
                    }).catch(()=>{})
                    siteReload();
                    break;
            }
        }
    },
    watch: {

    },
};
</script>

<style lang="scss" scoped>

</style>
