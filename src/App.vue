<template>
    <div>
        <calendar input-value="2015-03-05"></calendar>
    </div>
</template>

<script>
var Calendar = require('./components/Calendar');

module.exports = {
    components: {
        calendar: Calendar
    },

    data: function() {
        return {
        }
    },

    ready: function() {
    },

    events: {
    },

    methods: {
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
