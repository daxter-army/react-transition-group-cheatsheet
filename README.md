# react-transition-group

[Visit Library Homepage](https://reactcommunity.org/react-transition-group/) | [Visit Demo](https://daxter-army.github.io/react-transition-group-cheatsheet/)

- It is a library which exposes different component, which you can use to animate your components. It is not an animation library like framer-motion, making animations on mounting/unmounting easier to achieve.

It has 4 major things

## Transition

- It is basically used to track the **enter** and **exit** states of the component, and then can be used to animate their mounting/unmounting.

```javascript
const [inProp, setInProp] = useState(true);
const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

<div>
  <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
    {(state) => (
      <div
        className="ImageContainerOne"
        ref={nodeRef}
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        HIT 'EM
      </div>
    )}
  </Transition>
  <button onClick={() => setInProp(!inProp)}>Animate me</button>
</div>;
```

## CSS Transition

- If you are using css animations, this should be your ideal choice, as it adds **classNames**, on various states, thus animating the components.

```javascript
const [inProp, setInProp] = useState()

<div>
  <CSSTransition in={inProp} timeout={500} classNames="productCard" unmountOnExit>
    <div className='productCard'>
      <img src="image-url" />
      <div className='header'>
        <h2>Mark your ideas!</h2>
      </div>
    </div>
  </CSSTransition>
  <button onClick={() => setInProp(!inProp)}>Animate me</button>
</div>
```

## Switch Transition

- It helps in applying animation, sequencially.
- It waits for the previous element to leave and then apply animation on the next element.
- It takes a key property to identify elements, individually.

```javascript
const [inProp, setInProp] = useState(false)

<div>
  <SwitchTransition mode="out-in" >
    // it takes a key to distinguish elements
    <CSSTransition key={inProp ? "one" : "two"}
      // this function is important
      addEndListener={(node, done) => {node.addEventListener("transitionend", done, false);}}
      classNames="productCard"
      >
      <div className='productCard'>
        <img src="image-url" />
        <div className='header'>
          <h2>Mark your ideas!</h2>
          <p>{inProp ? 'true' : 'false'}</p>
        </div>
      </div>
    </CSSTransition>
  </SwitchTransition>
  <button onClick={() => setInProp(!inProp)}>Animate me</button>
</div>
```

## Transition Group

- Upgraded version of the Switch Transition. It can apply and track animations on multiple elements like elements in a todo list.
- It works like a state machine, and tracks the animations/state of the enclosed elements.

```javascript
const todoList =[
    { id: "task-1", text: "Learn react"},
    { id: "task-2", text: "Learn react-redux"},
    { id: "task-3", text: "Learn react-router"},
    { id: "task-4", text: "Learn react-transition-group"},
]

<TransitionGroup className='todoList'>
  {
    todoList.length !== 0 && todoList.map(({id, text}) => {
      return <CSSTransition key={id} timeout={500} classNames='todoListItem'>
        <div className='todoListItem'><button onClick={() => setTodoList(todos => todos.filter(todo => todo.id !== id))}>&times;</button><p id={id}>{text}</p></div>
      </CSSTransition>
    })
  }
</TransitionGroup>
```

**NOTE: It can also be paired with react-router, using CSS Transition to create route based animations!**
