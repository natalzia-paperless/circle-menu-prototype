var ReactComponents = ReactComponents || {};

ReactComponents.GuestList = React.createClass({
  getInitialState:function() {
    return {
      text: Math.random().toString(36).substring(10)
    }
  },
  render: function() {
    return (<h1 className='text-el'>{this.state.text}</h1>);
  }
});