var time = new Date()
var day_list = ['日', '一', '二', '三', '四', '五', '六'];
var today = `${time.getFullYear()}.${time.getMonth()+1}.${time.getDate()}(${day_list[time.getDay()]})`


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '', //輸入框
    todos: [
      {
        id : '001',
        title: '到大木博士家領取寶可夢',
        time: today,
        completed: false
      }
    ],
    visi: 'all',
    cacheTodo:{},
    cacheTitle:''
  },
  methods:{
    addTodo: function(){
      var value = this.newTodo.trim();
      var id = Math.floor(Date.now());
      if(!value) return
      this.todos.push({
        id : id,
        title: value,
        time: today,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo: function(index){
      this.todos.splice(index,1)  
    },
    editTodo: function(item){
      this.cacheTitle = item.title
      this.cacheTodo = item
    },
    doneEdit: function(item){
      item.title = this.cacheTitle
      this.cacheTodo = {}
    },
    cancelEdit: function(){
      this.cacheTodo = {}
    },
    clearAll: function(){
      var r = confirm('確認要清除所有代辦事項?')
      if(r){
        this.todos= []
      }
    }
  },
  computed:{//過濾後的資料
    filter: function(){
      if(this.visi =='all'){
        return this.todos;
      }else if(this.visi =='ing') {
        var newTodos = [];
        this.todos.forEach(function(item){
          if(!item.completed) newTodos.push(item)
        })
        return newTodos
      }else if(this.visi =='done'){
        var newTodos = [];
        this.todos.forEach(function(item){
          if(item.completed) newTodos.push(item)
        })
        return newTodos 
      }
      return [];
    },
    done: function(){
      var done = []
      done = this.todos.filter(function(item){
        return item.completed == true
      })
      return done.length 
    },
    remain: function(){
      var remain = []
      remain = this.todos.filter(function(item){
        return item.completed == false
      })
      return remain.length
    },
    process: function(){
      if(this.todos.length<=0){
        return 0
      }
      return Math.floor(this.done/this.todos.length*100) + '%'
    }
  }
})