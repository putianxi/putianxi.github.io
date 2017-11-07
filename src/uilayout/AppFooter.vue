<template>
    <footer class="footer">
        <div class="container">
            <div class="columns is-mobile">
                <div class="column footer-copyright">
                    <p>&copy; 2018 <a href="https://putianxi.github.io">PUTIANXI</a></p>
                </div>
                <div class="column">
                    <figure class="image footer-logo">
                        <img src="../../assets/images/common/footer-logo.png">
                    </figure>
                </div>
                <div class="column footer-share">
                        <p class="has-text-right footer-icon">
                            <a class="icon" href="#">
                                <i class="fa fa-wechat"></i>
                            </a>
                            <a class="icon" href="#">
                                <i class="fa fa-weibo"></i>
                            </a>
                            <a class="icon" href="https://github.com/putianxi/putianxi.github.io" target="_blank">
                                <i class="fa fa-github"></i>
                            </a>
                        </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style>
    .footer {
        color: #222324;
        background-color: #EAEAEA;
        padding: 30px 0;
        margin-top: 40px;
    }

    .footer-copyright a{
        color: #69707a;
    }

    .footer-logo {
        margin: 0 auto;
        width: 64px;
        height: 64px;
    }

    .footer-copyright, .footer-icon {
        line-height: 64px;
    }
    
    .footer-icon .icon {
        font-size: 20px;
        color: #69707a;
        vertical-align: middle;
    }

    .footer-icon a:not(:last-child) {
        margin-right: 10px;
    }

    @media (max-width: 768px) {
        .footer {
            padding: 30px 10px;
        }

        .footer .column {
            padding: 0;
        }

        .footer-copyright {
            line-height: 48px;
            font-size: 12px;
            margin-left: 10px;
        }

        .footer-logo {
            width: 48px;
            height: 48px;
        }

        .footer-icon {
            line-height: 48px;
        }

        .footer-icon .icon {
            font-size: 16px;
        }

        .footer-icon a:not(:last-child) {
            margin-right: 0;
        }
    }
</style>
