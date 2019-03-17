import React from "react";

class Rating extends React.Component {
  mainClassName = `rate-${this.props.number}`;
  totalMainClassName = `rate-${this.props.number} rate`;
  componentDidMount() {
    Array.from(
      document.querySelectorAll(`.${this.mainClassName} label`)
    ).forEach(e => {
      Number(e.htmlFor) / 2 <= Number(this.props.rate)
        ? (e.style.color = "#73B100")
        : (e.style.color = "#D6D6D6");
    });
  }

  render() {
    return (
      <fieldset className={this.totalMainClassName}>
        <label htmlFor="10" title="5 stars" />
        <label className="half" htmlFor="9" title="4 1/2 stars" />
        <label htmlFor="8" title="4 stars" />
        <label className="half" htmlFor="7" title="3 1/2 stars" />
        <label htmlFor="6" title="3 stars" />
        <label className="half" htmlFor="5" title="2 1/2 stars" />
        <label htmlFor="4" title="2 stars" />
        <label className="half" htmlFor="3" title="1 1/2 stars" />
        <label htmlFor="2" title="1 star" />
        <label className="half" htmlFor="1" title="1/2 star" />
      </fieldset>
    );
  }
}

export default Rating;
