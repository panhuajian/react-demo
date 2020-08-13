import React, { useEffect, useState } from 'react';
import Index from '@/page/index';
import G2Charts from '@/page/g2';
// import logo from './logo.svg';
import styles from './App.module.scss';

function App() {

  const [scaleValue, setScaleValue] = useState(1);

  useEffect(() => {
    window.addEventListener('resize', setScale);
    setScale();
  }, [])
  let timer: any = 0;

  const getScale = () => {
    let ww = window.innerWidth / 1920;
    let wh = window.innerHeight / 1080
    return ww < wh ? ww : wh;
  }
  
  const setScale = () => {
    timer = setTimeout(() => {
      clearTimeout(timer);
      let scale =getScale();
      setScaleValue(scale);
    }, 500)
  }

  return (
    <div
      className={styles.scaleBox}
      style={{
        transform: `scale(${scaleValue})`,
      }}  
    >
      <Index/>
      {/* <G2Charts/> */}
      <a>1212</a>
    </div>
  );
}

export default App;
