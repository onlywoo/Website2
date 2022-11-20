const navData = [
    {title: "Home", link: "index.html"},
    {title: "Data Art", link: "Results.html"},
    {title: "Data Art 2", link: "ExamDA.html"},
    {title: "Data Visualisation", link: "Statistics.html"},
    {title: "Blogs", link: "blogs.html"},
    {title: "Style Guide", link: "styleyGuid.html"}
];

const navigations = document.getElementsByClassName("navigation")

for(var i = 0; i < navigations.length; i++){
    let list = document.createElement("ul");

    for (var j = 0; j < navData.length; j++){
        let listItemLink = document.createElement("a");
        listItemLink.innerText = navData[j].title;
        listItemLink.setAttribute("href", navData[j].link);
        let listItem = document.createElement("li");
        listItem.appendChild(listItemLink);
        list.appendChild(listItem);
    }
    navigations[i].appendChild(list);
}