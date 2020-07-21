import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
let datas = {
  "id": uuid,
  "tree": [{
      "id": uuid,
      "name": "服务列表",
      "children": [{
          "id": uuid,
          "name": "地图服务",
          "children": [{
              "id": uuid,
              "name": "地图服务名称",
              "description": "关于服务的描述",
              "children": [{
                  "id": uuid,
                  "name": "地图名称",
                  "parentName": "父节点地图服务名称",
                  "description": "关于地图的描述",
                  "urls": [{
                      "id": uuid,
                      "type": "rest",
                      "url": "http://127.0.0.1:8090/iserver/rest"
                    },
                    {
                      "id": uuid,
                      "type": "rest",
                      "url": "http://127.0.0.1:8090/iserver/wmts"
                    }
                  ]
                },
                {
                  "id": uuid,
                  "name": "地图名称",
                  "parentName": "父节点地图服务名称",
                  "description": "关于地图的描述",
                  "urls": [{
                      "id": uuid,
                      "type": "rest",
                      "url": "http://127.0.0.1:8090/iserver/rest"
                    },
                    {
                      "id": uuid,
                      "type": "wmts",
                      "url": "http://127.0.0.1:8090/iserver/wmts"
                    }
                  ]
                }
              ]
            },
            {
              "id": uuid,
              "name": "地图服务名称",
              "description": "关于服务的描述",
              "children": []
            }
          ]
        },
        {
          "id": uuid,
          "name": "数据服务",
          "children": [{
            "id": uuid,
            "name": "数据服务名称",
            "urls": [{
                "id": uuid,
                "type": "rest",
                "url": "http://127.0.0.1:8090"
              },
              {
                "id": uuid,
                "type": "wmts",
                "url": "http://127.0.0.1:8090"
              }
            ]
          }]
        },
        {
          "id": uuid,
          "name": "三维服务",
          "children": [{
              "id": uuid,
              "name": "三维服务名称",
              "description": "服务描述",
              "children": [{
                  "id": uuid,
                  "name": "地图名称",
                  "parentName": "父节点服务名称",
                  "description": "地图描述",
                  "urls": [{
                    "id": uuid,
                    "type": "rest",
                    "url": "http://127.0.0.1:8090"
                  }]
                },
                {
                  "id": uuid,
                  "name": "地图名称",
                  "parentName": "父节点服务名称",
                  "description": "地图描述",
                  "urls": [{
                    "id": uuid,
                    "type": "rest",
                    "url": "http://127.0.0.1:8090"
                  }]
                }
              ]
            },
            {
              "id": uuid,
              "name": "三维服务名称",
              "description": "服务描述",
              "children": []
            }
          ]
        },
        {
          "id": uuid,
          "name": "空间分析服务",
          "children": [{
              "id": uuid,
              "name": "空间分析服务名称",
              "children": [{
                  "id": uuid,
                  "name": "缓冲分析",
                  "url": "http://127.0.0.1:8090"
                },
                {
                  "id": uuid,
                  "name": "叠加分析",
                  "url": "http://127.0.0.1:8090"
                }
              ]
            },
            {
              "id": uuid,
              "name": "空间分析服务名称",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": uuid,
      "name": "数据管理",
      "children": [{
          "id": uuid,
          "name": "表名",
          "children": [{
              "id": uuid,
              "name": "字段名",
              "alias": "中文名",
              "description": "备注"
            },
            {
              "id": uuid,
              "name": "字段名",
              "alias": "中文名",
              "description": "备注"
            }
          ]
        },
        {
          "id": uuid,
          "name": "表名2",
          "children": [{
              "id": uuid,
              "name": "字段名",
              "alias": "中文名",
              "description": "备注"
            },
            {
              "id": uuid,
              "name": "字段名",
              "alias": "中文名",
              "description": "备注"
            }
          ]
        }
      ]
    },
    {
      "id": uuid,
      "name": "示例程序",
      "children": [{
          "id": uuid,
          "name": "地图范例",
          "children": [{
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            },
            {
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            }
          ]
        },
        {
          "id": uuid,
          "name": "数据范例",
          "children": [{
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            },
            {
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            }
          ]
        },
        {
          "id": uuid,
          "name": "三维范例",
          "children": [{
              "id": uuid,
              "name": "范例名称",
              "img": "sw-范例名称.jpg"
            },
            {
              "id": uuid,
              "name": "范例名称",
              "img": "sw-范例名称.jpg"
            }
          ]
        },
        {
          "id": uuid,
          "name": "空间分析范例",
          "children": [{
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            },
            {
              "id": uuid,
              "name": "范例名称",
              "img": "范例名称.jpg"
            }
          ]
        }
      ]
    }
  ]
}
//导航列表
let navigation=[];
let tree=datas.tree;
for(let i=0;i<tree.length;i++){
  let data={
    "id":tree[i].id,
    "name":tree[i].name
  }
  navigation.push(data);
}
console.log(navigation);
export default new Vuex.Store({
  state: {
    navigation:navigation
  },
  mutations: {},
  actions: {},
  modules: {}
})
