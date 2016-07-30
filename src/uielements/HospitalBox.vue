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
                    <h4><a :href="'/hospital_detail.html/' + hospitalInfo.id">{{ hospitalInfo.name }}</a></h4>
                    <p><strong>地区:</strong>{{ hospitalInfo.district }}</p>
                    <p><strong>地址:</strong>{{ hospitalInfo.address | addressFilter }}</p>
                    <p><strong>电话:</strong>{{ hospitalInfo.phone | phoneFilter}}</p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import Vue from 'vue'

    Vue.filter('addressFilter', (value) => {
        let max_length = 12;
        if (typeof value === 'string') {
            if(value.length > max_length) {
                return value.substring(0, max_length) + ' ...';
            }
        }
        return value;
    });

    Vue.filter('phoneFilter', (value) => {
        if(value === "") {
            return 'N/A';
        }
        return value.split(';')[0];
    });

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

    .hospital-box .content p {
        margin-bottom: 2px;
        font-size: 12px;
    }
    .hospital-box .content strong {
        color: #69707a;
        margin-right: 10px;
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