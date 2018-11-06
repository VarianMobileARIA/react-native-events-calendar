// @flow
import {
  VirtualizedList,
  View,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

import _ from "lodash";
import moment from "moment";
import React from "react";

import styleConstructor from "./style";

import DayView from "./DayView";

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.styles = styleConstructor(props.styles);
    this.state = {
      date: moment(this.props.initDate),
      index: this.props.size
    };
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: "DD MMMM YYYY"
  };

  _getItemLayout(data, index) {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  }

  _getItem(events, index) {
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      "days"
    );
    return _.filter(events, event => {
      const eventStartTime = moment(event.start);
      return (
        eventStartTime >= date.clone().startOf("day") &&
        eventStartTime <= date.clone().endOf("day")
      );
    });
  }

  render() {
    const {
      width,
      virtualizedListProps,
      events,
      format24h,
      initDate,
      scrollToFirst
    } = this.props;
    return (
      <View style={[this.styles.container, { width }]}>
        <DayView
          date={moment(initDate)}
          index={0}
          format24h={format24h}
          formatHeader={this.props.formatHeader}
          headerStyle={this.props.headerStyle}
          renderEvent={this.props.renderEvent}
          eventTapped={this.props.eventTapped}
          longTapped={this.props.longTapped}
          events={events}
          width={width}
          styles={this.styles}
          scrollToFirst={scrollToFirst}
        />
      </View>
    );
  }
}
