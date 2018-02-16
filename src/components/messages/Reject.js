import React from "react";
import { Message } from "semantic-ui-react";
import axios from "axios";

const BASEURL = "http://acciapi.ml/";

class Reject extends React.Component {
  componentDidMount() {
    this.sendDit();
  }

  sendDit() {
    const refid = this.props.match.params.refereeId;
    const userid = this.props.match.params.id;
    axios.delete(`${BASEURL}api/v1/referrer/${userid}/${refid}`, {
      refereeId: refid,
      id: userid
    });
  }
  render() {
    return (
      <React.Fragment>
        <Message error icon="delete" header="Rejection successful" />
      </React.Fragment>
    );
  }
}

export default Reject;
