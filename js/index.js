/**
 * Created by S on 2017/12/22.
 */
/*实现下拉菜单效果*/

    window.addEventListener("load", function () {

        /*-----------------------------------------------------------------------------下拉菜单部分-------------------*/
        var li1 = document.getElementById("li1");       //我的美团
        li1.onmouseover = function () {
            li1.className = "toggleli on";
        }
        li1.onmouseout = function () {
            li1.className = "toggleli";
        }

        var li2 = document.getElementById("li2");       //商家导航
        li2.onmouseover = function () {
            li2.className = "toggleli on";
        }
        li2.onmouseout = function () {
            li2.className = "toggleli";
        }

        var li3 = document.getElementById("li3");       //网站导航
        li3.onmouseover = function () {
            li3.className = "toggleli on";
        }
        li3.onmouseout = function () {
            li3.className = "toggleli";
        }

        /*--------------------------------------------------------------------------搜索框部分------------------------*/
        //当输入框获得焦点时，显示搜索记录
        var search = document.getElementById("search-input");
        var history = document.getElementById("search-history");
        search.onfocus = function () {
            history.style.display = "block";
        }
        //失去焦点，关闭显示记录
        search.onblur = function () {
            history.style.display = "none";
        }

        /*---------------------------------------------------------------------------分类部分-------------------------*/
        //显示类目清单
        function categoryListShow() {
            var lists = document.getElementById("categoryList").getElementsByTagName("li");
            //console.log(lists.length);
            var items = document.getElementById("categoryListItem").getElementsByTagName("dl");
            //console.log(items.length);
            //console.info(items);
            var colorPrim = null;
            var iconFront = null;
            for (var i = 0; i < lists.length; i++) {
                lists[i].index = i;
                items[i].index = i;
                //console.info(lists[i]);
                //console.info(items[i]);
                lists[i].onmouseover = function () {
                    iconFront = lists[this.index].children[0];                  //获取list前的icon元素
                    //console.info(iconFront);
                    colorPrim = lists[this.index].style.backgroundColor;        //先记录下原来的背景颜色
                    lists[this.index].style.backgroundColor = "#54C9BE";        //改变背景颜色
                    items[this.index].style.display = "block";                  //显示右侧清单
                    iconFront.style.opacity = "1";                              //改变图标的透明度
                }
                lists[i].onmouseout = function () {
                    lists[this.index].style.backgroundColor = colorPrim;        //改为原来的背景颜色
                    items[this.index].style.display = "none";                  //隐藏右侧清单
                    iconFront.style.opacity = "0.3";
                }
            }
        }
        categoryListShow();

        /*-----------------------------------------------------------------------------轮播图-------------------------*/
        //显示左右切换按钮
        function showPreNext() {
            var categoryCarousel = document.getElementById("category-carousel");
            var pre = document.getElementById("btn-pre");
            var next = document.getElementById("btn-next");
            //当鼠标在轮播图上时，显示左右按钮
            categoryCarousel.onmouseover = function () {
                pre.style.display = "block";
                next.style.display = "block";
            }
            categoryCarousel.onmouseout = function () {
                pre.style.display = "none";
                next.style.display = "none";
            }
        }
        showPreNext();
        //每隔3s移动一屏&左右切换
        var current = 0;
        function move() {
            var carousel = document.getElementById("carousel");
            var pre = document.getElementById("btn-pre");
            var next = document.getElementById("btn-next");
            //当按左右切换按钮时，切换上一屏或下一屏
            pre.onmouseup = function () {
                if (current == 0) {                                 //若是第一屏则切换至最后一屏
                    current = 4;
                    carousel.style.left = (current) * (-550) + "px";
                }
                current--;                                          //表示向前移动一屏
                //console.log("ok");
                carousel.style.left = (current) * (-550) + "px";    //更新left
                clearInterval(timer);                               //清除定时器
                clearTimeout(timerOut);
                timerOut = setTimeout(function () {                //5s后再move()
                    move();
                },5000)
            }
            next.onmouseup = function () {
                current++;                                          //表示向后移动一屏
                //console.log("ok");
                if (current == 5) {                                 //如果到最后一屏了就已到第一屏
                    current = 1;
                    carousel.style.left = "0px";
                }
                carousel.style.left = (current) * (-550) + "px";    //更新left
                clearInterval(timer);                               //清除定时器
                clearTimeout(timerOut);
                timerOut = setTimeout(function () {                //5s后再move()
                    move();
                },5000)
            }
            var dx = 50;
            var timer = null;
            var timerOut = null;
            current++;
            if (current == 5) {
                current = 1;
                carousel.style.left = "0px";
            }
            timer = setInterval(function () {
                var oldLeft = carousel.offsetLeft;
                //console.log(oldLeft);
                //减少left
                var newLeft = oldLeft - dx;
                carousel.style.left = newLeft + "px";
                //判断是否移完第一屏，是则关掉定时器
                if (newLeft <= (current * -550)){
                    clearInterval(timer);
                    //一屏结束则停止三秒，再调用move()函数
                    timerOut = setTimeout(function () {
                        move();
                    },5000)
                }
            },10)
        }
        setTimeout(function () {                        //页面加载成功后5s以后再开始move()
            move();
        },5000);

        /*--------------------------------------------------------------------------------选项卡部分------------------*/
        function qualityChange() {
            //有格调页的内容切换
            var qualityList = document.getElementById("quality-list");
            var dds = qualityList.getElementsByTagName("dd");
            var qualityItem = document.getElementById("quality-item");
            var uls = qualityItem.getElementsByTagName("ul");
            //console.info(dds);
            for (var i = 0; i < dds.length; i++) {
                dds[i].index = i;
                uls[i].index = i;
                dds[i].onmouseover = function () {
                    //console.info(i);
                    for (var j = 0; j < dds.length; j++) {
                        uls[j].style.display = "none";      //将所有ul的都设置为不显示
                        dds[j].className = "";
                    }
                    uls[this.index].style.display = "block";//将当前鼠标在的dd对应的quality-item设置为block
                    dds[this.index].className = "active";   //?????????为什么用dds[i]会出错

                }
            }
        }
        function discountChange() {
            //很优惠页的内容切换
            var discountList = document.getElementById("discount-list");
            var dds = discountList.getElementsByTagName("dd");
            var discountItem = document.getElementById("discount-item");
            var uls = discountItem.getElementsByTagName("ul");
            //console.info(dds);
            for (var i = 0; i < dds.length; i++) {
                dds[i].index = i;
                uls[i].index = i;
                dds[i].onmouseover = function () {
                    //console.info(i);
                    for (var j = 0; j < dds.length; j++) {
                        uls[j].style.display = "none";      //将所有ul的都设置为不显示
                        dds[j].className = "";
                    }
                    uls[this.index].style.display = "block";//显示当前选项卡
                    dds[this.index].className = "active";

                }
            }
        }
        function movieChange() {
            //猫眼电影页的内容切换
            var movieList = document.getElementById("movie-list");
            var dds = movieList.getElementsByTagName("dd");
            var movieItem = document.getElementById("movie-item");
            var uls = movieItem.getElementsByTagName("ul");
            //console.info(dds);
            for (var i = 0; i < dds.length; i++) {
                dds[i].index = i;
                uls[i].index = i;
                dds[i].onmouseover = function () {
                    //console.info(i);
                    for (var j = 0; j < dds.length; j++) {
                        uls[j].style.display = "none";      //将所有ul的都设置为不显示
                        dds[j].className = "";
                    }
                    uls[this.index].style.display = "block";
                    dds[this.index].className = "active";

                }
            }
        }
        qualityChange();
        discountChange();
        movieChange();
    })