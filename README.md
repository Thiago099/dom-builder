# doom-builder

## Necessity
this packge is made to make it easier to create dom elements by hand and also make it reactive.

## Basic undesthanding
it exports two methods element and effect.
element is used to create html elements and effect creates a object to enable reactivity.

## How it works

the element method returns a class that uses the builder design pattern to modify the html element

## Examples
 
 ### Create a basic element

![image](https://user-images.githubusercontent.com/66787043/201551233-56420343-f21a-492a-9bdf-e04bf64c54cf.png)

```js
element("h1")
    .html("Hello world")
    .parent(document.body)
    .class("title")
```

### A button component with a number that increment once you've clicked it

![image](https://user-images.githubusercontent.com/66787043/201551278-6213c798-9f1a-421c-89ab-c805866e9211.png)
