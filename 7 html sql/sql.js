/**
 * Created by HASEE on 2017/1/23.
 */
var datatable = null;
var db = openDatabase("mydb","","test db",1024*100);
function init(){
    datatable = document.getElementById("datatable");
    showAllData();
}

function removeAllData(){
    //这里不应该是hasChildNodes,否则会出现重复栏；document.body.childNodes获得 body 元素的子节点集合：
    for(var i=datatable.childNodes.length-1;i>=0;i--){
        datatable.removeChild(datatable.childNodes[i]);
    }

    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");

    th1.innerHTML = "姓名";
    th2.innerHTML = "留言";
    th3.innerHTML = "时间";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    //添加一行标题行
    datatable.appendChild(tr);

}

function showData(row){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td1.innerHTML = row.name;
    td2.innerHTML = row.message;
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML = t.toLocaleDateString()+" "+t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    //添加一行数据
    datatable.appendChild(tr);
}

//查询
function showAllData() {
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT,time INTEGER)",[]);
        tx.executeSql("SELECT * FROM MsgData",[],function(tx,rs){
            removeAllData();
            //rs ResultSet   rows.item得到具体条
            for(var i = 0;i<rs.rows.length;i++){
                showData(rs.rows.item(i));
            }
        })
    })
}

function addData(name,message,time){
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO MsgData VALUES(?,?,?)",[name,message,time],function(tx,rs){
            alert("success");
        },function (tx,error){
            alert(error.source+"::"+error.message);
        }
        )
    })
}

function saveData(){
    var name = document.getElementById("name").value;
    var memo = document.getElementById("memo").value;
    var time = new Date().getTime();
    addData(name,memo,time);
    showAllData();
}