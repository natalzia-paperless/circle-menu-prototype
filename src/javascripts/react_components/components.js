var ReactComponents = ReactComponents || {};

ReactComponents.GuestList = React.createClass({
  getInitialState:function() {
    var textArr = [];
    var urls = [];
    for (var i = 0; i < 1000; i++) {
      var imgW = Math.floor(Math.random() * 100) + 300;
      var imgH = Math.floor(Math.random() * 100) + 100;

      var url = "http://insolitebuzz.fr/wp-content/uploads/2014/10/test-all-the-things.jpg";
      textArr.push(Math.random().toString(36).substring(10));
      urls.push(url);
    }

    return {
      text: textArr,
      url: urls
    }
  },
  changeOpacity: function(e) {

  },
  getAllComponents: function() {
    var arr = [];
    for (var i = 0; i < 100; i++) {
      var txt = this.state.text[i];
      arr.push(
        <div>
          <span>{txt}</span>
          <h1>{txt}</h1>
          <img data-id={i} onClick={this.changeOpacity} alt="" src={this.state.url[i]} />
        </div>
      );
    }
    return arr;
  },
  render: function() {
    return (
      <div>
        {this.getAllComponents()}
      </div>
    );
  }
});