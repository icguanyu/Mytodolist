var time = new Date()
var day_list = ['日', '一', '二', '三', '四', '五', '六'];
var today = `${time.getFullYear()}.${time.getMonth()+1}.${time.getDate()}(${day_list[time.getDay()]})`

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '', //輸入框內容
        todos: [{
            id: '001',
            title: '到大木博士家領取寶可夢',
            time: today,
            completed: false
        }],
        visi: 'all',
        cacheTodo: {}, //編輯暫存區
        cacheTitle: '' //編輯暫存titie = item.title
    },
    methods: {
        addTodo: function() { //新增一筆代辦事項
            var value = this.newTodo.trim(); //trim去除空白
            var id = Math.floor(Date.now()); //若只是取id可以不用取整數
            if (!value) return
            this.todos.push({
                id: id,
                title: value,
                time: today,
                completed: false
            })
            this.newTodo = ''
        },
        removeTodo: function(index) {
            this.todos.splice(index, 1) //splice(起點,起點算起第N個)
        },
        editTodo: function(item) { //雙擊觸發編輯狀態(未編輯)
            this.cacheTitle = item.title
            this.cacheTodo = item //(同步)編輯的itme與原本的todos
        },
        doneEdit: function(item) { //keyup這邊才完成編輯
            item.title = this.cacheTitle //這時的itme是todos
            this.cacheTodo = {} //清空,讓item.id !== cacheTodo.id 跳出編輯
        },
        cancelEdit: function() {
            this.cacheTodo = {} //清空,讓item.id !== cacheTodo.id 跳出編輯
        },
        clearAll: function() {
            var r = confirm('確認要清除所有代辦事項?')
            if (r) {
                this.todos = []
            }
        }
    },
    computed: { //過濾後的資料
        filter: function() {
            var newTodos = [];
            switch (this.visi) { //要判斷的東西
                case 'ing': //條件
                    newTodos = this.todos.filter(function(item) {
                        return item.completed == false
                            //過濾出false的item,return到newsTodos
                    })
                    return newTodos
                    break;
                case 'done':
                    newTodos = this.todos.filter(function(item) {
                        return item.completed == true
                    })
                    return newTodos
                    break;
                case 'all':
                    return this.todos;
                    break;
            }
        },
        done: function() {
            var done = []
            done = this.todos.filter(function(item) {
                return item.completed == true
            })
            return done.length
        },
        remain: function() {
            var remain = []
            remain = this.todos.filter(function(item) {
                return item.completed == false
            })
            return remain.length
        },
        process: function() {
            if (this.todos.length <= 0) {
                return 0
            }
            return Math.floor(this.done / this.todos.length * 100) + '%'
        }
    }
})