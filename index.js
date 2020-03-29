var $lunbo=(function(){
    var $boxs='<div class="slider" id="slider">'+
        '<div class="slide"><img src="img/b5.png" alt=""></div>'+
        '<div class="slide"><img src="img/b1.png" alt=""></div>'+
        '<div class="slide"><img src="img/b2.png" alt=""></div>'+
        '<div class="slide"><img src="img/b3.png" alt=""></div>'+
        '<div class="slide"><img src="img/b4.png" alt=""></div>'+
        '<div class="slide"><img src="img/b5.png" alt=""></div>'+
        '<div class="slide"><img src="img/b1.png" alt=""></div>'+
    '</div>'+   
    '<span id="left"><</span>'+
    '<span id="right">></span>'+
    '<ul class="nav" id="navs">'+
        '<li>1</li>'+
        '<li>2</li>'+
        '<li>3</li>'+
        '<li>4</li>'+
        '<li>5</li>'+
    '</ul>',
    index=1,
    timer,
    isMoving=false;
    function add(){
        $('#box').append($boxs);
        $('#navs').children('li')[0].className = "active";
        timer=setInterval(function(){
            next();
        },3000)
        $('#box').mouseover(function(){
            clearInterval(timer);
            $('span').css({
                opacity: 0.5
            })
        })
        $('#box').mouseout(function(){
            $('span').css({
                opacity: 0
            })
            timer=setInterval(function(){
                next();
            },3000)
        })
        $('#left').click(function(){
            per();
        })
        $('#right').click(function(){
            next();
        })
        for( var i=0; i<$('#navs').children('li').length; i++ ){
            (function(i){
                $('#navs').children('li')[i].onclick = function(){
                    index = i+1;
                    navmove();
                    animate(slider,{left:-1200*index});
                }
            })(i);
        }
    }
    function navmove(){
        for( var i=0; i<$('#navs').children('li').length; i++ ){
            $('#navs').children('li')[i].className = "";
        }
        if(index >5){
            $('#navs').children('li')[0].className = "active";
        }else if(index<=0){
            $('#navs').children('li')[4].className = "active";
        }else {
            $('#navs').children('li')[index-1].className = "active";
        }
    }
    function removel(){
        animate(slider,{left:-1200*index},function(){
            if(index==6){
                $('#slider').css({left:-1200+'px'});
                index = 1;
            }
            isMoving = false;
        });
    }
    function remover(){
        animate(slider,{left:-1200*index},function(){
            if(index==0){
                $('#slider').css({left:-4800+'px'});
                index = 5;
            }
            isMoving = false;
        });
    }
    function next(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index++;
        navmove();
        removel()  
    }
    function per(){
        if(isMoving){
            return;
        }
        isMoving = true;
        index--;
        navmove();
        remover()  
    }
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    function animate(obj,json,callback){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var isStop = true;
            for(var attr in json){
                var now = 0;
                if(attr == 'opacity'){
                    now = parseInt(getStyle(obj,attr)*100);
                }else{
                    now = parseInt(getStyle(obj,attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed>0?Math.ceil(speed):Math.floor(speed);
                var cur = now + speed;
                if(attr == 'opacity'){
                    obj.style[attr] = cur / 100;
                }else{
                    obj.style[attr] = cur + 'px';
                }
                if(json[attr] !== cur){
                    isStop = false;
                }
            }
            if(isStop){
                clearInterval(obj.timer);
                callback&&callback();
            }
        }, 25)
    }
    return {
        add:add
    }    
}())