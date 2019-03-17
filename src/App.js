import React, { Component } from "react";
import { SongContent } from "./components/SongContent";
import Slider from "rc-slider";
import "./App.css";
import data from "./songs.json";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
let count = 0;
class App extends Component {
  state = {
    data: data,
    hasMore: true,
    initialLoad: true
  };
  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      let newData = this.state.data;
      newData.push(data[count]);
      this.setState({ data: newData });
      count++;
      if (count === data.length) count = 0;
    }
  };
  componentDidMount() {
    Array.from(document.querySelectorAll(".rate label")).forEach(e => {
      e.onclick = this.onClick;
    });
    window.addEventListener("scroll", this.handleScroll);
  }
  onClick = e => {
    Array.from(e.target.parentNode.children).forEach(f => {
      Number(f.htmlFor) <= Number(e.target.htmlFor)
        ? (f.style.color = "#73B100")
        : (f.style.color = "#D6D6D6");
    });
  };
  songSearch = e => {
    let newData = data.filter(f => {
      return f.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    this.setState({ data: newData });
  };
  levelFilter = number => {
    let newData = data.filter(
      f => Number(f.level) >= number[0] && Number(f.level) <= number[1]
    );
    this.setState({ data: newData });
  };

  render() {
    return (
      <div className="App">
        <div className="search-area">
          <div className="song-search">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onKeyUp={this.songSearch}
            />
            <i className="fas fa-search search-icon" />
          </div>
          <div className="level-range">
            <Range
              min={0}
              max={15}
              defaultValue={[0, 15]}
              allowCross={false}
              marks={{ 0: 0, 15: 15 }}
              onChange={this.levelFilter}
            />
          </div>
        </div>
        <div className="lists">
          {this.state.data.map((e, i) => (
            <SongContent
              key={i}
              number={i}
              title={e.title}
              artist={e.artist}
              rating={e.rating}
              level={e.level}
              released={e.released}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
