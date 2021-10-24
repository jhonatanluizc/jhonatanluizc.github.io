function fadeIn(element) {

	/// :: Base.
	var time = 0;
	element.style.display = 'block';
	element.style.opacity = 0;

	/// :: Set Interval.
	var timer = setInterval(() => {

		if(time >= 100){
			clearInterval(timer);
			element.style.opacity = 100 + '%';
		}
		else{
			element.style.opacity = time + '%';
			time = time + 2.5;
		}
		
	}, 10);

}

function fadeOut(element, time) {

	if((time - 10) <= 0){
		element.style.display = "none";
	}
	else{
		setTimeout(function () { 
			element.style.opacity = time + '%';
			fadeOut(element, (time -10))
		 }, 10);
	}
}

function hide(element) {
	element.style.display = 'none';
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}