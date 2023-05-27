<template>
    <div> <!-- 항상 컴포넌트나 사용 시 최상위 template 태그 하위에 임의(div) 태그가 감싸져있어야 에러가 발생하지 않음 -->
<!--        <Popup isPopup></Popup>-->

        <Header></Header>

        <div class="right-wrap">
            <!-- 메인 베스트 상품 -->
            <div class="main-product-list-wrap">
                <swiper class="swiper best-product-slider" :options="swiperOption">
                    <swiper-slide v-for="(bestProduct, i) in bestProducts" :key="i">
                        <div class="main-product-ul-not">
                            <div class="main-product-list-not main-product-list-effect">
                                <a href="#!">
                                    <img :src="require(`@/assets/img/main_product/${bestProduct.file_name}`)" alt="" />
                                    <p class="best-badge">BEST</p>
                                    <p class="product-name">{{ bestProduct.name }}</p>
                                    <p class="product-price">{{ bestProduct.price | commaChk }}원</p>
                                </a>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination swiper-pagination-custom" slot="pagination"></div>
                </swiper>
            </div>

            <!-- 메인 상품 -->
            <div class="main-product-list-wrap">
                <ul class="main-product-ul">
                    <li class="main-product-list main-product-list-effect" v-for="(product, i) in products" :key="i">
                        <a href="#!">
                            <img :src="require(`@/assets/img/main_product/${product.file_name}`)" alt="" />
                            <p class="product-name">{{ product.name }}</p>
                            <p class="product-price">{{ product.price | commaChk }}원</p>
                        </a>
                    </li>
                </ul>
            </div>
            <infinite-loading @infinite="mainProductListMore" spinner="bubbles">
                <div class="product-no-item" slot="no-more">더 이상 상품이 없습니다 :)</div>
            </infinite-loading>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import Popup from "@/components/Common/Popup";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import {getProductNoParam} from "@/assets/js/api";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios"

export default {
    name: 'Home',

    components: {
        Popup,
        Header,
        Footer,
        Swiper,
        SwiperSlide,
        InfiniteLoading,
    },

    data() {
        return {
            isPopup: false,
            bestProducts: '',
            products: '',
            productsMore: '',
            swiperOption: {
                slidesPerView: 4,
                spaceBetween: 30,
                autoplay : {
                    delay : 3000,
                    disableOnInteraction : false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
        }
    },

    computed: {
        ...mapGetters({
            Config: 'getConfig'
        })
    },

    mounted() {
        this.isPopup = true;

        /**
         * 메인 상품 (기본 노출)
         */
        getProductNoParam('/dummy_data/main/productInfo.json').then(res => {
            const {response} = res.request;
            const json = JSON.parse(response);
            const result = json;
            const {productInfo, productInfoResult} = result;

            console.log(productInfo);
            console.log(productInfoResult);

            this.bestProducts = productInfo.bestProductList;
            this.products = productInfo.productList;
        });
    },

    methods: {
        /**
         * 팝업창 닫기
         */
        // popupClose(state) {
        //     console.log(state);
        //     this.isPopup = state;
        // },

        popupClose() {
            this.isPopup = false;
        },

        /**
         * 메인 상품 (스크롤 시 노출)
         */
        mainProductListMore($state) {
            getProductNoParam('/dummy_data/main/productInfo.json').then(res => {
                const { response } = res.request;
                const json = JSON.parse(response);
                const result = json;
                const { productInfo, productInfoResult } = result;

                console.log(productInfo);
                console.log(productInfoResult);

                this.productsMore = productInfo.productList;

                if (this.products.length > 50) {
                    alert('더 이상 상품이 없습니다.');
                    $state.complete();
                    return false;
                }

                setTimeout(() => {
                    if (this.productsMore.length) {
                        this.products = this.products.concat(this.productsMore);

                        console.log(this.products.length);

                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }, 800)
            });
            // axios.get("/dummy_data/main/productInfo.json", {}).then(({data}) => {
            //     console.log(data);
            //     console.log(data.productInfo.productList);
            //
            //     setTimeout(() => {
            //         if (data.productInfo.productList) {
            //             this.products = this.products.concat(data.productInfo.productList);
            //             $state.loaded();
            //         } else {
            //             $state.complete();
            //         }
            //     }, 600)
            // });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
