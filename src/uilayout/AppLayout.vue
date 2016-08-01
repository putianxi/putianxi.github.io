<template>
    <section class="section app-layout">
        <div class="container">
            <div class="columns">
                <!-- app-left -->
                <div class="column is-8">
                    <slot name="app-content"></slot>
                </div>
                <!-- app-right -->
                <div class="column is-4">
                    <slot name="app-sidebar"></slot>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
    body {
        background-color: #fdfdfd;
        font-family: "Segoe UI", Arial, Helvetica, "Microsoft Jhenghei", 
                     "Hiragino Sans GB", "WenQuanYi Zen Hei", "Microsoft Yahei", 
                     SimHei, STHeiti, "WenQuanYi Micro Hei", sans-serif;
    }

    .app-layout {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>