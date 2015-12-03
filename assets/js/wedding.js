;$(function(){

   

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return decodeURIComponent(r[2]); return null;
    }

    if(getQueryString('debug')){
	 $debug = $('<div id="debug" style="position:absolute; top:0; left:0; right:0; bottom: 75%; background: rgba(0, 0, 0, 0.4); ; z-index:100; color:white;" />');
	var o = 0;
	 $debug.click(function(){
		o++;
		if(o%2 == 1){
		$(this).css({top:"75%", bottom:"0"});
		}else{
		$(this).css({bottom:"75%", top:"0"});
		}
		});
	  $('body').append($debug);
	console.info = function(s){
		$debug.append($("<p/>").text(s));		
	}
	}
	var audio = $('#audio')[0];
audio.addEventListener('canplay', function() {
  audio.play();
});

audio.load();
audio.play();

    var nick = getQueryString('name');
    if(nick){
    	$('.invitation-desc').html("尊敬的" + nick + '</br>' + $('.invitation-desc').html());
    	$('#nick-input').val(nick);
	document.title = "尊敬的"+nick + '， 庄钊文与卢玲邀您参加婚宴';
    }


	$('#regist-submit-btn').click(function(){
		$.post('/backend/regist', $('#regist-form').serialize(), function(result){
			console.info(result);
				$('.regist-form').html(
					'<div class="submit-success">你的信息已登记</br> \
					 	庄钊文 与 卢玲</br>  \
					 	届时欢迎大驾光临！\
					 </div>\
					 <div class="notic">请继续翻页欣赏我们的婚纱照</div>'
				);
				console.info($('.regist-form').html());
		}).error(function(e){
			console.info("error");
		});
		
	});

	var previewPhotos = [];

	(function(){

		var photos = [
			'496A7481.JPG',
			'496A7446.JPG',
			'496A7453.JPG',
			'496A7467.JPG',
			'496A7475.JPG',
			'496A7480.JPG',
			'496A7506.jpg',
			'496A7491.JPG',
			'496A7529.jpg',
			'496A7530.jpg',
			'496A7576.jpg',
			'496A7590.jpg',
			'496A7600.jpg',
			'496A7609.jpg',
			'496A7619.jpg',
			'496A7631.jpg',
			'496A7637.jpg',
			'496A7641.jpg',
			'496A7642.jpg',
			'496A7644.jpg',
			'496A7647.jpg',
			'496A7652.jpg',
			'496A7657.jpg',
			'496A7667.jpg',
			'496A7672.jpg',
			'496A7684.jpg',
			'496A7695.jpg',
			'496A7697.jpg',
			'496A7698.jpg',
			'496A7706.jpg',
			'496A7710.jpg',
			'496A7712.jpg',
			'496A7718.jpg',
			'496A7725.jpg',
			'496A7736.jpg',
			'496A7746.jpg',
			'496A7747.jpg',
			'496A7750.jpg',
			'496A7762.jpg',
			'496A7764.jpg',
			'496A7765.jpg',
			'496A7767.jpg',
			'496A7788.jpg',
			'496A7799.jpg',
			'496A7813.jpg',
			'496A7828.jpg',
			'496A7829.jpg',
			'496A7852.jpg',
			'496A7854.jpg',
			'496A7857.jpg',
			'496A7911.jpg',
			'496A7935.jpg',
			'496A7938.jpg',
			'496A7941.jpg',
			'496A7962.jpg'
		];
		

		var photo_endpoint = './assets/photos_270/';

		var line1 = $('#p-line1');
		var line2 = $('#p-line2');
		for(var i  = 0 ; i < photos.length ; i ++ ){
			previewPhotos[i] = 'http://wedding.zimmem.com/assets/photos_540/' + photos[i];
			photos[i] = photo_endpoint + photos[i];
			if(line1.width() >  line2.width()){
				 line2.append('<img src="'+ photos[i] +'" data-source="'+ previewPhotos[i] +'"/>')
			}else{
				line1.append('<img src="'+ photos[i] +'" data-source="'+ previewPhotos[i] +'"/>')
			}
		}
		
	})();




	$('.item .arrow').click(function(){
		console.info('next');
	});

	//countdown
	(function(){
		var wedding_date = new Date('Wed Dec 30 2015 08:00:00 GMT+0800');
		var current = new Date();
		var countdown = Math.ceil((wedding_date - current)/(24*60*60*1000));
		$('#countdown').text(countdown);
	})();


	//wechat
	if(wx){
		$.get("/backend/wx_js_config?url="+encodeURIComponent(window.location.href), function(config){
			config.jsApiList = ["previewImage"];
			wx.config(config);
		})

		wx.ready(function(){
			$(".map-wrapper").click(function(){
				wx.previewImage({
				    current: 'http://wedding.zimmem.com/assets/img/map.png', // 当前显示图片的http链接
				    urls: ['http://wedding.zimmem.com/assets/img/map.png'] // 需要预览的图片http链接列表
				});
			});
			$('.p-line img').click(function(){
				wx.previewImage({
				    current:  $(this).data("source"), // 当前显示图片的http链接
				    urls: previewPhotos // 需要预览的图片http链接列表
				});
			});
		});
	}
	
});
