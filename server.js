var Koa = require('koa');
var app = new Koa();
var router = require('koa-router');

var api = router();

api.get('/' ,function(ctx,next){
    console.log(ctx.query)
    return ctx.body = ctx.query
});

api.get('/test' ,function(ctx,next){
    console.log(ctx.query)
    var a = {"a":1};
    return ctx.body = a
});

app
    .use(api.routes())
    .use(api.allowedMethods());

app.listen('3000',function(){
    console.log('listening in 3000 port')
})
