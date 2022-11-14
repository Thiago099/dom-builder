import ObservableSlim from 'observable-slim';

export function effect(initial_value){
    const callbacks = [];

    function subscribe(callback){
        callbacks.push(callback);
    }
    initial_value.__subscribe = subscribe;
    
    const data = ObservableSlim.create(initial_value, true, (changes)=> {
        for(const callback of callbacks){
            callback(data);
        }
    });
    return data
}

class el{
    // constructor
    constructor(name) {
        this.element = document.createElement(name);
        this.events = [];
    }

    effect(data)
    {
        data.__subscribe(() => {
            for(const event of this.events)
            {
                event()
            }
        })
        return this
    }

    #handleFunction(data)
    {
        if(typeof data === "function")
        {
            return data()
        }
        return data
    }

    #handleEffect(isReactive,callback)
    {
        if(isReactive)
        {
            const main = () =>
            {
                callback()
            }
            main()
            this.events.push(main)
        }
        else
        {
            callback()
        }
    }

    #isReactive(...fields)
    {
        for(const field of fields)
        {
            if(typeof field === "function")
            {
                return true
            }
        }
        return false
    }

    class(name, value = true)
    {
        if(this.#isReactive(name))
        {
            var previous = this.#handleFunction(name)
        }
        this.#handleEffect(this.#isReactive(name,value),()=>{
            const classes = this.#handleFunction(name)
            if(classes)
            {
                if(this.#handleFunction(value))
                {
                    if(this.#isReactive(name))
                    {
                        if(previous)
                        {
                            this.element.classList.remove(...((previous).split(" ")))
                        }
                        previous = classes
                    }
                    this.element.classList.add(...((classes).split(" ")));
                }
                else
                {
                    this.element.classList.remove(...((classes).split(" ")));
                    previous = null
                }
            }
        })
        return this
    }
    parent(object)
    {
        if(object.element !== undefined)
        {
            object.element.appendChild(this.element);
        }
        else
        {
            object.appendChild(this.element);
        }
        return this
    }
    parentBefore(object)
    {
        if(object.element !== undefined)
        {
            if(object.element.firstChild)
            {
                object.element.insertBefore(this.element, object.element.firstChild);
            }
            else
            {
                object.element.appendChild(this.element);
            }
        }
        else
        {
            if(object.firstChild)
            {
                object.insertBefore(this.element, object.firstChild);
            }
            else
            {
                object.appendChild(this.element);
            }
        }
        return this
    }
    event(event, callback)
    {
        this.element.addEventListener(event, callback);
        return this
    }
    property(name, value)
    {
        this.#handleEffect(this.#isReactive(name,value),()=>{
            this.element[this.#handleFunction(name)] = this.#handleFunction(value);
        })
        return this
    }
    style(name, value)
    {
        this.#handleEffect(this.#isReactive(name,value),()=>{
            this.element.style[this.#handleFunction(name)] = this.#handleFunction(value);
        })
        return this
    }
    
    html(value)
    {
        this.#handleEffect(this.#isReactive(value),()=>{
            this.element.innerHTML = this.#handleFunction(value)
        })
        return this
    }
    remove()
    {
        this.element.remove();
    }

    model(get,set)
    {
        this.property("value", get)
        this.event("input", (e) => {
            set(e.target.value)
        })
    }
}

export function element(type) {
    return new el(type);
}