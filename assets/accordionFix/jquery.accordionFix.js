$('.panel-heading').on('click', function (event) {
	event.stopPropagation();
	
	if($(this).attr('role') == 'tab'){
		var parent = $(this).parent(),
			mainparent = parent.parent();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			parent.removeClass('active');
			$(this).siblings('.panel-collapse').eq(0).stop().slideUp(400);
		} else{
			mainparent.find('.panel-collapse').each(function () {
				$(this).parent().removeClass('active');
				$(this).siblings('.panel-heading').eq(0).removeClass('active');
				$(this).stop().slideUp(400);
			});
			$(this).addClass('active');
			parent.addClass('active');
			$(this).siblings('.panel-collapse').eq(0).stop().slideDown(400);
		}
	}
});


		