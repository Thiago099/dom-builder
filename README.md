# dom-builder

## Necessity
This package is made to make it easier to create dom elements by hand and also make it reactive.

## Basic undesthanding
It exports two methods element and effect.
The element is used to create HTML elements and effect creates an object to enable reactivity.

## How it works

The element method returns a class that uses the builder design pattern to create an html element

## Examples
 
 ### Create a basic element

![image](https://user-images.githubusercontent.com/66787043/201551233-56420343-f21a-492a-9bdf-e04bf64c54cf.png)

```js
import { element, effect } from "@thiago-kaique/dom-builder";
element("h1")
    .html("Hello world")
    .parent(document.body)
    .class("title")
```

### A button component with a number that increment once you've clicked it

![image](https://user-images.githubusercontent.com/66787043/201551278-6213c798-9f1a-421c-89ab-c805866e9211.png)

```js
import { element, effect } from "@thiago-kaique/dom-builder";
export default function CounterButton()
{
    const data = effect({count: 0})
    const main = element("div")
        .class("block")

     element("button")
        .effect(data)
        .html(() => `Count is: ${data.count}`)
        .event("click", e => data.count++)
        .parent(main)
    
    return main
}
```

live preview of the examples:

https://thiago099.github.io/dom-builder-example/

source code:

https://github.com/Thiago099/dom-builder-example

### A title that is in sync with the contents of a input

![image](https://user-images.githubusercontent.com/66787043/201551381-0963022e-66d9-46d7-a241-7f4a0560b3fb.png)

``` js
import { element, effect } from "@thiago-kaique/dom-builder";
export default function EditableTitle(text = "Hello world")
{
    const data = effect({text})

    const main = element("div")
        .class("card")

    element("h3")
        .effect(data)
        .html(()=>data.text)
        .parent(main)

    element("input")
        .parent(main)
        .effect(data)
        .model( 
            () => data.text, 
            (value) => data.text = value
        )

    return main
}
```
## Documentation
### method element

This creates an html element and provides a class with the following methods using the builder design pattern

```js
const obj = element("div")
```

Append this object to a parent element (can be used with either html elements or this lib elements)

```js
obj.parent(document.body)
```

sets the inner html 

```js
obj.html("Hello world")
```

sets the class

```js
obj.class("card")

obj.class("card",false) // remove the class or set the class visible if the function is true
```

adds a event listner

```js
obj.event("click", e => alert("hello"))
```

sets a property

```js
obj.property("src","img.jpg")
```

sets a style

```js
obj.style("background-color","red")
```

removes the element from dom

```js
obj.remove()
```

Make properties defined as reactive by being an arrow function update when this object is changed

```js
obj.effect(data)
```

```js
function get()
{
    return data.text
}
function set(value)
{
    data.text = value
}
obj.model(get,set)
```

### method effect

Takes in object and returns a proxy that once change will affect the screen

```js
const data = effect({count: 0})
```

As long as the element has an effect pointing to the object and the property is an arrow function instead of text

```js
element("button")
 .effect(data)
 .html(() => `Count is: ${data.count}`)
```



