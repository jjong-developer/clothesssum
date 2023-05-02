import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "Home" 메인 페이지 */ '@/views/Home')
	},
	{
		path: '/Member/Login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Login" 로그인 페이지 */ '@/views/Member/Login'),
	},
	{
		path: '/Member/Join',
		name: 'Join',
		component: () => import(/* webpackChunkName: "Join" 회원가입 페이지 */ '@/views/Member/Join'),
	},
	{
		path: '/Member/MyInfo',
		name: 'MyInfo',
		component: () => import(/* webpackChunkName: "MyInfo" 내 정보 페이지 */ '@/views/Member/MyInfo'),
	},
	{
		path: '/Member/PasswordReset',
		name: 'PasswordReset',
		component: () => import(/* webpackChunkName: "PasswordReset" 비밀번호 찾기 */ '@/views/Member/PasswordReset'),
	},
	{
		path: '/Order/GuestOrder',
		name: 'GuestOrder',
		component: () => import(/* webpackChunkName: "GuestOrder" 비회원 주문 조회 */ '@/views/Order/GuestOrder'),
	},
	{
		path: '/Shop/Outer/AllProduct',
		name: 'AllProduct',
		component: () => import(/* webpackChunkName: "AllProduct" 상품 > 아우터 > 전체 */ '@/views/Shop/Outer/AllProduct'),
	},
	{
		path: '/Shop/Top/AllProduct',
		name: 'AllProduct',
		component: () => import(/* webpackChunkName: "AllProduct" 상품 > 상의 > 전체 */ '@/views/Shop/Top/AllProduct'),
	},
	{
		path: '/Shop/Bottom/AllProduct',
		name: 'AllProduct',
		component: () => import(/* webpackChunkName: "AllProduct" 상품 > 하의 > 전체 */ '@/views/Shop/Bottom/AllProduct'),
	},
	{
		path: '/Shop/Acc/AllProduct',
		name: 'AllProduct',
		component: () => import(/* webpackChunkName: "AllProduct" 상품 > 악세사리 > 전체 */ '@/views/Shop/Acc/AllProduct'),
	},
	{
		path: '/Board/Notice/List',
		name: 'List',
		component: () => import(/* webpackChunkName: "Notice/List'," 공지사항 게시판 보기 */ '@/views/Board/Notice/List'),
	},
	{
		path: '/Board/Notice/Write',
		name: 'Write',
		component: () => import(/* webpackChunkName: "Notice/Write" 공지사항 게시판 글쓰기 */ '@/views/Board/Notice/Write'),
	},
	{
		path: '/Board/Qa/List',
		name: 'List',
		component: () => import(/* webpackChunkName: "Qa/List" 1대1문의 게시판 보기 */ '@/views/Board/Qa/List'),
	},
	{
		path: '/Policy/:pageNum',
		name: 'Policy',
		component: () => import(/* webpackChunkName: "Policy" 1:이용약관, 2:개인정보처리방침 */ "@/views/Board/Policy"),
	},
	{
		path: '/Admin/Login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "Admin/Login" 관리자 로그인 페이지 */ "@/views/Admin/Login"),
	},
	{
		path: '/Admin/Adminmaster',
		name: 'Adminmaster',
		component: () => import(/* webpackChunkName: "Admin/Adminmaster" 관리자 전용 */ "@/views/Admin/Adminmaster"),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
