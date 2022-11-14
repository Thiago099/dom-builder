# doom-builder

## Necessity
this packge is made to make it easier to create dom elements by hand and also make it reactive.

## Basic undesthanding
it exports two methods element and effect.
element is used to create html elements and effect creates a object to enable reactivity.

## How it works

the element method returns a class that uses the builder design pattern to create a html element

## Examples
 
 ### Create a basic element

![image](https://user-images.githubusercontent.com/66787043/201551233-56420343-f21a-492a-9bdf-e04bf64c54cf.png)

```js
import { element, effect } from "@thiago-kaique/doom-builder";
element("h1")
    .html("Hello world")
    .parent(document.body)
    .class("title")
```

### A button component with a number that increment once you've clicked it

![image](https://user-images.githubusercontent.com/66787043/201551278-6213c798-9f1a-421c-89ab-c805866e9211.png)

```js
import { element, effect } from "@thiago-kaique/doom-builder";
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

### A title that is in sync with the contents of a input

![image](https://user-images.githubusercontent.com/66787043/201551381-0963022e-66d9-46d7-a241-7f4a0560b3fb.png)

``` js
import { element, effect } from "@thiago-kaique/doom-builder";
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

this creates a html element and provides a class with the following methods using the builder design pattern

```js
const obj = element("div")
```

append this object to a parent element (can be used with either html elements or this lib elements)

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

make propertis defined as reactive by beeng a arrow function update when this object is changed

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

takes in object and returns a proxy that once change will affect the screen

```js
const data = effect({count: 0})
```

as long as the element have a effect poiting to the object and the property is a arrow function instead of text

```js
element("button")
 .effect(data)
 .html(() => `Count is: ${data.count}`)
```



