<template>
    <div class="calendar">
        <div class="picker-input">
            <input 
                type="text"
                v-model="inputValue"
                @focus="openCalendar" />
        </div>
        <div class="overlay" v-show="isCalendarShow" @click="cancelCalendar"></div>
        <div class="calendar-main" v-show="isCalendarShow">
            <div class="calendar-head">
                <div class="date-year-month">{{currentDate.format("YYYY-MM")}}</div>
                <div class="manipulate-month">
                    <div class="month-previous" @click="getPreviousMonth"></div>
                    <div class="month-next" @click="getNextMonth"></div>
                </div>
            </div>
            <div class="calendar-week">
                <div class="weekday" v-for="weekday in weeks">{{weekday}}</div>
            </div>
            <div class="calendar-day">
                <div class="item-day" 
                    :class="{'not-this-month': !day.isThisMonth, 'isCheckedDay': day.isCheckedDay}"
                    @click="chooseDate(day.moment)"
                v-for="day in days">{{day.value}}</div>
            </div>
            <div class="calendar-toolbar">
                <div class="cancel" @click="cancelCalendar">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
var moment = require("moment");

module.exports = {

    data: function() {
        return {
            isCalendarShow: false,
            currentDate: moment(),
            showYear: "",
            showMonth: "",
            checkedDate: null,
            weeks: ["一", "二","三", "四", "五", "六", "日"],
            days: []
        }
    },

    props: {
        inputValue: {
            type: String,
            required: true,
            default: ""
        }
    },

    methods: {
        getDays: function(date) {
            if (date === undefined || !Date.parse(date)) {
                this.currentDate = moment();
            } else {
                this.currentDate = moment(date);
            }


            var i, days = [];

            var firstDayOfMonth = moment(this.currentDate).date(1);
            var firstDayOfWeek = firstDayOfMonth.day() || 7;

            var monthLength = moment(this.currentDate).daysInMonth();
            var lastMonth = moment(this.currentDate).subtract(1, "months");
            var nextMonth = moment(this.currentDate).add(1, "months");
            var lastMonthLength = lastMonth.daysInMonth();
            var nextMonthLength = nextMonth.daysInMonth();

            // 循环生成当前月份的所有日期
            for (i = 1; i < monthLength + 1; i++) {
                if (moment(this.currentDate).date(i).format("YYYY-MM-DD") == this.checkedDate.format("YYYY-MM-DD")) {
                    days.push({
                        isThisMonth: true,
                        value: i,
                        moment: moment(this.currentDate).date(i),
                        isCheckedDay: true
                    });
                } else {
                    days.push({
                        isThisMonth: true,
                        value: i,
                        moment: moment(this.currentDate).date(i)
                    });
                }
            }

            // 循环生成要显示的上一月的日期
            for (i = 0; i < firstDayOfWeek - 1; i++) {
                days.unshift({
                    isThisMonth: false,
                    value: lastMonthLength - i,
                    moment: moment(lastMonth).date(lastMonthLength - i)
                });
            }

            // 循环生成要显示的下一月的日期
            var restDaysLength = 42 - days.length;
            for (i = 0; i < restDaysLength; i++) {
                days.push({
                    isThisMonth: false,
                    value: i + 1,
                    moment: moment(nextMonth).date(i + 1)
                });
            }

            this.days = days;
        },

        getNextMonth: function() {
            this.getDays(this.currentDate.add(1, "months"));
        },

        getPreviousMonth: function() {
            this.getDays(this.currentDate.subtract(1, "months"));
        },

        openCalendar: function() {
            this.checkedDate = moment(this.inputValue || undefined);
            this.getDays(this.inputValue);
            this.isCalendarShow = true;
        },

        cancelCalendar: function() {
            this.isCalendarShow = false;
        },

        chooseDate: function(momentDate) {
            this.inputValue = momentDate.format("YYYY-MM-DD");
            this.isCalendarShow = false;
        }
    }
}
</script>

<style scoped>
.calendar {
    position: relative;
    font-size: 16px;
    margin: 10px;
}
.calendar input {
    width: 200px;
    height: 20px;
    font-size: 20px;
    line-height: 22px;
    padding: 4px 8px;
    outline: none;
    border: 1px solid #666;
    box-shadow: 4px 4px 2px #666;
}
.calendar-main {
    position: absolute;
    top: 100%;
    left: 0;
    width: 280px;
    height: 330px;
    padding: 8px;
    margin-top: 4px;
    background-color: rgba(9, 137, 167, 0.5);
}
.calendar-head {
    display: flex;
    height: 28px;
    padding: 4px 8px;
    line-height: 28px;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.month-previous {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsKQGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBpZm9udDsgc3JjOiB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LmVvdD8jaWVmaXgiKSBmb3JtYXQoImVtYmVkZGVkLW9wZW50eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUud29mZiIpIGZvcm1hdCgid29mZiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnR0ZiIpIGZvcm1hdCgidHJ1ZXR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5zdmcjaWZvbnQiKSBmb3JtYXQoInN2ZyIpOyB9CgpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTk0NC4yOTIzNTggNjg1LjU4NDQ1NGMtMjEuOTA3ODU5IDIyLjE0MDI1My01Ny40MjQyMTQgMjIuMTQwMjUzLTc5LjMzNjE2NiAwTDUxMi43NDgwNjggMzI5LjU3MjEzNCAxNjAuNTQ4MTMxIDY4NS41ODQ0NTRjLTIxLjkxMTk1MiAyMi4xNDAyNTMtNTcuNDI4MzA4IDIyLjE0MDI1My03OS4zMzYxNjYgMC0yMS45MDc4NTktMjIuMTUxNTA5LTIxLjkwNzg1OS01OC4wNTAxMTQgMC04MC4xOTg1NTNsMzg5LjUxOTQzNC0zOTMuNzIxMTUzYzExLjU2NDg2OS0xMS42OTAyNSAyNi44NzMxNDktMTYuNzk4NTk1IDQyLjAyMDc2My0xNi4xNDY3NDkgMTUuMTQ2NTkxLTAuNjUxODQ2IDMwLjQ1NTg5NCA0LjQ1NTQ3NSA0Mi4wMjA3NjMgMTYuMTQ2NzQ5bDM4OS41MTk0MzQgMzkzLjcyMTE1M0M5NjYuMTk5MTkzIDYyNy41MzQzNCA5NjYuMTk5MTkzIDY2My40MzI5NDQgOTQ0LjI5MjM1OCA2ODUuNTg0NDU0eiIgZmlsbD0iIzI3MjYzNiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+) no-repeat;
    background-size: 20px;
    background-position: center;
    cursor: pointer;
}
.month-next {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsKQGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBpZm9udDsgc3JjOiB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LmVvdD8jaWVmaXgiKSBmb3JtYXQoImVtYmVkZGVkLW9wZW50eXBlIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUud29mZiIpIGZvcm1hdCgid29mZiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnR0ZiIpIGZvcm1hdCgidHJ1ZXR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS5zdmcjaWZvbnQiKSBmb3JtYXQoInN2ZyIpOyB9CgpdXT48L3N0eWxlPjwvZGVmcz48ZyBjbGFzcz0idHJhbnNmb3JtLWdyb3VwIj48ZyB0cmFuc2Zvcm09InNjYWxlKDAuMTk1MzEyNSwgMC4xOTUzMTI1KSI+PHBhdGggZD0iTTk0NC4yOTIzNTggMjEyLjA2NzkzYy0yMS45MDc4NTktMjIuMTQwMjUzLTU3LjQyNDIxNC0yMi4xNDAyNTMtNzkuMzM2MTY2IDBMNTEyLjc0ODA2OCA1NjguMDgwMjUgMTYwLjU0ODEzMSAyMTIuMDY3OTNjLTIxLjkxMTk1Mi0yMi4xNDAyNTMtNTcuNDI4MzA4LTIyLjE0MDI1My03OS4zMzYxNjYgMC0yMS45MDc4NTkgMjIuMTUxNTA5LTIxLjkwNzg1OSA1OC4wNTAxMTQgMCA4MC4xOTg1NTNsMzg5LjUxOTQzNCAzOTMuNzIxMTUzYzExLjU2NDg2OSAxMS42OTAyNSAyNi44NzMxNDkgMTYuNzk4NTk1IDQyLjAyMDc2MyAxNi4xNDY3NDkgMTUuMTQ2NTkxIDAuNjUyODY5IDMwLjQ1NTg5NC00LjQ1NTQ3NSA0Mi4wMjA3NjMtMTYuMTQ2NzQ5bDM4OS41MTk0MzQtMzkzLjcyMTE1M0M5NjYuMTk5MTkzIDI3MC4xMTkwNjcgOTY2LjE5OTE5MyAyMzQuMjIwNDYzIDk0NC4yOTIzNTggMjEyLjA2NzkzeiIgZmlsbD0iIzI3MjYzNiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+) no-repeat;
    background-size: 20px;
    background-position: center;
    cursor: pointer;
}
.calendar-week {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around; 
    text-align: center;
    line-height: 20px;
}
.calendar-day {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}
.item-day {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid transparent;
}
.item-day:hover {
    border: 1px solid #000;
}
.not-this-month {
    color: #666;
}
.isCheckedDay {
    border-color: #f00;
}
.cancel {
    float: right;
    width: 40px;
    line-height: 40px;
    cursor: pointer;
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
}
</style>
