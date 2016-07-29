<template>
    <section class="section main-content">
        <div class="container">
            <div class="columns">
                <!-- app-left -->
                <div class="column is-8">
                    <slot name="app-left"></slot>
                </div>
                <!-- app-right -->
                <div class="column is-4">
                    <slot name="app-right"></slot>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
    .main-content {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>