/**
 * Created by dell on 2017/9/7.
 */
window.onload=function(){
    function daziyouxi(){
        this.box=document.querySelector('#box');
        this.ku=[
            {value:'a',src:'A.png'},
            {value:'b',src:'B.png'},
            {value:'c',src:'C.png'},
            {value:'d',src:'D.png'},
            {value:'e',src:'E.png'},
            {value:'f',src:'F.png'},
            {value:'g',src:'G.png'},
            {value:'h',src:'H.png'},
            {value:'i',src:'I.png'},
            {value:'j',src:'J.png'},
            {value:'k',src:'K.png'},
            {value:'l',src:'L.png'},
            {value:'m',src:'M.png'},
            {value:'n',src:'N.png'},
            {value:'o',src:'O.png'},
            {value:'p',src:'P.png'},
            {value:'q',src:'Q.png'},
            {value:'r',src:'R.png'},
            {value:'s',src:'S.png'},
            {value:'t',src:'T.png'},
            {value:'u',src:'U.png'},
            {value:'v',src:'V.png'},
            {value:'w',src:'W.png'},
            {value:'x',src:'X.png'},
            {value:'y',src:'Y.png'},
            {value:'z',src:'Z.png'},
        ];
        this.arrtrue=[];
        this.arr=[];
        this.shu=3;
        //console.log(box)
        this.width=this.box.offsetWidth-53;
        this.height=this.box.offsetHeight-77;
        this.t;
        this.time=50;
        this.live=document.querySelector('.live');
        this.fengshu=document.querySelector('.fengshu');
        this.guanka=document.querySelector('.guanka');

        console.log(this.fengshu)
        this.n= this.fengshu.innerText;
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
                    var img=document.createElement('img');
                    img.src=`img/${this.ku[n].src}`;
                    var left=Math.floor(Math.random()*this.width);
                    var top=Math.floor(Math.random()*100);
                    img.style.left=left+'px';
                    img.style.top=top+'px';
                    this.box.appendChild(img);
                    this.arrtrue.push(img);
                }
            }

        },
        //点击
        down:function(){
            var that=this;
            document.onkeydown=function(e){
                var key=e.key;
                console.log(e.key)
                    var ma=that.arr.findIndex(function(valu){
                        console.log(that.arr.length)
                        return valu.value==key;
                    });
                    if(ma>-1){
                        that.n++;
                        that.fengshu.innerHTML=that.n;
                        if(that.n==15){
                            that.time=40;
                            that.arr.splice(0,that.arr.length);
                            that.arrtrue.splice(0,that.arrtrue.length);

                            for(var i=0;i<that.shu;i++){
                                that.box.removeChild(that.box.firstElementChild);
                            }
                            that.play();
                            that.guanka.innerHTML='第2关';
                        }
                        if(that.n==30){
                            that.time=30;
                            that.arr.splice(0,that.arr.length);
                            that.arrtrue.splice(0,that.arrtrue.length);

                            for(var i=0;i<that.shu;i++){
                                that.box.removeChild(that.box.firstElementChild);
                            }
                            that.play();
                            that.guanka.innerHTML='第3关';
                        }
                        if(that.n==45){
                            that.time=20;
                            that.arr.splice(0,that.arr.length);
                            that.arrtrue.splice(0,that.arrtrue.length);

                            for(var i=0;i<that.shu;i++){
                                that.box.removeChild(that.box.firstElementChild);
                            }
                            that.play();
                            that.guanka.innerHTML='第4关';
                        }
                        that.box.removeChild(that.arrtrue[ma]);
                        that.arr.splice(ma,1);
                        that.arrtrue.splice(ma,1);
                        that.tianjia();
                    }
            }
        },
        chick:function(obj){
            return this.arr.some(function(val){
                return val.value==obj.value;
            })
        },
        huizhitupian:function(){
            var that=this;
            this.arr.forEach(function(obj){
                var img=document.createElement('img');
                that.box.appendChild(img);
                img.src=`img`+'/'+obj.src;
                var left=Math.floor(Math.random()*that.width);
                var top=Math.floor(Math.random()*100);
                img.style.left=left+'px';
                img.style.top=top+'px';
                that.arrtrue.push(img);
            })
        },
        move:function(){
            var that=this;
            this.t=setInterval(function(){
                for(var i=0;i<that.arrtrue.length;i++){
                    var imgst=that.arrtrue[i].offsetTop;
                    that.arrtrue[i].style.top=imgst+2+'px';
                    if(that.arrtrue[i].offsetTop>=that.height){
                        that.arrtrue[i].parentNode.removeChild(that.arrtrue[i]);
                        that.arr.splice(i,1);
                        that.arrtrue.splice(i,1);
                        that.tianjia();
                        that.live.innerText--;
                        if(that.live.innerText==0){
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
}
