import React from "react";

const url = "https://staging.adserver.csdm.cloud/external";
const IFRAME_ID = "iframe-webcontainer";

class Ad extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      window.addEventListener("message", this.receiveMessage);
    }
  }
  componentWillUnMount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("message", this.receiveMessage);
    }
  }
  receiveMessage = (event) => {
    const {
      data: { eventType, iframeId },
    } = event;
    // Check if the message is for this particular iframe!
    if (iframeId !== IFRAME_ID) {
      return;
    }
    switch (eventType) {
      case "READY": {
        // Add is ready, start ad!
        const msg = {
          eventType: "START",
          iframeId: IFRAME_ID,
        };
        this.sendMessage(msg);
        break;
      }
      case "PLAYING": {
        // Ad is playing.
        break;
      }
      case "COMPLETE": {
        // Ad is finished. Proceed to next ad.
        window.external.Navigate(null);
        break;
      }
      default:
    }
  };

  onLoad = () => {
    const configuration = {
      eventType: "CONFIGURATION_UPDATE",
      iframeId: IFRAME_ID,
      payload: {
        playerId: "36416", // PlayerId
        duration: 10000, // duration in milliseconds
        resolution: {
          width: 1080,
          height: 1920,
        },
        location: {
          name: "My first location",
          lat: 52.340264,
          lng: 4.842859,
        },
      },
    };
    this.sendMessage(configuration);
    console.log(configuration);
  };

  sendMessage = (msg) => {
    const iframeWin = document.getElementById(IFRAME_ID).contentWindow;
    if (iframeWin) {
      iframeWin.postMessage(msg, "*");
    }
  };
  render() {
    return (
      <iframe
        id={IFRAME_ID}
        title="Webcontainer"
        scrolling="no"
        src={url}
        style={{
          height: "100%",
          width: "100%",
          border: "none",
          position: "absolute",
        }}
        onLoad={this.onLoad}
      />
    );
  }
}
export default Ad;
