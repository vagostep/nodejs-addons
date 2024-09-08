import bindings from "bindings";

const helloWorld = bindings("hello-world");

console.log(helloWorld.sayHello()); // "Hello from addon!"