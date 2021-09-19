import React from 'react';
import { Route } from 'react-router-dom';


import { Header } from './components';
import { Home, Cart } from './pages';

function App() {

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <Route exact path='/' component={Home} />
        <Route exact path='/cart' component={Cart} />
      </div>
    </div>
  );
}
export default App

// class App extends React.Component {
//   componentDidMount() {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => {
//       this.props.setPizzas(data.pizzas)
//     })
//   }

//   render() {
//     console.log(this.props.items)
//     return (
//       <div className="wrapper">
//         <Header />

//         <div className="content">
//           <Route exact path='/' render={() => <Home items={this.props.items} />} />
//           <Route exact path='/cart' component={Cart} />
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     items: state.pizzas.items
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   setPizzas: (items) => dispatch(setPizzas(items)),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App);
