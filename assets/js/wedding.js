;$(function(){


	$('#regist-submit-btn').click(function(){
		$.post('/backend/regist', $('#regist-form').serialize(), function(result){
			if(result === 'success'){
				console.info(result)
			}
		});
		
	});

	//countdown
	(function(){
		var wedding_date = new Date('Wed Dec 30 2015 08:00:00 GMT+0800');
		var current = new Date();
		var countdown = Math.ceil((wedding_date - current)/(24*60*60*1000));
		$('#countdown').text(countdown);
	})();
});