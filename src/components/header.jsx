var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var Reflux = require('reflux');

module.exports = React.createClass({
  render: function() {
    return (<nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          ChatBot Creator
        </Link>
        <ul className="nav navbar-nav navbar-right">
        </ul>
      </div>
    </nav>);
  }
});
