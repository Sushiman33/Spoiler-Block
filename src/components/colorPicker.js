import React, { useState, useEffect } from "react";
import styles from "./styles/colorPicker.module.css";

/*global chrome*/

// This function displays the different colors that
// can be set as the default color of the app. It takes
// a prop 'colors' which is a list of string values that
// are the hex values of the available colors. By clicking
// on each color, the state is updated so that this value
// can be integrated with the rest of the project...
// Use case: <ColorPicker colors = {['#FF4747', '#474FFF', '#12A43B', '#E78225', '#A262E2']}/>
export default function ColorPicker(props) {
  // Initialize the color to be null
  const [color, setColor] = useState(null);
  useEffect(() => {
    // Grab the color from the local state:
    chrome.storage.sync.get(`sb-censor-color`, (res) => {
        if (Object.prototype.hasOwnProperty.call(res, "sb-censor-color") && color == null) {
            // set the color state
            setColor(res["sb-censor-color"]);
            // pass this color back up to App.js:
            props.update(res["sb-censor-color"]);
        }
    });
  }, [color,props]);

  // When the user clicks a new color, set the state
  // to match the new color and update App.js
  const onChange = (newColor) => {
    setColor(newColor);
    props.update(newColor);
  };

  return (
    <div className={styles.body}>
      <p className={styles.label}>Color:</p>
      {/* map each color to a circle element */}
      {props.colors.map((color_) =>
        // if this is the current color, make it
        // stand out with a border:
        color_ === color ? (
          <div
            onClick={() => onChange(color_)}
            className={styles.color}
            style={{ background: color_, border: 'solid', borderWidth: '2px' }}
          ></div>
        ) : (
          // Otherwise, display the color as normal:
          <div
            onClick={() => onChange(color_)}
            className={styles.color}
            style={{ background: color_ }}
          ></div>
        )
      )}
    </div>
  );
}
