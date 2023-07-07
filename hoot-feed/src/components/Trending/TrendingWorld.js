// File: /src/components/Trending/TrendingWorld.js
import React from 'react';
import Trendlist from './Trendlist.txt';
import './TrendingWorld.css'; 

class TrendingWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: [],
    };
  }

  componentDidMount() {
    fetch(Trendlist)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const filteredLines = lines.filter(line => line.trim() !== '' && !line.startsWith('#'));
        const shuffledLines = this.shuffleArray(filteredLines);
        const selectedLines = shuffledLines.slice(0, 10);
        this.setState({ trends: selectedLines });
      })
      .catch(error => console.log(error));
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { trends } = this.state;

    return (
      <div>
        {/*<h1>World Trending</h1>*/}
        <ol className="numbered-list">
          {trends.map((trend, index) => (
            <li key={index}>{trend}</li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TrendingWorld;
