
var courseAPI = 'http://localhost:3000/courses';
var isEditMode = -1;
var currentEditCourse = -1;
// var courseName = '';
function start(){
    getCourses(renderCourses);
    handleCreateForm();
}
start();
function getCourses(callback){
    fetch(courseAPI)
    .then((response)=>{
        return response.json();
    })
    .then(callback);
}
function renderCourses(courses){
    var coursesBlock = document.getElementById('courses-block');
    var htmls = courses.map((course) =>{
        return `<li class="course-item-${course.id}">
            <h1>Course: ${course.name}</h1>
            <h3>Description: ${course.desc}</h3>
            <button onclick="handleDeleteCourse(${course.id})" class="input-btn">
            <span></span><span></span><span></span><span></span>
            Delete
            </button>
            <button onclick="handleEditCourse(${course.id}, '${course.name}', '${course.desc}')" class="input-btn">
            <span></span><span></span><span></span><span></span>
            Edit
            </button>
        </li>`
    })
    coursesBlock.innerHTML = htmls.join('');
}
function createCourse(data, callback){
    var options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    fetch(courseAPI, options)
        .then(response => {
            response.json();
        })
        .then(callback);
}
function editCourse(formData, callback){
    var options = {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    fetch(courseAPI + '/' + currentEditCourse, options)
        .then(response => {
            response.json();
        })
        .then(callback);
}
function handleCreateForm(){
    var createBtn = document.querySelector('#create-btn');
    createBtn.onclick = ()=>{
        var name = document.querySelector('input[name = "name"').value;
        var desc = document.querySelector('input[name = "description"').value;
        var formData = {
            name: name,
            desc: desc
        }
        if(isEditMode != 1){
            createCourse(formData, () =>{
                getCourses(renderCourses);
            });
        }
        if(isEditMode == 1){
            editCourse(formData, () =>{
                getCourses(renderCourses); 
                isEditMode = -1;
                currentEditCourse = -1;
                var formTitle = document.querySelector('.form-title');
                formTitle.innerHTML = `THÊM KHOÁ HỌC VÀO DANH SÁCH`;
            })
        }
        document.querySelector('input[name = "name"').value = '';
        document.querySelector('input[name = "description"').value = '';
    }
}
function handleDeleteCourse(courseID){
    var options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
    }
    fetch(courseAPI + '/' + courseID, options)
        .then(response => {
            response.json();
        })
        .then(() =>{
           var courseItem = document.querySelector(`.course-item-${courseID}`);
           if(courseItem){
               courseItem.remove();
           }
        });
}

function handleEditCourse(courseID, courseName, courseDesc){
    isEditMode = 1;
    var formTitle = document.querySelector('.form-title');
    var backBtn = document.querySelector('#back-btn');
    formTitle.innerHTML = `CHỈNH SỬA KHOÁ HỌC ${courseID}`;
    currentEditCourse = courseID;
    document.querySelector('input[name = "name"').value = courseName;
    document.querySelector('input[name = "description"').value =  courseDesc;
    backBtn.style.display = 'inline-block';
}
function exitEditMode(){
    var backBtn = document.querySelector('#back-btn');
    backBtn.style.display = 'none';
    isEditMode = -1;
    currentEditCourse = -1;
    var formTitle = document.querySelector('.form-title');
    formTitle.innerHTML = `THÊM KHOÁ HỌC VÀO DANH SÁCH`;
    document.querySelector('input[name = "name"').value = '';
    document.querySelector('input[name = "description"').value = '';
}
