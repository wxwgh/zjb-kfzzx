<template>
  <el-container class="container">
    <el-header>
      <h1>地图列表</h1>
    </el-header>
    <el-main>
      <el-table @row-click="open" border :data="tableData" height="100%" style="width: 100%" row-key="id" :tree-props="{children: 'children'}">
        <el-table-column prop="name" label="服务名称" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="description" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
let $this;
let message;
export default {
  name: 'MapServer',
  methods:{
    open(row, column, cell, event){
      if(!row.children){
        let html = '<div class="popup">';
            html +='<div><span>服务名称:</span><span>'+row.parentName+'</span></div>';
            html +='<div><span>地图列表:</span><span>'+row.name+'</span></div>';
            if(row.restUrl){
              html +='<div class="urlspan">\
                        <span>rest服务地址:</span>\
                        <input readonly="readonly" title="'+row.restUrl+'" value="'+row.restUrl+'"></input>\
                        <i class="el-icon-copy-document" >复制</i>\
                      </div>';
            }
            if(row.wmtsUrl){
              html +='<div class="urlspan">\
                        <span>wmts服务地址111111111:</span>\
                        <input readonly="readonly" title="'+row.wmtsUrl+'" value="'+row.wmtsUrl+'"></input>\
                        <i class="el-icon-copy-document">复制</i>\
                      </div>';
            }
            html += '</div>';
        $this=this;
        this.$msgbox({
          title:"地图服务详情",
          message:html,
          dangerouslyUseHTMLString:true,
          showConfirmButton:false,
          closeOnClickModal:false
        })
        .catch(function(){
          //此处解决Uncaught (in promise) cancel 报错
        });
        $(document).unbind().on("click",".el-icon-copy-document",function(){
          //选择内容
          $(this).prev().select();
          // 执行浏览器复制命令
          document.execCommand("Copy");
          // alert("已复制好，可贴粘。");
          if(message){
            message.close();
          }
          message=$this.$message({
            message: '复制成功',
            type: 'success',
            center:true,
          });
        })
      }
    }

  },
  data: function () {
    return {
      tableData: [
        {
          id: '1',
          name: 'china400',
          description: '中国地图白色',
          children: [
            {
              id: '4',
              name: 'china1',
              parentName:"china400",
              description: '中国地图1',
              restUrl:"http://127.0.0.1:8090/iserver/rest",
              wmtsUrl:"http://127.0.0.1:8090/iserver/wmts1111111111111111111111111111111111111"
            },
            {
              id: '5',
              name: 'china2',
              parentName:"china400",
              description: '中国地图2',
              restUrl:"http://127.0.0.1:8090/iserver/rest",
              wmtsUrl:"http://127.0.0.1:8090/iserver/wmts"
            }
          ]
        },
        {
          id:"3",
          name: 'china',
          description: '中国地图黑色'
        }
      ]
    }
  }
}
</script>

<style lang="less">
@color:#0074D9;
@line-height:24px;
@cursor:pointer;
.yichu{
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.rowtx{
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:flex-start;
}
.el-message-box{
  min-width: 30%;
}
.popup>div>span:nth-child(1){
  font-weight: bold;
  width: 20%;
  .yichu();
}
.urlspan{
  .rowtx();
}
.urlspan>input{
  color:@color;
  width: 70%;
  .yichu();
  border:none;
  line-height: @line-height;
}
.urlspan>i{
  width: 10%;
  color:@color;
  line-height:@line-height;
  cursor:@cursor;
}
</style>
