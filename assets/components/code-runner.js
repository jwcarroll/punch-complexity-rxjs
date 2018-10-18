import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent
} from "rxjs";

import {
  map,
  filter,
  tap,
  skip,
  take,
  scan,
  switchMap,
  mergeMap,
  retryWhen,
  delay,
  groupBy
} from "rxjs/operators";

import * as _ from "lodash";
import shortid from "shortid";

import starWarsService from "../services/starWarsService";

const React = require("react");
const ReactDOM = require("react-dom");

class ConsoleCapture {
  constructor(onLog) {
    this.streams = {
      default: []
    };
    this.onLog = onLog;
  }

  stringify(...args) {
    return args.map((v, i) => {
      return { id: shortid.generate(), val: JSON.stringify(v) };
    });
  }

  stream(streamName) {
    return {
      log: this.logToStream.bind(this, streamName)
    };
  }

  raw(...args) {
    console.log(...args);
  }

  log(...args) {
    this.logToStream("default", ...args);
  }

  logToStream(streamName, ...args) {
    const newStreams = { ...this.streams };
    const stream = newStreams[streamName] || [];
    newStreams[streamName] = [...stream, ...this.stringify(...args)];
    this.streams = newStreams;
    this.onLog(this.streams);
  }

  destroy() {
    this.streams = { default: [] };
    this.onLog = () => {};
  }
}

function evalCode(
  code,
  console,
  _,
  starWarsService,
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent,
  map,
  filter,
  tap,
  skip,
  take,
  scan,
  switchMap,
  mergeMap,
  retryWhen,
  delay,
  groupBy
) {
  const cleanCode = cleanImports(code);

  const log = (streamName = "default") => source =>
    source.pipe(tap(val => console.stream(streamName).log(val)));

  //soooo eval!!! much dangerous!!!
  eval(`
  (function(){
    'use strict';    
    ${cleanCode}
  }());
  `);
}

function cleanImports(code) {
  return code.replace(/import[\s\S]*?;/g, "// $1");
}

const containerStyle = {
  paddingLeft: "15px",
  borderLeft: "2px solid #16222F",
  display: "flex",
  justifyContent: "center",
  paddingTop: "45px"
};

const itemStyle = {
  flexGrow: 1,
  flexBasis: 0,
  maxHeight: "600px",
  overflowX: "hidden",
  overflowY: "auto",
  fontSize: "1.3em"
};

const itemHeaderStyle = {
  maxWidth: "330px",
  marginBottom: "10px",
  display: "block",
  color: "#999",
  position: "absolute",
  top: "15px",
  backgroundColor: "black",
  zIndex: "1000",
  fontSize: "0.75em",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
};

export default class CodeRunner extends React.Component {
  constructor() {
    super();
    this.scrollTargetId = shortid.generate();
    this.state = {
      streams: {}
    };
    this.consoleLogger = new ConsoleCapture(streams => {
      this.setState({ streams });
    });
  }

  scrollToBottom = () => {
    const streams = this.state.streams;
    const streamNames = Object.keys(streams);

    _.forEach(streamNames, n => {
      const node = ReactDOM.findDOMNode(this[`${n}_${this.scrollTargetId}`]);
      if (node) {
        node.scrollIntoView();
      }
    });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    const { code } = this.props;
    evalCode(
      code,
      this.consoleLogger,
      _,
      starWarsService,
      Observable,
      Subject,
      asapScheduler,
      pipe,
      of,
      from,
      interval,
      merge,
      fromEvent,
      map,
      filter,
      tap,
      skip,
      take,
      scan,
      switchMap,
      mergeMap,
      retryWhen,
      delay,
      groupBy
    );
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.consoleLogger.destroy();
  }

  render() {
    const streams = this.state.streams;

    const streamNames = Object.keys(streams);

    return (
      <div style={containerStyle}>
        {streamNames.map(name => (
          <div style={itemStyle} className="nice-scrollbar" key={name}>
            <div style={itemHeaderStyle}>// {name}:</div>
            {streams[name].map((log, i) => (
              <div className="animated flipInX" key={log.id}>
                {log.val}
              </div>
            ))}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this[`${name}_${this.scrollTargetId}`] = el;
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
