/*
Leap Motion Demo

For more info, visit:
https://developer.leapmotion.com/documentation/javascript/index.html
*/

$(document).ready(function() {
	// Initialize fullPage Plugin
  // https://github.com/alvarotrigo/fullPage.js#fullpagejs
	$('#fullpage').fullpage({
    // Navigation
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    // Scrolling
    loopHorizontal: false
  });

	// Leap.loop uses browser's requestAnimationFrame
	var options = {
		enableGestures: true
	};

	// Functions
	// gesture detection monitor
	function gestureMonitor(frame) {
		if (frame.gestures.length > 0) {
			for (var i = 0; i < frame.gestures.length; i++) {
				var gesture = frame.gestures[i];
				if (gesture.type == "swipe") {
					//Classify swipe as either horizontal or vertical
					var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
					var swipeDirection = "";
					//Classify as right-left or up-down
					if (isHorizontal) {
						if (gesture.direction[0] > 0) {
							swipeDirection = "right";
						} else {
							swipeDirection = "left";
						}
					} else { //vertical
						if (gesture.direction[1] > 0) {
							swipeDirection = "up";
						} else {
							swipeDirection = "down";
						}
					}

					// DO SOME ACTIONS HERE!
					if (swipeDirection === "right") {
						// Swipe Right

						$.fn.fullpage.moveSlideLeft();

					} else if (swipeDirection === "left") {
						// Swipe Left

						$.fn.fullpage.moveSlideRight();

					} else if (swipeDirection === "up") {
						// Swipe Up

            $.fn.fullpage.moveSectionDown();

					} else if (swipeDirection === "down") {
						// Swipe Down

            $.fn.fullpage.moveSectionUp();

					}
				}
			}
		}
	}

	// Main Leap Loop
	Leap.loop(options, function(frame) {
		// Gestures
		gestureMonitor(frame);
	});
});
