let name = document.getElementById("username");
let searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", function () {
  const username = name.value.trim();
  if (username.length > 0) {
    getUserData(username).then((data) => {
      console.log(data);
      displayUserData(data);
    });
  } else return alert("Please enter a username.");
});

function displayUserData(data) {
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
                    <h2 class="font-bold text-xl text-gray-100">${
                      data.name
                    }</h2>
                    <p class="text-gray-400 text-sm">${data.login}</p>
                    <p class="text-gray-300 text-sm">${
                      data.bio ? data.bio : "N/A"
                    }</p>
                </div>

            </div>
            
<div class="space-y-5">
  <div class="bg-gray-700 p-4 rounded-lg flex flex-col space-y-4">

    <div class="flex items-center justify-between w-full">
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Repos: <span class="font-medium text-blue-400">${ data.public_repos}</span></span>
      </div>
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Gists: <span class="font-medium text-blue-400">${  data.public_gists}</span></span>
      </div>
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Followers: <span class="font-medium text-blue-400">${ data.followers }</span></span>
      </div>
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Following: <span class="font-medium text-blue-400">${  data.following}</span></span>
      </div>
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Location: <span class="font-medium text-blue-400">${   data.location ? data.location : "N/A"}</span></span>
      </div>
      <div class="flex-1 text-center">
        <span class="text-gray-400 text-sm">Company: <span class="font-medium text-blue-400">${ data.company ? data.company : "N/A" }</span></span>
      </div>
    </div>

  </div>
</div>

            
        
        
        
        </div>
    `;

  const card = document.querySelector(".card");
  card.innerHTML = userDataHTML;
}

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((data) => {
    if (!data.ok) throw new Error("User N/A.");
    return data.json();
  });
}

// function getUserRepos(username){
//     return fetch(`https://api.github.com/users/${username}/repos`).then((data)=>{
//         if(!data.ok) throw new Error("Repos N/A.")
//         return data.json()
//     })
// }
