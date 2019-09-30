import "../stylesheets/index.min.css";
import json from "../json/conf.json";

document.addEventListener("DOMContentLoaded", function(){
    getCententsPage();
    document.getElementsByClassName('next')[0].addEventListener('click', function(e){
        // getCententsPage(e.value);
        console.log(this)
    })
})
function getCententsPage(params){
    let win = window, title = document.getElementsByClassName('title')[0], centent = document.getElementsByClassName('content-box')[0], _eq = ""; //全局
    json.forEach(($e, index) => {
        if(sessionStorage.getItem('cookies')){
            if($e.pageId == sessionStorage.getItem('cookies')){
                title.innerHTML = $e.question.title;
                $e.question.choice.forEach( ($_, eq) =>{
                     _eq += `<li data-lastId="${ $_.lastId }" data-topId="${ $_.topId }"> <input type="radio" name="choice" id="${eq}"><label for="${eq}"> ${ $_.key } </label><li>`
                });
                centent.innerHTML = _eq;
            };
        }else{
            if($e.pageId == 0){
                title.innerHTML = $e.question.title;
                $e.question.choice.forEach( ($_, eq) =>{
                     _eq += `<li data-lastId="${ $_.lastId }" data-topId="${ $_.topId }"> <input type="radio" name="choice" id="${eq}"><label for="${eq}"> ${ $_.key } </label><li>`
                });
                centent.innerHTML = _eq; // 
            };
        }
    })
}