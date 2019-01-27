import React, { Component } from "react";
import _ from "lodash";
import classes from "./Navigation.module.scss";
import vert from "../../json/verticals.json";
import cate from "../../json/categories.json";
import cour from "../../json/courses.json";

class Navigation extends Component {
  state = {
    active: [false, false, false],
    value: null,
    cat: null,
    json: { verticals: [], categories: [], courses: [] },
    check: [false,false,false,false,false,false,false,false,false,false,false], //to optimalization
    purchased: []
  };

  componentDidMount() {
    this.setState({
      json: { verticals: vert, categories: cate, courses: cour }
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeCat = id => {
    this.setState({ cat: id });
  };
  toggleMenu = id => {
    const list = this.state.active.map((item, key) => {
      if (key === id) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({ active: list, value: id });
  };

  handleCourse = id => {
    const list = this.state.check.map((item, key) => {
      key === id ? !item : item;
    });
    this.setState({
      check: list,
      purchased: [...this.state.purchased, this.state.json.courses[id - 1]]
    });
  };

  //1.At start I tried to use Material UI for this task, but there is documentation not updated in lots of points, so I resigned and built it from
  //scratch
  //I think the main idea of it its the effect of sunset,the second assumption was the optimalization of code. There is some area where I could
  //make it more optimal like state.check
  //2.The next step would be connect it with the rest of project, so with body of app, becose for now I created it as a whole thing.
  //3.RWD added, its more beautifull on mobile, as always ;)

  render() {
    const categories = this.state.json.categories.filter(
      obj => obj.Verticals == this.state.value + 1);
    const courses = this.state.json.courses.filter(
      obj => obj.Categories == this.state.cat);
    return (
      <div className={classes.mainContainer}>
        <nav>
          <ul>
            {_.map(this.state.json.verticals, vertical => (
              <li
                onClick={() => this.toggleMenu(vertical.Id - 1)}
                className={
                  this.state.active[vertical.Id - 1]
                    ? `${classes.addClass} ${classes.vertical}`
                    : `${classes.vertical}`
                }
              >
                <h1>{vertical.Name}</h1>
              </li>
            ))}
          </ul>
        </nav>

        <div className={classes.container}>
          {this.state.active[this.state.value]
            ? categories.map(category => (
                <h2
                  className={classes.categories}
                  key={category.Id}
                  onClick={() => this.handleChangeCat(category.Id)}
                >
                  {category.Name}
                </h2>
              ))
            : null}
        </div>
        <div className={classes.container}>
          {courses.map(course => (
            <div
              className={classes.course}
              onClick={() => this.handleCourse(course.Id)}
            >
              <div className={classes.body}>
                <h3 className={classes.name}>{course.Name}</h3>
                <div className={classes.body}>
                  <h4 className={classes.author}>{course.Author}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {_.map(this.state.purchased, purchase => <h6>{purchase.Name}</h6>)}
        </div>
      </div>
    );
  }
}

export default Navigation;
