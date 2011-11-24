/*
formii.js version 0.2
Делаем формы чуточку лучше

TODO::
Вешать .select на form и fieldset
placeholder

*/

;(function(global) {

var formii = global["formii"] = {
	elUUID : "_fhj4j6b12",
	"selectClass" : "select",
	"checkedClass" : "checked",
	"labelSelector" : "form label",
	"inLabelInputSelector" : "input,select,textarea"
};

var checkRadioAndCheckbox = function(input, label) {
	if(input.type == 'radio' || input.type == 'checkbox') {
		var m, a;
		
		if(input.type == 'radio' && input.checked) {//Для radio-input'ов
			a = input.form[m = '_' + input.name];
			
			//снимем предыдущее выделение
			input.name && a && a != label && a.classList.remove(formii["checkedClass"]);
			//Сохраним новое выделение в специальной переменной
			input.form[m] = label;
		}
		label.classList[input.checked ? "add" : "remove"](formii["checkedClass"]);
	}
}

var listener = formii["listener"] = function(event) {
	var label = this,
		input = label["input"],
		f = label.form,
		prevLabel = f[formii.elUUID];
	
	/* Если произошло больше событий на один клик (1. По label, 2. На input'е) предотвращяем затирание класса */	
	if(prevLabel && prevLabel != label)prevLabel.classList.remove(formii["selectClass"]);
	
	(f[formii.elUUID] = label).classList.add(formii["selectClass"]);
	
	checkRadioAndCheckbox(input, label);
};

formii["init"] = function(_$$, _toArray, _labelSelector) {
	formii.$$ = _$$;
	formii.$A = _toArray;
	_labelSelector = _labelSelector || formii["labelSelector"] || "";
	
	formii.$A(formii.$$(_labelSelector)).forEach(function(label) {
		label.addEventListener("touchstart", listener, false);
		label.addEventListener("touchend", listener, false);
		label.addEventListener("click", listener, false);
		label.addEventListener("focus", listener, false);
		label.addEventListener("DOMFocusIn", listener, false);
		
		label["input"] = formii.$$(formii["inLabelInputSelector"], label)[0];
		checkRadioAndCheckbox(label["input"], label);
	});	
};

})(window);