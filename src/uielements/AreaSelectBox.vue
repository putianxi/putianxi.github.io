<template>
    <div class="control is-grouped" id="select-group">
        <div class="control is-expanded">
            <span class="select is-fullwidth">
                <select>
                    <option value="">选择省份</option>
                </select>
            </span>
        </div>

        <div class="control is-expanded">
            <span class="select is-fullwidth">
                <select>
                    <option value="">选择城市</option>
                </select>
            </span>
        </div>
    </div>
</template>

<style>
    #select-group {
        margin-bottom: 1rem;
    }

    #select-group select {
        border-radius: 0;
    }
</style>