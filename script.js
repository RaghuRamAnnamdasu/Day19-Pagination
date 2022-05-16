(function apiCall(){
    var request = new XMLHttpRequest();
    request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    request.send();
    request.onload = ()=>{
        data=JSON.parse(request.response);
        contents = Object.keys(data[0]);
        pageCount = Math.ceil(data.length/5);
        createTable();
    }
})();

function createEle(tagName,className,attributeName,attributeValue,content){
    var element = document.createElement(tagName);
    element.setAttribute("class",className);
    if(attributeName && attributeValue) {
        element.setAttribute(attributeName,attributeValue);
    }
    element.innerHTML=content;
    return element;
}

function createButton(content,attributeName,attributeValue,onPageChange){
    var button = document.createElement("button");
    button.setAttribute("type","button");
    if(attributeName && attributeValue) {
        button.setAttribute(attributeName,attributeValue);
    }
    button.className="btn";
    button.innerHTML=content;
    button.addEventListener("click", (evt) => onPageChange(evt, content));
    return button;
}

var data, contents, pageCount;
var pageNo = 1;
var iteration = 0;


function onPageClick(evt, a) {
    if(a==="First") {
        pageNo = 1;
    }else if(a==="Last"){
        pageNo = pageCount;
    } else if(a==="Prev"){
        pageNo = pageNo === 1 ? 1 : parseInt(pageNo)-1; 
    }else if(a==="Next"){
        pageNo = pageNo === pageCount ? pageCount : parseInt(pageNo)+1;
    } else {
        pageNo = evt.target.innerHTML;
    }
    iteration = ((pageNo-1)*5);

    //replacing the current rows data with the updated rows data on page change
    for(var i=iteration,m=0;i<iteration+5;i++,m++){
        for(var j=0;j<contents.length;j++){
            document.getElementById(`col${m+1}${j+1}`).innerHTML = data[i][contents[j]];
        }
    }
    
    if(!(pageNo==1 || pageNo==2 || pageNo==pageCount-3 || pageNo==pageCount-2 || pageNo==pageCount-1 || pageNo==pageCount)){
    document.getElementById("b2").innerHTML = pageNo;
    document.getElementById("b3").innerHTML = parseInt(pageNo)+1;
    } else if(pageNo==1){
        document.getElementById("b2").innerHTML = 2;
        document.getElementById("b3").innerHTML = 3;
    }
   
}


function createTable() {
    var page = createEle("div","container text-center","","","");
    var title = createEle("h1","title text-center","id","title","PAGINATION TASK");
    var description = createEle("p","description","id","description","Done by using DOM and Bootstrap Only");

    var tableType = createEle("div","table-responsive","","","");
    var table = createEle("table","table table-bordered","","","");
    tableType.append(table);
    document.body.append(page);
    var thead = createEle("thead","thead-dark","","","");
    var headRow = createEle("tr","headRow","","","");
    for(var i=0; i<contents.length;i++){
        var th = createEle("th","text-center text-capitalize","","",contents[i]);
        headRow.append(th);
    }
    thead.append(headRow);
    var tbody = createEle("tbody","tbody","","","");
    for(var i=0;i<5;i++){
        var tr = createEle("tr","","id",i+1,"");
        tbody.append(tr);
        for(var j=0;j<contents.length;j++){
            var td = createEle("td","text-center","id",`col${i+1}${j+1}`,data[i][contents[j]]);
            tr.append(td);
        }
    table.append(thead,tbody);
    }
    var buttonList = createEle("div","bList d-flex justify-content-center","id","buttons","");
    var prevButton = createButton("Prev","id", "b0" ,onPageClick);
    var firstButton = createButton("First","id", "b1" ,onPageClick);
    var button2 = createButton("2","id", "b2", onPageClick);
    var button3 = createButton("3","id", "b3", onPageClick);
    var button4 = createButton("....","disabled",true,onPageClick);
    var button5 = createButton((pageCount-2).toString(),"id", "b5", onPageClick);
    var button6 = createButton((pageCount-1).toString(),"id", "b6", onPageClick);
    var lastButton = createButton("Last","id", "b7", onPageClick);
    var nextButton = createButton("Next","id", "b8", onPageClick);
    buttonList.append(prevButton, firstButton, button2, button3, button4, button5, button6, lastButton, nextButton);

    page.append(title,description,tableType,buttonList);
    
}

