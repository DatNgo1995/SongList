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
    dataTitleFilter: data,
    dataLevelFilter: data,
    noResult: false,
    toggle: false,
    wordFilter: "",
    levelFilter: [0, 15]
  };
  /* function to check if scroll to the end, then duplicate data*/
  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      this.assignStar();
      let newData = this.state.data;
      newData.push(data[count]);
      this.setState({ data: newData });
      count++;
      if (count === data.length) count = 0;
    }
  };
  componentDidMount() {
    this.assignStar();
    window.addEventListener("scroll", this.handleScroll);
  }
  /*change color of stars*/
  assignStar = () =>
    Array.from(document.querySelectorAll(".rate label")).forEach(e => {
      e.onclick = this.starOnClick;
    });
  starOnClick = e => {
    Array.from(e.target.parentNode.children).forEach(f => {
      Number(f.htmlFor) <= Number(e.target.htmlFor)
        ? (f.style.color = "#73B100")
        : (f.style.color = "#D6D6D6");
    });
  };
  /*filter by song name*/
  songSearch = e => {
    this.setState({ wordFilter: e.target.value }, () => this.filterCallback());
  };
  /*filter by level*/
  levelFilter = number => {
    this.setState({ levelFilter: number }, () => this.filterCallback());
  };
  filterCallback = () => {
    let newData = data.filter(
      f =>
        f.title.toLowerCase().includes(this.state.wordFilter.toLowerCase()) &&
        Number(f.level) >= this.state.levelFilter[0] &&
        Number(f.level) <= this.state.levelFilter[1]
    );
    this.setState({ data: newData });
    if (newData.length < 1) this.setState({ noResult: true });
    else this.setState({ noResult: false });
  };
  /*toggle the level filter bar*/
  anchor = () => {
    this.setState(prevState => ({ toggle: !prevState.toggle }));
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
          <div className="level-wrapper">
            <div
              className={`level-range ${this.state.toggle ? "toggle" : null}`}
            >
              <Range
                min={0}
                max={15}
                defaultValue={[0, 15]}
                allowCross={false}
                marks={{ 0: 0, 15: 15 }}
                onChange={this.levelFilter}
              />
            </div>
            <div className="anchor" onClick={this.anchor}>
              <i className="fas fa-arrow-left" />
            </div>
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
        {this.state.noResult ? (
          <span className="no-result">No results found</span>
        ) : null}
      </div>
    );
  }
}

export default App;
