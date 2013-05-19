Library independent "Promise" implementation

(NB the Util.loop function is not included in this library - it is assumed to be a generic "forEach" style implementation passing the index as the parameter)

```javascript

var defs = [], 
    inputs = document.getElementsByTagName('input');

Util.loop(inputs,function(i){
    defs[i] = Promise();
    input[i].onChange = function(){
        input[i].value != '' ? defs[i].resolve() : defs[i].reject(input[i]);
    }  
});

Promise.when(defs).then(function(){
    alert('Fields are not empty');
},function(input){
    input.style.border = "1px solid red";
    alert('The red field is empty');
});

```
