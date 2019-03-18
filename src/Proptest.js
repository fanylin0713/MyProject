import React, { Component } from 'react';
import Button from './components/Button/Button';
class Proptest extends Component {
  render() {
    //時間
    function formatDate(date){
      return date.toLocaleDateString();
    }

    // 頭像
    function Avatar(props){
      return(
        <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
      )
    }

    //使用者資訊（包含頭像）
    function UserInfo(props){
      return(
        <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">{props.user.name}</div>
        </div>
      )
    }

    //整個欄位
    function Comment(props){
      return(
        <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
        <Button />
        </div>
      )
    }

    //定義
    const comment={
      date: new Date(),//獲得系統目前時間
      text: "你好，祝你有個美好的一天",
      author:{
        name: "Fany",
        avatarUrl: "https://placekitten.com/g/64/64",
      },
    };
    return (
      <Comment date={comment.date} text={comment.text} author={comment.author} />
      );
    }
}
export default Proptest;
