import React from 'react';

// Video component
function Video({ src, title }) {
  return (
    <div>
      <h1>{title}</h1>
      <iframe
        width="560"
        height="315"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

// App component
function App() {
  return (
    <div>
      <Video
        title="What is Depression?"
        src="https://www.youtube.com/embed/fWFuQR_Wt4M?si=080gkK9--bjN4teg"
      />
      <Video
        title="Behavioral Changes During Depression"
        src="https://www.youtube.com/embed/Fm73eVoi4dw?si=UtTshx-CYtHsOnOU"
      />
      <Video
        title="Physical Changes During Depression"
        src="https://www.youtube.com/embed/-MNp9bmNI60?si=3yyFQQB1Jc8t_JAT"
      />
      <Video
        title="Decode Depression"
        src="https://www.youtube.com/embed/askj2aU5big?si=SxA0dXpAcBvkfbLr"
      />
      <Video
        title="What is Anxiety?"
        src="https://www.youtube.com/embed/BVJkf8IuRjE?si=LKzCZ96oBaaSWqNx"
      />
      <Video
        title="Battling and Overcoming Anxiety"
        src="https://www.youtube.com/embed/w_2STJAJhJM?si=7tRyp1sYtkSQtomY"
      />
      <Video
        title="what is stress"
        src="https://www.youtube.com/embed/XTgbQl73dos?si=gT5unHkm8M52Hnf6"
      />
      <Video
        title="how stress effects body and mind"
        src="https://www.youtube.com/embed/CZTc8_FwHGM?si=rZhMcb66mtm4bFhZ"
      />
      <Video
        title="how to manage stress "
        src="https://www.youtube.com/embed/rukcQcZ1NYE?si=egN73HZsFJ5R_My5"
      />
    </div>
  );
}

export default App;