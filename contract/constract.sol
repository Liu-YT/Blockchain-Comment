// 0.4.23-
pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;


contract Object {
    
    // 合约标识名字
    string name;

    // 主题
    string theme;
    
    // 创建者
    string owner;

    // 创建时间
    string time;

    // 记录用户评论次数
    mapping(string=>uint256) peopleWeight;
    
    // 所有评论
    Comment[] comments;

    // 每条评论
    struct Comment {
        string name;
        string comment;
        string ctime;
        string score;   
    }
    
    // 信息
    struct info {
        string name;
        string owner;
        string ctime;
        string theme;
        uint256 num;
    }
    
    // 构造函数，初始化
    constructor (string _name, string _theme, string _owner, string _time) public {
        name = _name;
        theme = _theme;
        owner = _owner;
        time = _time;
    }
     
    // 增加评论
    function setComment(string commentUser, string comment, string score, string ctime) public {
        require(
            peopleWeight[commentUser] != 3,
            "Everyone can only comment three times"
        );
        peopleWeight[commentUser] += 1;
        comments.push(Comment(commentUser, comment, ctime, score));
    }
    
    // 获得当前评论区的信息
    function getObjectInfo() public view returns (info _info) {
        return info(name, owner, time, theme, comments.length);
    }
    
    // 获得当前评论区所有评论
    function getAllComments() public view returns (Comment[] _comments) {
        return comments;
    }
}


contract Factory {
    // 所有合约地址
    address[] deployedContracts;
    
    // 新建一个评论区
    function createObject (string name, string theme, string owner, string time) public returns (address _objectAddress){
        address objectAddress = new Object(name, theme, owner, time);
        deployedContracts.push(objectAddress);
        return objectAddress;
    }
    
    // 获得所有评论区
    function getAllContracts() public view returns (address[]) {
        return deployedContracts;
    }
}