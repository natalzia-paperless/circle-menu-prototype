var ReactComponents = ReactComponents || {};

ReactComponents.GuestList = React.createClass({
  getInitialState:function() {
    return {
      text: "WHOA"
    }
  },
  render: function() {
    return (<h1 className='text-el'>{this.state.text}!</h1>);
  }
});

/*React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);*/