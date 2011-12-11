/**
example/simple.js

declare is a node.js optimized version of dojo 1.7's dojo.declare
This example shows how to create a namespace and create classes within.

No global namespace is violated

declare includes the folloing modified dojo functions

* declare
* mixin
* getObject
* setObject
* exists
* getProp

for more information check the dojo docs (with dojo. prefix for sure)


**/

var createNamespace = require("../index");

var myCustomNamespace = {
    "doesNotMatter" : "anyValue"
};

var oop = createNamespace(myCustomNamespace);


var MYClass = oop.declare("my.namespace.MYCLASS",[],{
    property:"value",
    constructor:function(){
        console.log("I AM ALIVE");
    },
    methodA:function(){
        console.log("methodA called")
        console.log(this);
    },
    methodB:function(){
        console.log("methodB called")
    }
});


oop.declare("MYSubClass",[myCustomNamespace.my.namespace.MYCLASS],{
    constructor:function(){
        oop.mixin(this,{methodC:function(){
            console.log("same mixin like known from dojo @" , this.declaredClass);
        }});
    },
    methodA:function(){
        console.log("method A from " + this.declaredClass);
    }
})




/*
this will end up with the same result...
*/
var instance = new MYClass();
/*
The namespace can be accessed with the object we used to create the "oop" instance.
You could create more factories each with a different namespace
*/
var i2 = new myCustomNamespace.my.namespace.MYCLASS();

var subi = new myCustomNamespace.MYSubClass();
subi.methodA();
subi.methodB();
subi.methodC();


/**
this will print nonsense but working output:
===========================================
I AM ALIVE
I AM ALIVE
I AM ALIVE
method A from MYSubClass
methodB called
same mixin like known from dojo @ MYSubClass
**/
