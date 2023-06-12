<template>
    <div>
        <Header></Header>

        <div class="right-wrap">
            <div class="product-content-wrap">

                <ProductCategory/>

                <div class="product-list-wrap">
                    <div v-if="this.$route.query.productListFilter === 'all'">
                        <ul class="sub-product-ul">
                            <li class="sub-product-list sub-product-list-effect" v-for="(product, i) in products" :key="i">
                                <a href="#!">
                                    <img :src="require(`@/assets/img/sub_product/acc/${product.file_name}`)" alt="" />
                                </a>
                                <p class="product-name">{{ product.name }}</p>
                                <p class="product-price">{{ product.price | commaChk }}원</p>
                            </li>
                        </ul>
                        <infinite-loading @infinite="productListMore" spinner="bubbles">
                            <div class="product-no-item" slot="no-more">더 이상 상품이 없습니다 :)</div>
                        </infinite-loading>
                    </div>
                    <div v-else-if="this.$route.query.productListFilter === 'shoes'">shoes product page</div>
                    <div v-else-if="this.$route.query.productListFilter === 'belt'">belt product page</div>
                    <div v-else-if="this.$route.query.productListFilter === 'bag'">bag product page</div>
                    <div v-else-if="this.$route.query.productListFilter === 'socks'">socks product page</div>
                    <div v-else-if="this.$route.query.productListFilter === 'watch'">watch product page</div>
                </div>

            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import ProductCategory from "@/components/Shop/Acc/ProductCategory";
import {getProductNoParam} from "@/assets/js/api.js";
import InfiniteLoading from "vue-infinite-loading";

export default {
    name: "AllProduct",

    components: {
        Header,
        Footer,
        ProductCategory,
        InfiniteLoading
    },

    created() {
        console.log(this.$route.query.productListFilter);
    },

    data() {
        return {
            category: this.category,
            products: '',
            productsMore: '',
        }
    },

    computed: {
        ...mapGetters({
            Config: 'getConfig'
        })
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

        getProductNoParam('/dummy_data/sub/shop/accProductInfo.json').then(res => { /* 악세사리 전체상품 (기본 노출) */
            const { response } = res.request;
            const json = JSON.parse(response);
            const result = json;
            const { productInfo } = result;

            this.products = productInfo.productListAll;

            console.log(this.products);
        });
    },

    methods: {
        productListMore($state) { /* 악세사리 전체상품 (스크롤 시 노출) */
            getProductNoParam('/dummy_data/sub/shop/accProductInfo.json').then(res => {
                const { response } = res.request;
                const json = JSON.parse(response);
                const result = json;
                const { productInfo } = result;

                this.productsMore = productInfo.productListAll;

                if (this.products.length > 19) {
                    alert("더 이상 상품이 없습니다 :)");
                    $state.complete();
                    return false;
                }

                setTimeout(() => {
                    if (this.productsMore.length) { // this.productsMore.length > 18
                        this.products = this.products.concat(this.productsMore);

                        console.log(this.products.length);

                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }, 800)
            });
        }
    },
};
</script>

<style lang="scss" scoped>

</style>
