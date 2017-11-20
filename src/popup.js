import React from 'react';
import ReactDOM from 'react-dom';
import CallRPC from 'callrpc.js';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: null};
  }

  componentDidMount() {
    // Get the active tab and store it in component state.
    browser.tabs.query({active: true}).then(tabs => {
      this.setState({activeTab: tabs[0]});
    });
  }

  render() {
    const {activeTab} = this.state;
    var torrent_status = getTorrents();
    var getTorrentStatus = function () {
        torrent_status
            .then(function (fulfilled) {
                console.log(fulfilled);
                return (
                  <div>
                    <h1>Transmission status</h1>
                    <p>
                      fulfilled
                    </p>
                    <Nested />
                  </div>
                );
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    getTorrentStatus();

  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
