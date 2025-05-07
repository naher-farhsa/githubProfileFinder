let name = document.getElementById("username");
let searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", function () {
  const username = name.value.trim();
  if (username.length > 0) {
    getUserData(username)
      .then((userdata) => {
        return getUserRepos(username)
        .then((userrepos) => {
          return { userdata, userrepos }; 
        });
      })
      .then(({ userdata, userrepos }) => {
        displayUserData(userdata, userrepos);
      });
  } else {
    alert("Please enter a username.");
  }
});


function displayUserData(data,repos) {
  // Group repos into rows of 3
  const repoRows = [];
  const topRepos = repos.slice(0, 6);
  
  for (let i = 0; i < topRepos.length; i += 3) {
    const repoData = topRepos.slice(i, i + 3);
    repoRows.push(repoData);
  }

  // Create the HTML for each row
  const reposHTML = repoRows.map(row => `
    <div class="flex justify-between w-full mt-2">
      ${row.map(repo => `
        <div class="flex items-center w-1/3 px-2">
          <span class="mr-1">🔗</span>
          <a href="${repo.html_url}" target="_blank" 
             class="text-blue-400 hover:underline whitespace-nowrap overflow-hidden text-ellipsis">
            ${repo.name}
          </a>
        </div>
      `).join('')}
    </div>
  `).join('');


  const userDataHTML = `
        <div class="p-6">
            <div class="flex items-center mb-4">
                <img 
                    id="github-avatar" 
                    src="${data.avatar_url}" 
                    alt="GitHub Avatar" 
                    class="w-16 h-16 rounded-full mr-4 border-2 border-blue-500 animate-pulse"
                />
                <div>
                    <h2 class="font-bold text-xl text-gray-100">${data.name}</h2>
                    <p class="text-gray-400 text-sm">${data.login}</p>
                    <p class="text-gray-300 text-sm">${data.bio ? data.bio : "N/A"}</p>
                </div>

            </div>
            
<div class="space-y-5">
  <div class="bg-gray-700 p-4 rounded-lg flex flex-col space-y-4">
       
    <span class="text-gray-400 text-sm ml-3  ">Repos: <span class="font-medium text-blue-400">${ data.public_repos}</span></span>
     <div class="-mt-3  space-y-1">${reposHTML}</div>
    

  </div>
</div>

 <div class="bg-gray-700 p-4 rounded-lg flex flex-col space-y-4 mt-4">

 <div class="flex items-center justify-evenly w-full">
        
       <span class="text-gray-400 text-sm">Gists: <span class="font-medium text-blue-400">${  data.public_gists}</span></span>
     
        <span class="text-gray-400 text-sm">Followers: <span class="font-medium text-blue-400">${ data.followers }</span></span>
     
        <span class="text-gray-400 text-sm">Following: <span class="font-medium text-blue-400">${  data.following}</span></span>
     
        <span class="text-gray-400 text-sm">Location: <span class="font-medium text-blue-400">${   data.location ? data.location : "N/A"}</span></span>
   
        <span class="text-gray-400 text-sm">Company: <span class="font-medium text-blue-400">${ data.company ? data.company : "N/A" }</span></span>
     
    </div>
            
       
        
  </div>     
        
</div>
    `;

  const card = document.querySelector(".card");
  card.innerHTML = userDataHTML;
}

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User N/A.");
    return raw.json();
  });
}

function getUserRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw)=>{
        if(!raw.ok) throw new Error("Repos N/A.")
        return raw.json()
    })
}
