const printGTIPosts = async () => {
  const data = fetch("https://www.reddit.com/r/etsmtl.json")
    .then((response) => response.json())
    .then((response) => {
      //console.log(response.data);
      return response.data;
    })
    .then((postList) => {
      let postArray = postList.children;
      postArray.forEach((singlePostData) => {
        //console.log(singlePostData);
        //console.log(singlePostData.data.author_flair_text);
        if (singlePostData.data.author_flair_text === "MEC") {
          //console.log(singlePostData.data);
          console.log(singlePostData.data.author);
          console.log(singlePostData.data.title);
        }
      });
    });
};

//CORRECTION
// Solution 1 -- version XMLHttpRequest:
function printGTIPosts() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.reddit.com/r/etsmtl.json");
  xhr.onload = function () {
    if (xhr.status == 200) {
      // La validation n'était pas demandée dans cet exercice
      if (
        xhr.getResponseHeader("Content-Type").startsWith("application/json")
      ) {
        var result = JSON.parse(xhr.responseText);
        parseRedditData(result);
      } else {
        console.log("Invalid content type");
      }
    } else {
      console.log("Invalid response code");
    }
  };
  xhr.ontimeout = function () {
    console.log("Timed out");
  };
  xhr.onerror = function () {
    console.log("Resulted in an error !");
  };
  xhr.onabort = function () {
    console.log("Aborted");
  };
  xhr.send();
}
function parseRedditData(d) {
  d.data.children.forEach((post) => {
    const title = post.data.title;
    const tag = post.data["author_flair_text"];
    const author = post.data["author"];
    if (tag == "MEC") {
      console.log(`${author}: ${title}`);
    }
  });
}

// Solution 2 -- version fetch:
// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
handleErrors = (response) => {
  if (!response.ok) throw Error(response.status + ": " + response.statusText);
  return response;
};

async function printGTIPosts() {
  try {
    let headers = await fetch("https://www.reddit.com/r/etsmtl.json");
    headers = await handleErrors(headers);
    data = await headers.json();
    return parseRedditData(data);
    function parseRedditData(d) {
      d.data.children.forEach((post) => {
        const title = post.data.title;
        const tag = post.data["author_flair_text"];
        const author = post.data["author"];
        if (tag == "MEC") {
          console.log(`${author}: ${title}`);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}
