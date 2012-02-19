#Make forms little better

__Status__: Work in progress...

## Goal

 - label.select for current input:focus element
 - label.checked for input:checked

## Requared
 1. DOM-SHIM
 
## init

    if(window.formii)window.formii.init(root || document)
 
##TODO
1. "disabled" support
2. Class "select" on form and fieldset
3. placeholder ?
4. "autofocus" in input support
5. External API for init() function