<template>    
    <nav class="nav main-header">
        <div class="container">
            <div class="nav-left">
                <a class="nav-item" href="/index.html">
                    <img class="main-logo" src="../../assets/images/common/logo.png" alt="logo">
                </a>
            </div>

            <span class="nav-toggle" 
                  :class="{ 'is-active': mobile_menu }"
                  @click="toggleMobileMenu()"
            >
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu" :class="{ 'is-active': mobile_menu }">
                <!-- <a class="nav-item is-active" href="/index.html">首页</a>
                <a class="nav-item" href="#">莆田系医院</a>
                <a class="nav-item" href="#">医疗事故</a> -->
                <span class="nav-item">
                    <a class="button is-small is-light is-outlined" href="https://github.com/putianxi/putianxi.github.io/raw/master/assets/data/hospital.xlsx">
                        <span class="icon"><i class="fa fa-download"></i></span>
                        <span>下载</span>
                    </a>
                </span>
            </div>
        </div>

    </nav>
</template>

<script>
    export default {
        data() {
            return {
                mobile_menu: false
            };
        },
        methods: {
            toggleMobileMenu() {
                this.mobile_menu = !this.mobile_menu;
            }
        }
    }
</script>

<style>
    .main-header {
        padding: 5px 0;
        background-image: -webkit-linear-gradient(309deg, #E0504A 0%, #ED544F 71%, #C64742 100%);
        background-image: -o-linear-gradient(309deg, #E0504A 0%, #ED544F 71%, #C64742 100%);
        background-image: linear-gradient(141deg, #E0504A 0%, #ED544F 71%, #C64742 100%);
    }

    /* custom menu */
    .main-header .nav-item {
        color: rgba(255, 255, 255, 0.5);
    }

    .main-header .nav-item:hover {
        color: #fff;
    }

    .main-header .nav-item.is-active {
        color: #fff;
    }

    .main-header .nav-item img {
        max-height: 32px;
    }

    .main-header .button {
        padding: 14px;
    }

    .main-header .nav-toggle span {
        background-color: #fff;
    }

    .main-header .nav-toggle:hover {
        background-color: #FF6666;
    }

    /* for mobile */
    @media (max-width: 768px) {
        .main-header {
            z-index: 1001;
        }

        .main-header .main-logo {
            margin-left: 10px;
        }

        .main-header .nav-right.is-active .nav-item {
            background-color: #E0504A;
        }

        .main-header .nav-right.is-active .nav-item .button{
            margin-right: 10px;
        }
    }
</style>

