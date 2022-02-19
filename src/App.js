import { useState, useRef } from 'react';
import { Transition, CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

function App() {
  const nodeRef = useRef()
  const nodeRef1 = useRef()

  const [inProp, setInProp] = useState(true)
  const [inProp1, setInProp1] = useState(true)
  const [inProp2, setInProp2] = useState(true)
  const [inProp3, setInProp3] = useState(true)

  const TODOLIST = [
    { id: "task-1", text: "Learn react"},
    { id: "task-2", text: "Learn react-redux"},
    { id: "task-3", text: "Learn react-router"},
    { id: "task-4", text: "Learn react-transition-group"},
  ]

  const [todoList, setTodoList] = useState(TODOLIST)

  const duration = 500

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }
  
  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

  return (
    <div className="App">
        <h1>react-transition-group | animation demos</h1>
        <div className='TransitionContainer'>
          <div>
            <h2>Transition</h2>
            <p>Basic Transition component, that exposes 4 states, that are <br/><code>entering</code>, <code>entered</code>, <code>exiting</code>, <code>exited</code>, that you can use to define effects.</p>
            <button onClick={() => setInProp(!inProp)}>Animate me</button>
          </div>
          <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
          {state => (
            <div className='ImageContainerOne' ref={nodeRef} style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
            HIT 'EM
            </div>
          )}
          </Transition>
        </div>
        <div className='TransitionContainer'>
          <div>
            <h2>Transition</h2>
            <p>Basic Transition component, that exposes 4 states, that are <br/><code>entering</code>, <code>entered</code>, <code>exiting</code>, <code>exited</code>, that you can use to define effects.</p>
            <p>When <code>unmountOnExit</code> is <code>true</code>, the component unmounts from DOM</p>
            <button onClick={() => setInProp1(!inProp1)}>Animate me</button>
          </div>
          <Transition nodeRef={nodeRef} in={inProp1} timeout={duration} unmountOnExit>
          {state => (
            <div className='ImageContainerOne' ref={nodeRef} style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
            HIT 'EM
            </div>
          )}
          </Transition>
        </div>
        <div className='TransitionContainer'>
          <div>
            <h2>CSS Transition</h2>
            <p>It is build upon <code>Transition</code> component, so it inherits all its properties.</p>
            <p>It lets you define css classes to define your own css animations, <br/>it suffixes the className provided by you, to apply the className at the correct lifecycle.</p>
            <p>Provides you more phases than <code>Transition</code>, which only provides you 4 stages to animate.</p>
            <button onClick={() => setInProp2(!inProp2)}>Animate me</button>
          </div>
          <CSSTransition nodeRef={nodeRef1} in={inProp2} timeout={500} classNames="productCard" unmountOnExit>
            <div className='productCard' ref={nodeRef1}>
              <img src="https://images.unsplash.com/photo-1580567381231-95129c8aff42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1hcmtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt='unsplash'/>
              <div className='header'>
                <h2>Mark your ideas!</h2>
              </div>
            </div>
          </CSSTransition>
        </div>
        <div className='TransitionContainer'>
          <div>
            <h2>Switch Transition</h2>
            <p>It is basically used to create in-out animations.</p>
            <p><b>It waits for the previous element to leave, and then apply animation to the next element.</b></p>
            <p>It has 2 modes, <code>"out-in"</code><b>(default)</b>, and <code>"in-out"</code></p>
            <button onClick={() => setInProp3(!inProp3)}>Animate me</button>
          </div>
          <SwitchTransition mode="out-in" >
            <CSSTransition key={inProp3 ? "one" : "two"}
            // this function is important
              addEndListener={(node, done) => {node.addEventListener("transitionend", done, false);}}            
              classNames="productCard"
              >
              <div className='productCard'>
                <img src="https://images.unsplash.com/photo-1580567381231-95129c8aff42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1hcmtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt='unsplash' />
                <div className='header'>
                  <h2>Mark your ideas!</h2>
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className='TransitionContainer'>
          <div>
            <h2>Transition Group</h2>
            <p>It levels up the Switch Transition, you can simlutaneously animate elements,<br/>
            like animating todo lists.
            </p>
            <p>It acts like state machine which can manage the mounting and unmounting of components over time.</p>
            <button onClick={() => setTodoList(TODOLIST)}>Reset List</button>
          </div>
          <div>
            <TransitionGroup className='todoList'>
              {
                todoList.length !== 0 && todoList.map(({id, text}) => {
                  return <CSSTransition key={id} timeout={500} classNames='todoListItem'>
                    <div className='todoListItem'><button onClick={() => setTodoList(items => items.filter(item => item.id !== id))}>&times;</button><p id={id}>{text}</p></div>
                  </CSSTransition> 
                })
              }
            </TransitionGroup>
            {
                todoList.length === 0 && <p>Reset List!</p>
            }
          </div>
        </div>
    </div>
  );
}

export default App;