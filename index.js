let title = document.getElementById('title');
let price = document.getElementById('price');
let code = document.getElementById('code');
let count = document.getElementById('count');
let category =document.getElementById('category');
let sumbit = document.getElementById('addBtn');
let color = document.getElementById('color');
let x = document.getElementById('x')

let mood = 'create';
let tmp;

//craete product
let dataPro;

if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro= [];
}

sumbit.onclick = function() {
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        code:code.value,
        count:count.value,
        category:category.value.toLowerCase(),
        color:color.value,
        x:x.value,
        
    }

                            if(title.value != '' && price.value != '' && newPro.count < 4999){
                                if(mood === 'create'){
                                    if(newPro.count > 1){
                                        for(let i = 0; i< newPro.count; i++){
                                               dataPro.push(newPro)
                                
                                        }
                                    } else{
                                        dataPro.push(newPro)
                                       

                                
                                    }
                            
                                } else{

                                    dataPro [tmp] = newPro
                                    mood = 'create'
                                    sumbit.innerHTML = 'اضافه'
                                    count.style.display ='block'; 
                                    clearData();
                                }
                            }

  
  
    console.log(dataPro)
    //sava localstorage
    localStorage.setItem('product' , JSON.stringify(dataPro))
    clearData()
    showData();
}

//clear data
function clearData () {
title.value =''
price.value= ''
code.value = ''
count.value = ''
category.value = ''
x.value = ''
color.value = ''

}
//read
function showData () {
  let table ='';
  for(let i = 0; i < dataPro.length ;i++ ){
        table+= `
                                    <tr>
                                       <td>${i+1} </td>
                                       <td> ${dataPro[i].code}</td>
                                       <td> ${dataPro[i].title}</td>
                                       <td>  ${dataPro[i].price} </td>
                                       <td>  ${dataPro[i].category} </td>
                                       <td> ${dataPro[i].color} </td>
                                       <td>${dataPro[i].x} </td>
                                       
                                       <td><button id="sell" onclick= "deleateData(${i} )">اتباع</button></td>
                                       <td><button onclick="updateData(${i})" id="update">تعديل</button></td>

                                    </tr>
        `
  }
document.getElementById('tbody').innerHTML=table;
               
let btndelete = document.getElementById('deleteAll');
if(dataPro.length > 0){

    btndelete.innerHTML =`
    <button onclick="deleteAll()"> (${dataPro.length})عدد المنتجات  </button>
    `
}else{
    btndelete.innerHTML = '';
}

             
}
showData()
//deleate
function deleateData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
   }
   function deleteAll(){
    showData()
   }
   
 //count
 //done by for loop "line 26"
//update product
        function updateData(i){
            title.value = dataPro[i].title
            price.value = dataPro[i].price
            category.value = dataPro[i].category
            code.value = dataPro[i].code
            count.style.display = 'none'
            sumbit.innerHTML = 'تعديل'
            mood = 'update'
            tmp=i;
            scroll({
                top:0,
                behavior:'smooth'
            })
        }





//search
let searchMood = 'title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == 'searchbyname'){
        searchMood = 'title';
        search.placeholder = 'اكتب اسم المنتج'
    } else{
        searchMood = 'code'
        search.placeholder = 'اكتب كود المنتج'
    }
        search.focus()
        search.value = '';
        showData()
}


//search2
function searchData(value){
    let table = '';
  
    if(searchMood == 'title'){

            for(let i = 0; i <dataPro.length; i++){
                      if(dataPro[i].title.includes(value)){

                        table+= `
                        <tr>
                           <td>${i+1} </td>
                           <td> ${dataPro[i].code}</td>
                           <td> ${dataPro[i].title}</td>
                           <td>  ${dataPro[i].price} </td>
                           <td>  ${dataPro[i].category} </td>
                           <td> ${dataPro[i].color} <td/>
                           <td> ${dataPro[i].x} <td/>
                           <td><button id="sell" onclick= "deleateData(${i} )">اتباع</button></td>
                           <td><button onclick="updateData(${i})" id="update">تعديل</button></td>

                        </tr>
`

                         }
            }








    }else{
        for(let i = 0; i <dataPro.length; i++){
            if(dataPro[i].code.includes(value.toLowerCase())){

              table+= `
              <tr>
                 <td>${i} </td>
                 <td> ${dataPro[i].code}</td>
                 <td> ${dataPro[i].title}</td>
                 <td>  ${dataPro[i].price} </td>
                 <td>  ${dataPro[i].category} </td>
                 <td> ${dataPro[i].color} <td/>
                 <td> ${dataPro[i].x} </td>
                 <td><button id="sell" onclick= "deleateData(${i})">اتباع</button></td>
                 <td><button onclick="updateData(${i})" id="update">تعديل</button></td>

              </tr>
`

               }
  }


    }
    document.getElementById('tbody').innerHTML=table;


}

//clean data
