angular.module('app', ['ngMaterial']).controller('PomodoroController', function($interval){
	

	////////////////////////////////////////////////////////////////////////
	////////////////////////FOUNDATIONAL DEFINITIONS////////////////////////
	
	var vm = this;

	vm.session = 'WORK';
	vm.break = '..CHILL..';
	
	
	//SessionTimes-no cumulative "vm.sessionTime" variable
	vm.sessionTimeSeconds = 0;
	vm.sessionTimeMinutes = 20;
	vm.sessionTimeSecondsDisplay = '0' + vm.sessionTimeSeconds;
	//BreakTimes- no cumulative "vm.breakTime" variable
	vm.breakTimeSeconds = 0;
	vm.breakTimeMinutes = 2;
	vm.breakTimeSecondsDisplay = '0' + vm.breakTimeSeconds;

	vm.currentTimeMinutes = vm.sessionTimeMinutes;
	vm.currentTimeSeconds = vm.sessionTimeSeconds;
	vm.currentTimeSecondsDisplay = '0' + vm.currentTimeSeconds;
	vm.currentTime = vm.currentTimeMinutes * 60 + Number(vm.currentTimeSeconds);

	console.log(vm.currentTime);
	//currentTime
	
	//The definitions of vm.currentTimeMinutes and vm.currentTimeSeconds must be above vm.currentTime = vm.currentTimeSeconds + vm.currentTimeMinutes * 60; other wise vm.currentTime will = NaN. Variables are not hoisted, only functions
	
	vm.displayTime = vm.currentTimeMinutes + ':' + vm.currentTimeSecondsDisplay;

	console.log(vm.displayTime);
	

	vm.status= vm.session;
	vm.running = false;
	/////////////////////FOUNDATIONAL DEFINITIONS/////////////////////////
	//////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	///////////////////////////////ADD FUNCTIONS//////////////////////////
	
	//kind of like  var = addTimeSession = function() but since its within the scope of 'this' which = 'vm' 
	vm.addTimeSessionSeconds = function() {
		if(vm.sessionTimeSeconds < 9){
			vm.sessionTimeSeconds++;
			vm.sessionTimeSecondsDisplay="0"+vm.sessionTimeSeconds;
		}
		else if(vm.sessionTimeSeconds === 59) {
			vm.sessionTimeSeconds = 0;
			vm.sessionTimeSecondsDisplay = '0' + 0;
			vm.sessionTimeMinutes++;
		}
		else {
			vm.sessionTimeSeconds++;
			vm.sessionTimeSecondsDisplay=vm.sessionTimeSeconds;
		}
	};
	vm.addTimeSessionMinutes = function() {
		vm.sessionTimeMinutes++;
	};
	vm.addTimeBreakSeconds = function() {
		if(vm.breakTimeSeconds < 9){
			vm.breakTimeSeconds++;
			vm.breakTimeSecondsDisplay="0"+vm.breakTimeSeconds;
		}
		else if(vm.breakTimeSeconds === 59) {
			vm.breakTimeSeconds = 0;
			vm.breakTimeSecondsDisplay = '0' + 0;
			vm.breakTimeMinutes++;
		}
		else {
			vm.breakTimeSeconds++;
			vm.breakTimeSecondsDisplay=vm.breakTimeSeconds;
		}
	};
	vm.addTimeBreakMinutes = function() {
		vm.breakTimeMinutes++;
	};
	///////////////////////////////////ADD FUNCTIONS////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////SUBTRACT FUNCTIONS////////////////////////////
	
	vm.minusTimeSessionSeconds = function() {
		if(vm.sessionTimeSeconds < 1 && vm.sessionTimeMinutes >= 1){
			vm.sessionTimeSeconds = 59;
			vm.sessionTimeSecondsDisplay = vm.sessionTimeSeconds;
			vm.sessionTimeMinutes--;
		}else if(vm.sessionTimeSeconds <= 10 && vm.sessionTimeSeconds >= 1){
			vm.sessionTimeSeconds--;
			vm.sessionTimeSecondsDisplay = "0" + vm.sessionTimeSeconds;
		}else if(vm.sessionTimeSeconds < 1 && vm.sessionTimeMinutes < 1){
			// return;
		}else{
			vm.sessionTimeSeconds--;
			vm.sessionTimeSecondsDisplay = vm.sessionTimeSeconds
		}
	};
	vm.minusTimeSessionMinutes = function() {
		if(vm.sessionTimeMinutes < 1){
			return;
		}
		else{vm.sessionTimeMinutes--;}
	};
	vm.minusTimeBreakSeconds = function() {
		if(vm.breakTimeSeconds < 1 && vm.breakTimeMinutes >= 1){
			vm.breakTimeSeconds = 59;
			vm.breakTimeSecondsDisplay = vm.breakTimeSeconds;
			vm.breakTimeMinutes--;
		}else if(vm.breakTimeSeconds <= 10 && vm.breakTimeSeconds >= 1){
			vm.breakTimeSeconds--;
			vm.breakTimeSecondsDisplay = "0" + vm.breakTimeSeconds;
		}else if(vm.breakTimeSeconds < 1 && vm.breakTimeMinutes < 1){
			// return;
		}else{
			vm.breakTimeSeconds--;
			vm.breakTimeSecondsDisplay = vm.breakTimeSeconds
		}
	};
	
	vm.minusTimeBreakMinutes = function() {
			if(vm.breakTimeMinutes < 1){
			return;
		}
		else {vm.breakTimeMinutes--;}
	};

	///////////////////////////////SUBTRACT FUNCTIONS////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////
	///////////////////////////START,STOP,RESET FUNCTIONs////////////////////////
	
	vm.startTimer = function() {
		vm.running = true;
	};
	vm.stopTimer = function() {
		vm.running = false;
	};
	vm.resetTimer = function() {
		if(vm.status = vm.session) {
		vm.currentTimeMinutes = vm.sessionTimeMinutes;
		vm.currentTimeSeconds = vm.sessionTimeSeconds;
		vm.currentTimeSecondsDisplay = vm.sessionTimeSecondsDisplay;

	} else {vm.currentTimeMinutes = vm.breakTimeMinutes;
		vm.currentTimeSeconds = vm.breakTimeSeconds;};
		vm.running = false;
	};
	if (vm.currentTime === 0){
		vm.running = false;
	}
	/////////////////////////START,STOP,RESET FUNCTIONs///////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////INTERVAL FUNCTION////////////////////////////////
	
	$interval(function(){
		vm.currentTime = vm.currentTimeMinutes * 60 + Number(vm.currentTimeSeconds);
		console.log(vm.currentTime)
		if (vm.running === true && vm.currentTime > 0) {
			
			if(vm.currentTimeSeconds===0) {
			vm.currentTimeMinutes--;
			vm.currentTimeSeconds = 59;
			vm.currentTimeSecondsDisplay = vm.currentTimeSeconds;
			}else{vm.currentTimeSeconds--;
				vm.currentTimeSecondsDisplay = vm.currentTimeSeconds;}
			vm.currentTime--;

		}else if (vm.currentTime === 0){
			
			if(vm.status === vm.session){
				vm.status = vm.break;
				// angular.element("#colorChanger").css("color", "blue");
				vm.currentTimeMinutes = vm.breakTimeMinutes;
				vm.currentTimeSeconds = vm.breakTimeSeconds;
				vm.currentTimeSecondsDisplay = vm.currentTimeSeconds;

				// vm.status = vm.break;
			} else {vm.status = vm.session; 
			vm.currentTimeMinutes = vm.sessionTimeMinutes;
			vm.currentTimeSeconds = vm.sessionTimeSeconds;
			vm.currentTimeSecondsDisplay = vm.sessionTimeSeconds;
			// angular.element("#colorChanger").css("color", "red");
			}
			vm.currentTime--;
		};

		if (vm.currentTimeSeconds < 10 && vm.currentTimeSeconds>=0){
				vm.currentTimeSecondsDisplay = '0' + vm.currentTimeSeconds;
			}else{vm.currentTimeSecondsDisplay = vm.currentTimeSeconds;}
		console.log(vm.currentTimeSeconds)
		
		vm.displayTime = vm.currentTimeMinutes + ':' + vm.currentTimeSecondsDisplay;
	}, 1000)
})
