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
        this.#handleEffect(this.#isReactive(name,value),()=>{
            if(this.#handleFunction(value))
            {
                this.element.classList.add(...(this.#handleFunction(name).split(" ")));
            }
            else
            {
                this.element.classList.remove(...(this.#handleFunction(name).split(" ")));
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
    event(event, callback)
    {
        const callbackFunction = (e) => callback(e,remove);
        const remove = () =>
        {
            this.element.removeEventListener(event, callbackFunction);
        }
        this.element.addEventListener(event, callbackFunction);
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