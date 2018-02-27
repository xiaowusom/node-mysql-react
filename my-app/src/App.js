import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor({history}){
    super()
    this.history = history;
    this.state = {
      arr:[],
      newArr:[],
      title:'',
      path:'',
    } 
  }
  componentDidMount () {
      $.get('http://localhost:3005',function(data){
        console.log(data);
        let gotServices = data;
                    //好了，我们获得了service列表，使用setState方法覆盖当前元素的services数据
                    this.setState({
                        arr : gotServices

                    })


      }.bind(this))
    }

  render() {
    var list = this.state.arr.map((title,index)=>{
       
      return <li key={index}  onClick={this.active.bind(this,index)} >
      <div className="delete" onClick={this.delete.bind(this,index)}>X</div> 
      
      {title.name}</li>
      

      

    });

    console.log(this.state.arr);
    return (
      <div className="App">
        <ul className="left">
          {list}
        </ul>
        <div className="right" >
        <img id="right_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519568252869&di=6ab095b0417051afe3775f6d06ad6fdb&imgtype=0&src=http%3A%2F%2Fent.southcn.com%2F8%2Fimages%2Fattachement%2Fjpg%2Fsite4%2F20150818%2F44%2F1410609336783168328.jpg"  alt="" />
        </div> 
        <div className="addText">
        <input type="text" placeholder="请输入id"  id="id"ref='title' className="linkText"   />
          <input type="text" placeholder="请输入标题" ref='title' className="linkText" id="title"   />
            <input type="text" placeholder="请输入链接" ref='text' className="linkText" id="link"     />
            <button className="btn" onClick={this.sendData.bind(this)}>点击添加</button>
        </div>
            
        
      </div>
    );
  }
  active(index){
    $("#right_img").attr("src",this.state.arr[index].imgUrl);  
  }
  delete(index){
    var id = this.state.arr[index].id.toString();
    $.post('http://localhost:3005/del',{"id":id},function(data){ 
       

      }.bind(this))

  }
  getTitle(){
    var title = this.refs.title.value;
    this.setState({title:title},()=>{
  })
  }
  getText(){
    var path = this.refs.text.value;
    this.setState({path:path})

  }
  sendData(){
    var userId=$("#id").val();
    var title=$("#title").val();
    var link=$("#link").val();
    console.log(userId+title+link);
    $.post('http://localhost:3005/add',{"id":userId,"name":title,"imgUrl":link},function(data){ 
       return;

      }.bind(this))
     
  }
}

export default App;
