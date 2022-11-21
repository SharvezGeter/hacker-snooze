//Query Selectors
let body = document.querySelector("#body");
let parentDiv = document.createElement("div");
let childDiv = document.createElement("div");
let score = document.createElement("p");
let comments = document.createElement("p");
let user = document.createElement("p");
let title = document.createElement("p");
let inputForm = document.querySelector("#inputForm");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let dob = document.querySelector("#dob");
let email = document.querySelector("#email");


body.appendChild(parentDiv);
body.appendChild(childDiv);


//LINK TO GET TOP STORIES / STORIES
//https://hacker-news.firebaseio.com/v0/topstories
//https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
//https://hacker-news.firebaseio.com/v0/item/data[i].json?print=pretty

let topStoriesAPIrequest = async () => {
    let response = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);

    console.log(response)
    let data = await response.json();
    console.log(data);
    //``````````````````````````````````````````````
    //``````````````````````````````````````````````
    for(let i = 0; i < 100; i++){
        //console.log(data[i])

        let storyResponse = await fetch(encodeURI(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`));

         let storyData = await storyResponse.json();
         console.log(storyData);

         //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        let newChild = document.createElement("div");
        let newChild2 = document.createElement("div");
        let linkChild = document.createElement("a");
        
        //adding div to body
        body.appendChild(newChild);
        //adding url to href attribute
        linkChild.href = storyData.url;
        //making the inner text the title
        linkChild.innerText = storyData.title;
        //opens link in new tab
        linkChild.setAttribute("target", "_blank");
        //append link to div
        newChild.appendChild(linkChild);
        //adding authors to links
        newChild2.innerText = `\nAuthor-${storyData.by}`
        //adding scores to links
        newChild2.innerText += `    *Score-${storyData.score}*`
        //spacing each link apart
        newChild2.innerText += `\n--------------`
        
        //adding to the body
        body.appendChild(newChild2);
        
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        


        //
        let commentsResponse = await fetch(encodeURI(`https://hacker-news.firebaseio.com/v0/item/data[i].json?print=pretty`));

        let commentsData = await commentsResponse.json();
        console.log(commentsData);

        let buttonComments = $("<button>View Comments</button>")

        
        //body.append(buttonComments);

    
    
}}

topStoriesAPIrequest()

inputForm.addEventListener("submit", (event) =>{
    event.preventDefault();

    firstName.innerText = firstName.value

    alert(`Thank you ${firstName.value} ${lastName.value} for signing up with Hacker News. A confirmation email will be sent to ${email.value} \n We will not share your information!`);

    event.target.style.display = "none";
})