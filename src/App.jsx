import React, { useState, useRef } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Fullscreen from 'react-full-screen';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  background: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },

  blush: {
    overflow: 'visible',
  },

  blushend: {
    stopColor: 'rgb(255,255,255)',
    stopOpacity: 0,
  },

  blushstart: {
    stopColor: 'rgb(222,93,131)',
    stopOpacity: 1,
  },

  face: {
    display: 'flex',
    height: '25%',
    justifyContent: 'center',
  },

  eye: {
    overflow: 'visible',
  },

  eyeBox: {
    height: 300,
    width: 0,
  },

  mouth: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 1rem 0 1rem',
    width: '10rem',
  },

  shock: {
    background: '#333',
    clipPath: 'circle(50px at 50% 100%)',
    height: '3rem',
    marginTop: '1rem',
    transition: 'all 0.3s ease-in-out',
    width: '5rem',
  },

  sad: {
    borderColor: '#333 transparent transparent transparent',
    borderStyle: 'solid',
    borderWidth: '15px',
    borderRadius: '100%',
    height: '3rem',
    marginTop: '2rem',
    transition: 'border-width 0.3s ease-in-out',
    width: '5rem',
  },

  flat: {
    borderBottom: 'solid 15px #333',
    marginBottom: '1rem',
    transition: 'all 0.3s ease-in-out',
    width: '3.5rem',
  },

  smile: {
    borderColor: 'transparent transparent #333 transparent',
    borderStyle: 'solid',
    borderWidth: '15px',
    borderRadius: '100%',
    height: '3rem',
    marginTop: '-0.5rem',
    transition: 'border-width 0.3s ease-in-out',
    width: '10rem',
  },

  happy: {
    background: '#333',
    clipPath: 'circle(50px at 50% 0)',
    height: '3rem',
    marginTop: '2rem',
    transition: 'all 0.3s ease-in-out',
    width: '5rem',
  },
}));

const App = () => {
  const classes = useStyles();
  const [useHeart, setUseHeart] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const faceRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  const handleMouseMove = (event) => {
    const rect = faceRef.current.getBoundingClientRect();
    // setX(event.clientX - rect.left);
    // setY(event.clientY - rect.top);
  };

  const heart = (x, y) => (
    <svg className="heart" viewBox="0 0 32 29.6">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
        transform={`translate(${x}, ${y})`}
      />
    </svg>
  );

  const renderEye = (cx, cy, bx, by) => {
    let ecx = cx;
    if (x < -200) {
      ecx = cx - 20;
    } else if (x >= -200 && x <= 200) {
      ecx = cx + x / 10;
    } else if (x > 200) {
      ecx = cx + 20;
    }

    return (
      <>
        <svg className={classes.eye}>
          <circle cx={ecx} cy={Math.min(cy + y / 10, 20)} r={25} fill="#333" />
        </svg>
        {blush(bx, by)}
      </>
    );
  };

  const blush = (cx, cy) => {
    return (
      <svg height="150" width="500" className={classes.blush}>
        <defs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" className={classes.blushstart} />
            <stop offset="100%" className={classes.blushend} />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx="85" ry="55" fill="url(#grad1)" />
      </svg>
    );
  };

  const face = (
    <div className={classes.face} ref={faceRef}>
      <div className={classes.eyeBox}>
        {useHeart ? heart(-17, -40) : renderEye(0, -30, -50, -110)}
      </div>
      <div className={classes.mouth}>
        <div className={classes.smile} />
      </div>
      <div className={classes.eyeBox}>
        {useHeart ? heart(-17, -40) : renderEye(0, -30, 50, -110)}
      </div>
    </div>
  );

  return (
    <Fullscreen enabled={false}>
      <div
        className={classes.background}
        onClick={() => {
          setFullscreen(!fullscreen);
          setUseHeart(!useHeart);
        }}
        onMouseMove={handleMouseMove}
      >
        {face}
      </div>
    </Fullscreen>
  );
};

App.propTypes = {
  transcript: PropTypes.string.isRequired,
  interimTranscript: PropTypes.string.isRequired,
  resetTranscript: PropTypes.func.isRequired,
};

export default App;
