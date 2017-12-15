/**
 * Created by dell on 2017/9/17.
 */
/**
 * Created by dell on 2017/9/7.
 */
$(function(){
    function daziyouxi(){
        this.box=$('#box');
        this.ku=[
            {value:'A',src:'A.png'},
            {value:'B',src:'B.png'},
            {value:'C',src:'C.png'},
            {value:'D',src:'D.png'},
            {value:'E',src:'E.png'},
            {value:'F',src:'F.png'},
            {value:'G',src:'G.png'},
            {value:'H',src:'H.png'},
            {value:'I',src:'I.png'},
            {value:'J',src:'J.png'},
            {value:'K',src:'K.png'},
            {value:'L',src:'L.png'},
            {value:'M',src:'M.png'},
            {value:'N',src:'N.png'},
            {value:'O',src:'O.png'},
            {value:'P',src:'P.png'},
            {value:'Q',src:'Q.png'},
            {value:'R',src:'R.png'},
            {value:'S',src:'S.png'},
            {value:'T',src:'T.png'},
            {value:'U',src:'U.png'},
            {value:'V',src:'V.png'},
            {value:'W',src:'W.png'},
            {value:'X',src:'X.png'},
            {value:'Y',src:'Y.png'},
            {value:'Z',src:'Z.png'},
        ];
        this.arrtrue=[];
        this.arr=[];
        this.shu=3;
        this.width=$('#box').get(0).offsetWidth-53;
        this.height=$('#box').get(0).offsetHeight-77;
        this.t;
        this.time=50;
        this.live=$('.live');

        this.fengshu=$('.fengshu')
        this.guanka=$('.guanka');
        this.n= this.fengshu.get(0).innerText;
    }
    daziyouxi.prototype={
        qutu:function(){
            do{
                var n=Math.floor(Math.random()*26);
                if(!this.arrtrue[n]){
                    this.arr.push(this.ku[n]);
                }
            }while (this.arr.length<this.shu);
        },



        tianjia:function(){
            while (this.arr.length<this.shu){
                var n=Math.floor(Math.random()*26);
                if(!this.chick(this.ku[n])){
                    this.arr.push(this.ku[n]);
                    var lef=Math.floor(Math.random()*this.width);
                    var to=Math.floor(Math.random()*100);
                    $(`<img src=打字游戏图库/${this.ku[n].src}>`).css({
                        left:lef,
                        top:to,
                    }).appendTo('#box')
                    this.arrtrue.push($('img:last').get(0));

                }
            }

        },
        //点击
        down:function(){
            var that=this;
            $(document).keydown(function(e){
                var key=e.key;
                var ma=that.arr.findIndex(function(valu){

                    return valu.value==key;
                });
                if(ma>-1){
                    that.n++;
                    that.fengshu.get(0).innerHTML=that.n;
                    if(that.n==10){
                        that.time=40;
                        that.arr.splice(0,that.arr.length);
                        that.arrtrue.splice(0,that.arrtrue.length);
                        for(var i=0;i<that.shu;i++){
                            that.box.get(0).removeChild(that.box.children().first().get(0));
                        }
                        that.play();
                        that.guanka.get(0).innerHTML='第2关';
                    }
                    if(that.n==20){
                        that.time=30;
                        that.arr.splice(0,that.arr.length);
                        that.arrtrue.splice(0,that.arrtrue.length);

                        for(var i=0;i<that.shu;i++){
                            that.box.get(0).removeChild(that.box.children().first().get(0));
                        }
                        that.play();
                        that.guanka.get(0).innerHTML='第3关';
                    }
                    if(that.n==30){
                        that.time=20;
                        that.arr.splice(0,that.arr.length);
                        that.arrtrue.splice(0,that.arrtrue.length);

                        for(var i=0;i<that.shu;i++){
                            that.box.get(0).removeChild(that.box.children().first().get(0));
                        }
                        that.play();
                        that.guanka.get(0).innerHTML='第4关';
                    }
                    console.log(that.box)
                    that.box.get(0).removeChild(that.arrtrue[ma]);
                    that.arr.splice(ma,1);
                    that.arrtrue.splice(ma,1);
                    that.tianjia();
                }
            })

        },
        chick:function(obj){
            return this.arr.some(function(val){
                return val.value==obj.value;
            })
        },
        huizhitupian:function(){
            var that=this;
            this.arr.forEach(function(obj){
                var lef=Math.floor(Math.random()*that.width);
                var to=Math.floor(Math.random()*100);
                $(`<img src=打字游戏图库/${obj.src}>`).css({
                    left:lef,
                    top:to,
                }).appendTo('#box')
                that.arrtrue.push($('img:last').get(0));

            })
        },

        move:function(){

            var that=this;
            this.t=setInterval(function(){
                for(var i=0;i<that.arrtrue.length;i++){
                    var imgst=that.arrtrue[i].offsetTop;
                    that.arrtrue[i].style.top=imgst+2+'px';
                    console.log(that.arrtrue)
                    if(that.arrtrue[i].offsetTop>=that.height){
                        console.log(that.arrtrue[i])
                        that.arrtrue[i].parentNode.removeChild(that.arrtrue[i]);
                        that.arr.splice(i,1);
                        that.arrtrue.splice(i,1);
                        that.tianjia();
                        that.live.get(0).innerText=that.live.get(0).innerText-1;

                        if(that.live.get(0).innerText==0){
                            clearInterval(that.t);
                        }

                    }
                }
            },this.time)
        },

        play:function(){
            this.qutu();
            this.huizhitupian();
            this.down();
            this.move();
        }
    }
    var obj=new daziyouxi();
    obj.play();
})
