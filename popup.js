let btn = document.getElementById("summarize");
btn.addEventListener("click", (event) => {
  chrome.tabs.query({ active: true, currentWindow: true },  (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }
    console.log(tabs)
    tab_url = tabs[0].url
    console.log(tabs[0].url)
    async function fetch_data() {
      const url = `https://extractorapi.com/api/v1/extractor/?apikey=de070375909a4b85d4aaf1e2d8b5f36328adaef9&url=${tab_url}`
      try{
        const response = await fetch(url)
        if(!response.ok){
          console.log("nhi ho paa rha h ")
          throw new Error(response.status)
        }
        const json_format = await response.json()
        console.log(json_format)
      }
      catch(e){
        console.log(e)
      }
    }
    fetch_data()
  });
});
