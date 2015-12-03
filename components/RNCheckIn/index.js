/**
 * Created by guguyanhua on 11/4/15.
 */
var React = require('react-native');
var _ = require('lodash');
var moment = require('moment');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableHighlight,
    } = React;

/**
 *
 * 传入的数据结构 checkIn
 * {
 *  2015-11:[
 *    2015-11-01,
 *    2015-11-02,
 *    2015-11-03,
 *    2015-11-09,
 *  ]
 * }
 *
 *
 *
 *
 */

class MonthHeader extends React.Component {
  render(){
    return (
        <View style={[styles.row, styles.row_header]}>
          <View style={[styles.flex_1]}>
            <Text style={styles.headerStyle}>一</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={styles.headerStyle}>二</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={styles.headerStyle}>三</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={styles.headerStyle}>四</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={styles.headerStyle}>五</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={[styles.headerStyle]}>六</Text>
          </View>
          <View style={[styles.flex_1]}>
            <Text style={[styles.headerStyle]}>日</Text>
          </View>
        </View>
    );
  }
}

var Month = React.createClass({
  render(){
    var checkIn = this.props.checkIn;
    var key = '2015-10';
    var value = ['2015-10-1', '2015-10-5', '2015-10-6', '2015-10-9', '2015-10-10'];
    var m = moment(key, "YYYY-MM");
    var year = m.year();
    var month = m.month();

    var newDate = new Date(year, month + 1, 0); //本月最后一天 === 下一个月的第0天
    var week = new Date(year, month, 1).getDay(); //月份开始的星期

    if (week === 0) {
      week = 7;
    }
    var counts = newDate.getDate(); //本月的最后一天就是本月的总天数
    var rowCounts = Math.ceil((counts + week - 1) / 7); //本月行数

    var rows = [];

    for (var i = 0; i < rowCounts; i++) {
      var days = [];
      for (var j = (i * 7); j < ((i + 1) * 7); j++) {
        //根据每个月开始的［星期］往后推
        var dayNum = j - week + 1;
        if (dayNum > 0 && j < counts + week) {
          //如果当前日期小于今天，则变灰
          var dateStr = year + '-' + (month + 1) + '-' + dayNum;
          var dayStyle = {};
          var bk = {};
          if (_.includes(value, dateStr)) {
            bk = {  //TODO 这里要显示下面的白点
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12.5,
            };
            dayStyle = {
              color: 'white',
              fontWeight: 'bold',
            }
          } else {
            dayStyle = {
              color: 'rgba(255,255,255,0.5)'
            }
          }
          days.push(
              <View style={[styles.flex_1,styles.border_1]} underlayColor="#fff">
                <View style={bk}>
                  <Text style={dayStyle}>{dayNum}</Text>
                </View>
              </View>
          );
        } else {
          days.push(
              <View style={[styles.flex_1,styles.border_1]}>
                <Text></Text>
              </View>
          );
        }

      }
      rows.push(
          <View style={[styles.row]}>{days}</View>
      );
    }

    var monthView = null;
    if (value && value.length > 0) {
      monthView =
          <View>
            <View style={styles.month}>
              <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月 ({value.length}次)</Text>
            </View>
            <MonthHeader />
            {rows}
          </View>
    } else {
      monthView =
          <View>
            <View style={styles.month}>
              <Text style={styles.month_text}>{newDate.getFullYear()}年{newDate.getMonth() + 1}月</Text>
            </View>
            <MonthHeader />
            {rows}
          </View>
    }

    return monthView;

  }
});

var CheckIn = React.createClass({
  getInitialState: function () {
    return {
      currentMonth: {
        '2015-11': [
          '2015-11-01',
          '2015-11-02',
          '2015-11-03',
          '2015-11-09',
        ],
      },
      month: {
        '2015-11': [
          '2015-11-01',
          '2015-11-02',
          '2015-11-03',
          '2015-11-09',
        ],
        '2015-10': [
          '2015-10-01',
          '2015-10-02',
          '2015-10-03',
          '2015-10-09',
        ],
      }
    };
  },
  render() {
    return (
        <View>
          <Month
              checkIn={this.state.currentMonth}
              {...this.props}
              />
        </View>
    );
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  flex_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar_container: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#ccc'
  },
  row_header: {
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  row: {
    flexDirection: 'row',
    height: 40,
  },
  month: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  month_text: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white'
  },
  border_1: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#2a2a2a',
  },
  headerStyle: {
    color: 'white',
  }
});

module.exports = CheckIn;
