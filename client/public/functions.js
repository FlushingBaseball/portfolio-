//Jquery to open up nav menu after document load

$(function(){
	$("#nav-icon").on("click", function(e){
		$(this).toggleClass("open");
		$("nav ul:last-of-type").toggleClass("show", "fast");
	});
});
