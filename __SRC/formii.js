// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name formii.js
// @check_types
// ==/ClosureCompiler==
/*
version 0.4
Делаем формы чуточку лучше

*/

;(function(global) {

if(global["formii"])return;//prevent second initialisation

var elUUID = "_fhj4j6b12";//A some unique value. May be randomString()

var formii = global["formii"] = [
	"select",
	"checked",
	"readonly",//TODO
	"disabled",//TODO
	"indeterminate",//TODO
	"valid",//TODO
	"invalid",//TODO
	"",//reserved
	"form label"
]

var checkRadioAndCheckbox = function(label) {
	var input = label["control"];
	if(input.type == 'radio' || input.type == 'checkbox') {
		var m, a;
		
		if(input.type == 'radio' && input.checked) {//Для radio-input'ов
			a = input.form[m = '_' + input.name];
			
			//снимем предыдущее выделение
			input.name && a && a != label && a.classList.remove(formii[1]);
			//Сохраним новое выделение в специальной переменной
			input.form[m] = label;
		}
		label.classList[input.checked ? "add" : "remove"](formii[1]);
	}
}

var checkLabel = function() {
	var label = this,
		f = label.form,
		prevLabel = f[elUUID];
	
	/* Если произошло больше событий на один клик (1. По label, 2. На input'е) предотвращяем затирание класса */	
	if(prevLabel && prevLabel != label)prevLabel.classList.remove(formii[0]);
	
	(f[elUUID] = label).classList.add(formii[0]);
	
	checkRadioAndCheckbox(label);
};

formii["init"] = function(root, _labelSelector) {
	_labelSelector = _labelSelector || formii[8] || "";
	
	Array["from"](root.querySelectorAll(_labelSelector)).forEach(function(label) {
		//label.addEventListener("touchstart", checkLabel, false);//realy need?
		//label.addEventListener("touchend", checkLabel, false);//realy need?
		label.addEventListener("click", checkLabel, false);
		label.addEventListener("focus", checkLabel, false);
		//label.addEventListener("blur", checkLabel, false);
		label.addEventListener("DOMFocusIn", checkLabel, false);//need in HTML5 browsers
		//label.addEventListener("DOMFocusOut", checkLabel, false);
		
		checkRadioAndCheckbox(label);
	});	
};

})(window);