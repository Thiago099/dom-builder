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
