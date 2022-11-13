# doom-builder

## Necessity
this packge is made to make it easier to create dom elements by hand and also make it reactive.

## Basic undesthanding
it exports two methods element and effect.
element is used to create html elements and effect creates a object to enable reactivity.

## How it works

the element method returns a class that uses the builder design pattern to modify the html element

```js
const main = element("div")
    .class("main")
    .parent(document.body)

element("h1")
    .html("Hello world")
    .parent(main)
    .class("title")
```
