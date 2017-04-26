//四个输入框跳转

		function key1_touchend(){
			if (document.card.key1.value.length==1) {
				document.card.key2.focus();
			}	
		}
		function key2_touchend(){
			if (document.card.key2.value.length==1) {
				document.card.key3.focus();
			}
		}
		function key3_touchend(){
			if (document.card.key3.value.length==1) {
				document.card.key4.focus();
			}
		}
		//运动事件监听
		if (window.DeviceMotionEvent) {
		    window.addEventListener('devicemotion',deviceMotionHandler,false);
		}

		//获取加速度信息
		//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
		//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
		var SHAKE_THRESHOLD = 7000;
	    var last_update = 0;
	    var last_time = 0;
	    var x;
	    var y;
	    var z;
	    var last_x;
	    var last_y;
	    var last_z;
		var curTime;
	    var isShakeble = true;

		function deviceMotionHandler(eventData) {
	        var acceleration =eventData.accelerationIncludingGravity;
	        var curTime = new Date().getTime();
	        if ((curTime-last_update)> 30) {
	            var diffTime = curTime -last_update;
	            last_update = curTime;
	            x = acceleration.x;
	            y = acceleration.y;
	            z = acceleration.z;
	            var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 8000;
	            if (speed > SHAKE_THRESHOLD && curTime - last_time > 3100 && isShakeble) {
	             	isShakeble = false;
        			last_time = curTime;
	                input[0].value=1;
	                input[1].value=3;
	                input[2].value=0;
	                input[3].value=2;
	                tips.innerHTML='密码正确'; 
	                setTimeout(function(){
	               		page2.style.transform='scale(1)'
	               		page2.style.webkitTransform='scale(1)'
	                },700)
	              
	            }
	            last_x = x;
	            last_y = y;
	            last_z = z;
	        }
		}
		var page1=document.querySelector('.page1') 
		var page2=document.querySelector('.page2') 
		var lockNum=document.querySelector('.lock_num_ul');
		var li=lockNum.querySelectorAll('li');
		var formPsd=document.getElementById('form_psd')
		var input=formPsd.getElementsByTagName('input');
		var tips=document.querySelector('.tips')
		for (var i = 0; i < li.length; i++) {
			li[i].index=i;
			var psd=new Array();
			
			li[i].onclick=function(){
				
				psd.push(li[this.index].innerHTML);
				//只能输入四个，截取4个数字
				psd=psd.splice(0,4)
					input[0].value=psd[0];
					if (psd[1]) {
						input[1].value=psd[1];
					}
					if (psd[2]) {
						input[2].value=psd[2];
					}
					if (psd[3]) {
						input[3].value=psd[3];
					}	
					
				if (psd.length==4&&psd[0]==1&&psd[1]==3&&psd[2]==0&&psd[3]==2) {
					console.log('解锁');
					tips.innerHTML='密码正确';
					// page1.style.display='none'
					page2.style.transform='scale(1)'
					page2.style.webkitTransform='scale(1)'

				}
			//密码错误提示
				else if(psd.length==4){
					if (psd!=[1,3,0,2]) {
						tips.innerHTML='密码错误';
						tips.className+=' tipsMove'
						setTimeout(function(){
							tips.className='tips';
						},500)
					}
				}
			}
			//密码删除控制，并把输入框的underfind问题处理
			var del=document.querySelector('.del');
				del.onclick=function(){
					if (psd.length) {
						psd.splice(psd.length-1,1)	
						if (psd[0]) {
							input[0].value=psd[0];
						}
						else{
							input[0].value='';
						}

						if (psd[1]) {
							input[1].value=psd[1];
						}
						else{
							input[1].value='';
						}
						if (psd[2]) {
							input[2].value=psd[2];
						}
						else{
							input[2].value='';
						}
						if (psd[3]) {
							input[3].value=psd[3];
						}
						else{
							input[3].value='';
						}	
					}
				}
		}

		var arr=['林玲','陈思','邹益萍','万文奇','黄延球','闫玉林','曾精成','张指南','林焕杨','陈有为','廖子奕','吴超','王琼','郑梦真','陈霞','游丽杰','李敏','徐悦','查鑫','方翠','张瑶','于明珠','欧阳夜兴','赖丽丽','夏梦','黄春华','马范范','罗婷','吴惠妍','陶媛媛','彭星云','鄢凤珍','陈丹','王玉梅','何静','汪晶晶','陈淑玲','袁梦林','陈美倩',
		]
		var name_ul=document.querySelector('.name_ul')
		var name_li=name_ul.querySelectorAll('li')
		var i_name=document.querySelector('#i_name')
		var btn_true=document.querySelector('.btn_true')
		var swiper = new Swiper('.swiper-container',{
			loop:true,
			lazyLoading : true,
			lazyLoadingInPrevNext : true,
			onTransitionEnd:function(swiper){
				var swiper_slide=document.querySelectorAll('.swiper-slide')
				

				// for (var i = 0; i < swiper_slide.length; i++) {
				// 	swiper_slide[i].setAttribute('data-id',i)
				// }
				console.log(swiper.realIndex)
				for (var i = 0; i < name_li.length; i++) {
					name_li[i].addEventListener('touchstart',function(){
						console.log(this.innerHTML);
						i_name.innerHTML=this.innerHTML;
					})
				}
				btn_true.addEventListener('touchstart',function(){
					var slide_active=document.querySelector('.swiper-slide-active')
					if (i_name.innerHTML==slide_active.getAttribute('data-id')) {
						console.log('正确')
						console.log(slide_active.querySelector('img'))
						num=15;
						var timer
						timer=setInterval(function(){
							num--;
							slide_active.querySelector('img').style.webkitFilter="blur("+num+"px)"
						// slide_active.querySelector('img').style.webkitFilter=non;
						slide_active.querySelector('img').style.filter="blur("+num+"px)"
							if (num<0) {
								clearInterval(timer);
								setTimeout(function(){
									swiper.slideNext();
								},500)
								
							}
						},40)
						
					}
					else{
						var dialog=document.querySelector('.show_dialog')
						dialog.style.transform='scale(1)'
						dialog.style.webkitTransform='scale(1)'
						setTimeout(function(){
							dialog.style.transform='scale(0)'
							dialog.style.webkitTransform='scale(0)'
						},1000)
					}
				})
			},
			onReachEnd:function(){
				var page3=document.querySelector('.page3')
				setTimeout(function(){
					page3.style.transform='translateX(0)';
					page3.style.webkitTransform='translateX(0)';
					setTimeout(function(){
						var bgm=document.querySelector('#bgm');
						bgm.play()
						var images1=document.querySelector('.images1')
						// images1.style.display='block';
						images1.className+=" m1"
					},600)
					setTimeout(function(){
						var images2=document.querySelector('.images2')
						// images2.style.display='block';
						images2.className+=" m2"
					},5500)
					setTimeout(function(){
						var images3=document.querySelector('.images3')
						// images3.style.display='block';
						images3.className+=" m3"
					},10000)
					setTimeout(function(){
						var images4=document.querySelector('.images4')
						// images4.style.display='block';
						images4.className+=" m4"
					},14500)
					setTimeout(function(){
						var images5=document.querySelector('.images5')
						// images5.style.display='block';
						images5.className+=" m5";
					},19000)
					setTimeout(function(){
						var images6=document.querySelector('.images6')
						// images6.style.display='block';
						images6.className+=" m6";
					},23500)
					setTimeout(function(){
						var images7=document.querySelector('.images7');
						// images7.style.display='block';
						images7.className+=" m7";
					},28000)

					//图片展示完之后弹出end页面
					setTimeout(function(){

						page3.style.transform='scale(0)';
						page3.style.webkitTransform='scale(0)';

						var end=document.querySelector('.end')
						end.style.transform='scale(1)';
						end.style.webkitTransform='scale(1)';
						var word=document.querySelector('#word');
						var _this=word;
						var str=_this.innerHTML;
						var index=0;
						timer=setInterval(function(){
							var current=str.substr(index,1);
							if (current=='<') {
								index=str.indexOf('>',index)+1
							}
							else{
								index++;
							}
							_this.innerHTML=str.substring(0,index)+(index&1?'_':'');
							if (index>str.length) {
								clearInterval(timer)
							}
						},150)
					},34000)
				},300)
				
			}
		})