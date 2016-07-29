<template>
    <div class="box hospital-box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="../../assets/images/common/hospital.png" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content hospital-name">
                    <h4><a :href="hospitalInfo.url">{{ hospitalInfo.name }}</a></h4>
                    <p>地区: {{ hospitalInfo.district }}</p>
                    <p>地址: {{ hospitalInfo.address }}</p>
                    <p>电话: {{ hospitalInfo.tel }}</p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    export default  {
        props: [ 'hospitalInfo' ],
    }
</script>

<style>
    .hospital-box {
        padding: 10px 5px;
        border-radius: 1px;
    }

    .hospital-box:not(:last-child) {
        margin-bottom: 15px;
    }

    .hospital-box .content p:not(:last-child) {
        margin-bottom: 2px;
        font-size: 12px;
    }

    .hospital-box i {
        color: #C64742;
    }

    .hospital-box .content h4 {
        margin-bottom: 10px;
    }

    .hospital-name h4 {
        font-size: 14px;
        font-weight: 700;
    }

    .hospital-name a {
        color: #222324;
    }

    .hospital-name a:not(.button):visited {
        color: #222324;
    }

    .hospital-name a:not(.button) {
        border-bottom: none;
    }
</style>